import { fetchEmployees } from "../../../api/employee";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
  const employees = await fetchEmployees();
  return <DataTable initData={employees} columns={columns} />;
}
