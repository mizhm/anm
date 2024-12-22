import { create } from "zustand";
import { Employee } from "../app/dashboard/employee/service";

interface EmployeeStore {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployeeState: (updatedEmployee: Employee) => void;
  deleteEmployeeState: (id: number) => void;
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],

  setEmployees: (employees) => set({ employees }),

  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),

  updateEmployeeState: (updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      ),
    })),

  deleteEmployeeState: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
}));

export default useEmployeeStore;
