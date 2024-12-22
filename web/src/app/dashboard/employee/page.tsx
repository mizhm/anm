import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchEmployees } from "./service";

export default async function Page() {
  const employees = await fetchEmployees();
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DataTable initData={employees} columns={columns} />
    </div>
  );
}
