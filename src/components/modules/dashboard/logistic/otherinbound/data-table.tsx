"use client";

import { useEffect, useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import { DataTableProps } from "../../../../table/types";
import { DataTablePagination } from "@/components/table/pagination";
import { DataTableHeader } from "../../../../table/table-header";
import { DataTableBody } from "../../../../table/table-body";
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
import { NumberOfShowTable } from "@/lib/utils";

export function OtherInboundHeaderDataTable<TData, TValue>({
  columns,
  initialData = [],
}: DataTableProps<TData, TValue>) {
  const [totalData, setTotalData] = useState(initialData.length);
  const [defaultFilter, setDefaultFilter] = useState<string>("code");
  const [filterValue, setFilterValue] = useState<string>("");
  const [defaultLimit, setDefaultLimit] = useState<string>("5");

  const [sorting, setSorting] = useState<SortingState>([]);
  const { pagination, totalPages, currentPage, handlePageChange } =
    useTablePagination(totalData, Number(defaultLimit));
  const { data, total, loading, error } = useTableData<TData>(
    sorting,
    pagination,
    {
      key: defaultFilter,
      value: filterValue,
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
      value: "Business Partner",
    },
    {
      key: "bpOrder",
      value: "BP Order",
    },
  ];

  useEffect(() => {
    setTotalData(total);
    pagination.limit = Number(defaultLimit);
  }, [total, defaultLimit, pagination]);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Select
            value={defaultFilter}
            onValueChange={(value) => setDefaultFilter(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select one" />
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
            onChange={(event) => setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex">
          <div className="mr-2 mt-2">Show</div>
          <Select
            value={defaultLimit}
            onValueChange={(value) => setDefaultLimit(value)}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {NumberOfShowTable.map((item) => (
                  <SelectItem key={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="mt-2 ml-2">entries</div>
        </div>
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
