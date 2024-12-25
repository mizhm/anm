import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { create } from "zustand";
import { Employee } from "../app/dashboard/employee/service";

interface EmployeeStore {
  employees: Employee[];
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  pageIndex: number;
  pageSize: number;

  setEmployees: (employees: Employee[]) => void;
  setSorting: (sorting: SortingState) => void;
  setColumnFilters: (filters: ColumnFiltersState) => void;
  setColumnVisibility: (visibility: VisibilityState) => void;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;

  addEmployee: (employee: Employee) => void;
  updateEmployeeState: (updatedEmployee: Employee) => void;
  deleteEmployeeState: (id: number) => void;
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  sorting: [],
  columnFilters: [],
  columnVisibility: {},
  pageIndex: 0,
  pageSize: 10,

  setEmployees: (employees) => set({ employees }),
  setSorting: (sorting) => set({ sorting }),
  setColumnFilters: (columnFilters) => set({ columnFilters }),
  setColumnVisibility: (columnVisibility) => set({ columnVisibility }),
  setPageIndex: (pageIndex) => set({ pageIndex }),
  setPageSize: (pageSize) => set({ pageSize }),

  addEmployee: (employee) =>
    set((state) => ({
      employees: [employee, ...state.employees],
    })),

  updateEmployeeState: (updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      ),
    })),

  deleteEmployeeState: (id) =>
    set((state) => {
      const newEmployees = state.employees.filter((emp) => emp.id !== id);
      const totalPages = Math.ceil(newEmployees.length / state.pageSize);

      return {
        employees: newEmployees,
        // Adjust page if current would be empty
        pageIndex:
          state.pageIndex >= totalPages
            ? Math.max(0, totalPages - 1)
            : state.pageIndex,
        // Preserve filters and sorting
        sorting: state.sorting,
        columnFilters: state.columnFilters,
        columnVisibility: state.columnVisibility,
      };
    }),
}));

export default useEmployeeStore;
