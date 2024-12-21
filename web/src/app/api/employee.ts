import axios from "axios";
import { z } from "zod";

export const EmployeeSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  position: z.string(),
  salary: z.number(),
});

export type Employee = z.infer<typeof EmployeeSchema>;

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

export async function deleteEmployee(employeeId: string): Promise<void> {
  try {
    await axios.delete(`http://localhost:4000/api/employees/${employeeId}`);
  } catch (error) {
    console.error("Failed to delete employee:", error);
  }
}
