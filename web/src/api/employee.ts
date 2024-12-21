import axios from "axios";
import { z } from "zod";

export const EmployeeSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  position: z.string(),
  department: z.string(),
  salary: z.number(),
  idNumber: z.string(),
  address: z.string(),
  dateOfBirth: z.date(),
});

export const TableEmployeeSchema = z.object({
  id: z.number().nullable(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  position: z.string(),
  department: z.string(),
  salary: z.number(),
  idNumber: z.string(),
  address: z.string(),
  dateOfBirth: z.date(),
});

export type Employee = z.infer<typeof EmployeeSchema>;
export type TableEmployee = z.infer<typeof TableEmployeeSchema>;

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await axios.get("http://localhost:4000/api/employees");
    const employees = response.data;

    return employees;
  } catch (error) {
    console.error("Failed to fetch employee data:", error);
    return [];
  }
}

export async function createEmployee(employee: TableEmployee): Promise<void> {
  try {
    await axios.post("http://localhost:4000/api/employees", {
      ...employee,
      salary: employee.salary.toString(),
    });
  } catch (error) {
    console.error("Failed to create employee:", error);
  }
}

export async function updateEmployee(employee: TableEmployee): Promise<void> {
  try {
    console.log(employee);
    await axios.put(`http://localhost:4000/api/employees/${employee.id}`, {
      ...employee,
      salary: employee.salary.toString(),
    });
  } catch (error) {
    console.error("Failed to update employee:", error);
  }
}

export async function deleteEmployee(employeeId: string): Promise<void> {
  try {
    await axios.delete(`http://localhost:4000/api/employees/${employeeId}`);
  } catch (error) {
    console.error("Failed to delete employee:", error);
  }
}
