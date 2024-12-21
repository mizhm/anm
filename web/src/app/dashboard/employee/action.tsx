import { Button } from "@/components/ui/button";
import { AlertTriangle, Edit, Eye, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  deleteEmployee,
  Employee,
  TableEmployee,
  updateEmployee,
} from "../../../api/employee";
import EditSheet from "../../../components/form-sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useToast } from "../../../hooks/use-toast";

interface ActionButtonsProps {
  employee: Employee;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ employee }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = async (updatedEmployee: TableEmployee) => {
    try {
      console.log(updatedEmployee);
      await updateEmployee(updatedEmployee);
      toast({
        title: "Success",
        description: "Employee updated successfully!",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update employee!",
        variant: "destructive",
      });
    }
  };
  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id);
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
        <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Employee Information
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-600">
            <div>
              <strong>ID:</strong> {employee.id}
            </div>
            <div>
              <strong>Full Name:</strong> {employee.fullName}
            </div>
            <div>
              <strong>Email:</strong> {employee.email}
            </div>
            <div>
              <strong>Position:</strong> {employee.position}
            </div>
            <div>
              <strong>Salary:</strong> {employee.salary}
            </div>
          </DialogDescription>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
              className="text-gray-700 border-gray-300 hover:bg-gray-100"
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
        <EditSheet
          employee={employee}
          onClose={() => setIsEditSheetOpen(false)}
          onSave={handleSave}
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
