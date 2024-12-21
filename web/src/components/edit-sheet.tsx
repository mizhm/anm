"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Employee } from "../app/api/employee";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface EditSheetProps {
  employee: Employee;
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

function EditSheet({ employee, onClose, onSave }: EditSheetProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: employee,
  });

  const onSubmit: SubmitHandler<Employee> = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Employee</SheetTitle>
          <SheetDescription>
            Update the employee details below.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                {...register("fullName", { required: "Full Name is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.fullName && (
                <span className="text-red-500">{errors.fullName.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                {...register("position", { required: "Position is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.position && (
                <span className="text-red-500">{errors.position.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                {...register("salary", { required: "Salary is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.salary && (
                <span className="text-red-500">{errors.salary.message}</span>
              )}
            </div>
          </div>
          <SheetFooter className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
            >
              Save
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default EditSheet;
