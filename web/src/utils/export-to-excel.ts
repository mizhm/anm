import * as XLSX from "xlsx";
import { Employee } from "../app/dashboard/employee/service";

export const exportToExcel = (employees: Employee[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(employees);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
