"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  createEmployee,
  Employee,
  updateEmployee,
} from "../app/dashboard/employee/service";
import { useToast } from "../hooks/use-toast";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";
interface EditSheetProps {
  employee?: Employee;
  title: string;
  description: string;
  onClose: () => void;
}

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  id: z.number().nullable(),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  gender: z.coerce.boolean(),
  joinYear: z
    .date({
      required_error: "Date of birth is required",
    })
    .refine(
      (date) => date.getFullYear() >= 1900 && date.getFullYear() <= currentYear,
      {
        message: `Join year must be between 1900 and ${currentYear}`,
      }
    ),
  experienceYears: z.coerce
    .number()
    .min(0, "Experience years must be at least 0"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Phone must be 10-11 digits"),
  position: z.string().min(2, "Position is required"),
  department: z.string().min(2, "Department is required"),
  salary: z.coerce.number().positive("Salary must be a positive number"),
  idNumber: z.string().min(9, "ID number must be at least 9 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  dateOfBirth: z
    .date({
      required_error: "Date of birth is required",
    })
    .refine(
      (date) => {
        const year = date.getFullYear();
        return year >= 1900 && year <= currentYear - 18;
      },
      {
        message: "Employee must be at least 18 years old and born after 1900",
      }
    ),
});

function EditSheet({ employee, onClose, title, description }: EditSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: employee ? employee.id : null,
      fullName: employee ? employee.fullName : "",
      email: employee ? employee.email : "",
      phone: employee ? employee.phone : "",
      position: employee ? employee.position : "",
      department: employee ? employee.department : "",
      salary: employee ? employee.salary : 1,
      idNumber: employee ? employee.idNumber : "",
      address: employee ? employee.address : "",
      dateOfBirth: employee
        ? new Date(employee.dateOfBirth)
        : new Date("2000-01-01"),
      joinYear: employee ? new Date(employee.joinYear) : new Date(),
      experienceYears: employee ? employee.experienceYears : 0,
      gender: employee ? employee.gender : true,
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = employee
        ? await updateEmployee(data)
        : await createEmployee(data);
      console.log(res);
      if (res.errors) {
        console.log(res.errors);
        res.errors.forEach((error: { field: string; message: string }) => {
          form.setError(error.field as keyof (typeof formSchema)["_type"], {
            type: "manual",
            message: error.message,
          });
        });
        toast({
          title: "Error",
          variant: "destructive",
          description: "Some field is invalid!",
        });
        return;
      }
      toast({
        title: "Success",
        description: "Employee saved successfully!",
      });
      onClose();
    } catch {
      toast({
        title: "Error",
        description: "Something wrong happen",
        variant: "destructive",
      });
    }
  };
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...form.register("id")} />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Position..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Department..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="Salary..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Id Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Id Number..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience years</FormLabel>
                    <FormControl>
                      <Input placeholder="Experience years..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="joinYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Join year</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Address..."
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default EditSheet;
