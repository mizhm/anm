"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import EditSheet from "../../../components/form-sheet";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import useEmployeeStore from "../../../store/store";
import { exportToExcel } from "../../../utils/export-to-excel";
import { Employee } from "./service";

interface DataTableProps {
  columns: ColumnDef<Employee, unknown>[];
  initData: Employee[];
}

export function DataTable({ columns, initData }: DataTableProps) {
  const {
    employees,
    sorting,
    columnFilters,
    columnVisibility,
    pageIndex,
    pageSize,
    setEmployees,
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setPageIndex,
    setPageSize,
  } = useEmployeeStore();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  useEffect(() => {
    setEmployees(initData);
  }, [setEmployees, initData]);

  const table = useReactTable({
    data: employees.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    columns,
    manualPagination: true,
    pageCount: Math.ceil(employees.length / pageSize),
    onSortingChange: (updater) => {
      setSorting(typeof updater === "function" ? updater(sorting) : updater);
    },
    onColumnFiltersChange: (updater) => {
      setColumnFilters(
        typeof updater === "function" ? updater(columnFilters) : updater
      );
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: (updater) => {
      setColumnVisibility(
        typeof updater === "function" ? updater(columnVisibility) : updater
      );
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2 w-full">
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
            title="Add Employee"
            description="Add a new employee to the database."
          />
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportToExcel(employees, "Employees")}
          className="text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white"
        >
          <FileDown className="h-4 w-4" />
          Export data to excel
        </Button>
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("fullName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-auto"
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
