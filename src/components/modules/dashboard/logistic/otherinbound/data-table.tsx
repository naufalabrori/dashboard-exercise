"use client";

import { useEffect, useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import { DataTableProps } from "./types";
import { DataTablePagination } from "./pagination";
import { DataTableHeader } from "./table-header";
import { DataTableBody } from "./table-body";
import { useTableData } from "@/hooks/use-table-data";
import { useTablePagination } from "@/hooks/use-table-pagination";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OtherInboundHeaderDataTable<TData, TValue>({
  columns,
  initialData = [],
}: DataTableProps<TData, TValue>) {
  const [totalData, setTotalData] = useState(initialData.length);
  const [defaultFilter, setDefaultFilter] = useState<string>("code");
  const [filterValue, setFilterValue] = useState<string>("");

  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, totalPages, currentPage, handlePageChange } =
    useTablePagination(totalData);
  const { data, total, loading, error } = useTableData<TData>(
    sorting,
    pagination,
    {
      key: defaultFilter,
      value: filterValue
    }
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const dataColumnFiltering = [
    {
      key: "code",
      value: "Code",
    },
    {
      key: "businessPartner",
      value: "Business Partner"
    },
    {
      key: "bpOrder",
      value: "BP Order",
    },
  ];

  useEffect(() => {
    setTotalData(total);
  }, [total]);

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4 gap-2">
        <Select value={defaultFilter} onValueChange={(value) => setDefaultFilter(value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataColumnFiltering.map((coll) => (
                <SelectItem key={coll.key} value={coll.key}>
                  {coll.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          placeholder="Filter"
          onChange={(event) =>
            setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <DataTableHeader headerGroups={table.getHeaderGroups()} />
          <DataTableBody
            loading={loading}
            error={error}
            rows={table.getRowModel().rows}
            columnLength={columns.length}
          />
        </Table>
      </div>
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        offset={pagination.offset}
        limit={pagination.limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
