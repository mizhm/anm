import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  AlertTriangle,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  Contact,
  CreditCard,
  Edit,
  Eye,
  Globe2,
  GraduationCap,
  Mail,
  Phone,
  Trash,
  User2,
} from "lucide-react";
import React, { useState } from "react";
import FormSheet from "../../../components/dashboard/employee/form-sheet";
import { Badge } from "../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Separator } from "../../../components/ui/separator";
import { useToast } from "../../../hooks/use-toast";
import useEmployeeStore from "../../../store/store";
import { deleteEmployee, Employee } from "./service";

interface ActionButtonsProps {
  employee: Employee;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ employee }) => {
  const { deleteEmployeeState } = useEmployeeStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id);
      deleteEmployeeState(employee.id);
      toast({
        title: "Success",
        description: "Employee deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete employee! Error: " + error,
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsViewDialogOpen(true)}
            className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <User2 className="h-6 w-6 text-primary" />
              Employee Profile
            </DialogTitle>
            <Separator className="my-4" />
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <div className="grid gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Contact className="h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Employee ID
                    </div>
                    <div className="font-medium">{employee.id}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Full Name
                    </div>
                    <div className="font-medium">{employee.fullName}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Gender</div>
                    <Badge variant={employee.gender ? "default" : "secondary"}>
                      {employee.gender ? "Male" : "Female"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Date of Birth
                    </div>
                    <div className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {format(new Date(employee.dateOfBirth), "PPP")}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe2 className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      {employee.email}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      {employee.phone}
                    </div>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <div className="text-sm text-muted-foreground">Address</div>
                    <div className="font-medium">{employee.address}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Employment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Employment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Position
                    </div>
                    <Badge variant="outline" className="font-medium">
                      {employee.position}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Department
                    </div>
                    <div className="font-medium flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      {employee.department}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Experience
                    </div>
                    <div className="font-medium flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      {employee.experienceYears} years
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Join Date
                    </div>
                    <div className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {format(new Date(employee.joinYear), "PPP")}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      ID Number
                    </div>
                    <div className="font-medium flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      {employee.idNumber}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Salary</div>
                    <div className="font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Number(employee.salary))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
          <Separator className="my-4" />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsEditSheetOpen(true)}
        className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white"
      >
        <Edit className="h-4 w-4" />
      </Button>
      {isEditSheetOpen && (
        <FormSheet
          employee={employee}
          onClose={() => setIsEditSheetOpen(false)}
          title="Update Employee"
          description="Update employee information below."
        />
      )}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <DialogTitle className="flex items-center text-lg font-semibold text-gray-900">
            <AlertTriangle className="mr-2 h-6 w-6 text-red-500" />
            Confirm Delete
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete this employee? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
