import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { z } from "zod";
import { authOptions } from "../../api/auth/[...nextauth]/route";

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
  joinYear: z.date(),
  experienceYears: z.number(),
  gender: z.boolean(),
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
  joinYear: z.date(),
  experienceYears: z.number(),
  gender: z.boolean(),
  dateOfBirth: z.date(),
});

export type Employee = z.infer<typeof EmployeeSchema>;
export type TableEmployee = z.infer<typeof TableEmployeeSchema>;

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

const clientApi = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use(async (config) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  if (!token) {
    throw new Error("Not authenticated");
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

clientApi.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await api.get("/employees");
    const employees = response.data;

    return employees;
  } catch (error) {
    console.error("Failed to fetch employee data:", error);
    return [];
  }
}

export async function fetchEmployeesClient(): Promise<Employee[]> {
  try {
    const response = await clientApi.get("/employees");
    const employees = response.data;

    return employees;
  } catch (error) {
    console.error("Failed to fetch employee data:", error);
    return [];
  }
}

export async function createEmployee(employee: TableEmployee) {
  try {
    return await clientApi.post("/employees", employee);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return error;
  }
}

export async function updateEmployee(employee: TableEmployee) {
  try {
    return await clientApi.put(`/employees/${employee.id}`, employee);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return error;
  }
}

export async function deleteEmployee(employeeId: number): Promise<void> {
  try {
    await clientApi.delete(`/employees/${employeeId.toString()}`);
  } catch (error) {
    console.error("Failed to delete employee:", error);
  }
}
