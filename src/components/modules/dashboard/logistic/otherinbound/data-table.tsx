/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import { DataTablePagination } from "@/components/table/pagination";
import { DataTableHeader } from "../../../../table/table-header";
import { DataTableBody } from "../../../../table/table-body";
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
import { OtherInboundHeaderColumns } from "./columns";
import { OtherInboundHeader } from "@/services/OtherInbound/types";
import { useListOtherInboundHeader } from "@/services/OtherInbound/getListOtherInboundHeader";
import { PaginationParams } from "@/lib/types";
import { useTablePagination } from "@/hooks/use-table-pagination";

interface UseTableDataReturn<TData> {
  data: TData[];
  total: number;
  loading: boolean;
  error: Error | null;
}

function useTableData<TData>(
  sorting: SortingState,
  pagination: PaginationParams,
  filter: any
): UseTableDataReturn<TData> {
  const [data, setData] = useState<TData[]>([]);
  const [total, setTotal] = useState(0);

  const sortField = sorting[0];
  const params = {
    ...pagination,
    orderBy: sortField?.id,
    isDesc: sortField?.desc,
    [filter.key]: filter.value,
  };

  const {
    data: queryData,
    error,
    isLoading,
  } = useListOtherInboundHeader(params);

  useEffect(() => {
    if (queryData) {
      setData(queryData.data as TData[]);
      setTotal(queryData.totalData);
    }
  }, [queryData]);

  return { data, total, loading: isLoading, error };
}

export function OtherInboundHeaderDataTable() {
  const [totalData, setTotalData] = useState(0);
  const [filterBy, setFilterBy] = useState<string>("code");
  const [filterValue, setFilterValue] = useState<string>("");
  const [limit, setLimit] = useState<string>("5");
  const [sorting, setSorting] = useState<SortingState>([]);

  const { pagination, totalPages, currentPage, handlePageChange } =
    useTablePagination(totalData, Number(limit));

  // Memanggil hook untuk mendapatkan data dengan parameter sorting, pagination, dan filter
  const { data, total, loading, error } = useTableData<OtherInboundHeader>(
    sorting,
    pagination,
    {
      key: filterBy,
      value: filterValue,
    }
  );

  const columns: ColumnDef<any, OtherInboundHeader>[] =
    OtherInboundHeaderColumns({
      currentPage,
      perPage: Number(limit),
    });

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
    { key: "code", value: "Code" },
    { key: "businessPartner", value: "Business Partner" },
    { key: "bpOrder", value: "BP Order" },
  ];

  useEffect(() => {
    setTotalData(total);
  }, [total]);

  // Fungsi untuk menangani perubahan limit (jumlah entri per halaman)
  const handleLimitChange = (value: string) => {
    setLimit(value);
    handlePageChange(0); // Reset ke halaman pertama
  };

  // Fungsi untuk menangani perubahan filter (kolom yang digunakan untuk filter)
  const handleFilterChange = (key: string, value: string) => {
    setFilterBy(key);
    setFilterValue(value);
    handlePageChange(0); // Reset ke halaman pertama
  };

  useEffect(() => {
    pagination.limit = Number(limit);
    handlePageChange(0);
  }, [limit, filterBy, filterValue]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Select
            value={filterBy}
            onValueChange={(value) => {
              setFilterBy(value);
            }}
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
            onChange={(event) =>
              handleFilterChange(filterBy, event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex">
          <div className="mr-2 mt-2 text-sm">Show</div>
          <Select
            value={limit}
            onValueChange={(value) => handleLimitChange(value)}
          >
            <SelectTrigger className="w-16">
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
          <div className="mt-2 ml-2 text-sm">entries</div>
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
