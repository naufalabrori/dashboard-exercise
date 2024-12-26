/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { DataTableHeader } from "@/components/table/table-header";
import { DataTableBody } from "@/components/table/table-body";
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
import { MenuColumns } from "./columns-menu";
import { Role } from "@/services/Role/types";
import { PaginationParams } from "@/lib/types";
import { useTablePagination } from "@/hooks/use-table-pagination";
import { useDebounce } from "use-debounce";
import { useListMenu } from "@/services/Role/Details/getListMenu";

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
  const params: any = {
    ...pagination,
    orderBy: sortField?.id || "code",
    isDesc: sortField?.desc || false,
    [filter.key]: filter.value || "",
  };

  const { data: queryData, error, isLoading } = useListMenu(params);

  useEffect(() => {
    if (queryData) {
      setData(queryData.data as TData[]);
      setTotal(queryData.totalData);
    }
  }, [queryData]);

  return { data, total, loading: isLoading, error };
}

export function MenuDataTable({ dataMaster }: { dataMaster: any }) {
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState<string>("5");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "code", desc: true },
  ]);
  const [filterBy, setFilterBy] = useState<string>("name");
  const [filterValue, setFilterValue] = useState<string>("");
  const [debounceFilter] = useDebounce(filterValue, 1000);

  const { pagination, totalPages, currentPage, handlePageChange } =
    useTablePagination(totalData, Number(limit));

  const { data, total, loading, error } = useTableData<Role>(
    sorting,
    pagination,
    {
      key: filterBy,
      value: debounceFilter,
    }
  );

  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const handleChoose = (checked: any, rowData: any) => {
    if (checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowData]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((row) => row.code !== rowData.code)
      );
    }
  };

  useEffect(() => {
    dataMaster(selectedRows);
  }, [selectedRows]);

  const columns: ColumnDef<any, Role>[] = MenuColumns({
    selectedRows,
    onChoose: handleChoose,
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
    { key: "name", value: "Feature" },
    { key: "code", value: "Code" },
    { key: "menuGroup", value: "Group Menu" },
    { key: "application", value: "Application" },
    { key: "description", value: "Description" },
  ];

  useEffect(() => {
    setTotalData(total);
  }, [total]);

  const handleLimitChange = (value: string) => {
    setLimit(value);
    pagination.limit = Number(value);
    handlePageChange(0);
  };

  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
    handlePageChange(0);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="flex gap-2">
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
            value={filterValue}
            onChange={(event) => handleFilterValueChange(event.target.value)}
            className="max-w-xs"
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
