"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  createEmployee,
  Employee,
  fetchEmployees,
  TableEmployee,
} from "../../../api/employee";
import EditSheet from "../../../components/form-sheet";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import useEmployeeStore from "../../../store/store";

interface DataTableProps {
  columns: ColumnDef<Employee, unknown>[];
  initData: Employee[];
}

export function DataTable({ columns, initData }: DataTableProps) {
  const { employees, setEmployees } = useEmployeeStore();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    setEmployees(initData);
  }, [setEmployees, initData]);

  const table = useReactTable({
    data: employees,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { toast } = useToast();

  const handleSave = async (newEmployee: TableEmployee) => {
    try {
      await createEmployee(newEmployee);
      toast({
        title: "Success",
        description: "Employee created successfully!",
      });
      const updatedData = await fetchEmployees();
      setEmployees(updatedData);
      setIsEditSheetOpen(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to create employee!",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditSheetOpen(true)}
          className="text-green-700 border-green-700 hover:bg-green-700 hover:text-white"
        >
          <UserPlus className="h-4 w-4" />
          Add new employee
        </Button>
        {isEditSheetOpen && (
          <EditSheet
            onClose={() => setIsEditSheetOpen(false)}
            onSave={handleSave}
            title="Add Employee"
            description="Add a new employee to the database."
          />
        )}
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("fullName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          {table.getPageCount() > 1 &&
            Array.from({ length: table.getPageCount() }, (_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(index)}
                disabled={table.getState().pagination.pageIndex === index}
              >
                {index + 1}
              </Button>
            ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
