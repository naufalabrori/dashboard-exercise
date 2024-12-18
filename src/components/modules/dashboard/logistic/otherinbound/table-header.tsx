/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface DataTableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
}

export function DataTableHeader<TData>({
  headerGroups,
}: DataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder ? null : header.id ==
                "actions" ? null : header.id == "numbers" ? (
                flexRender(header.column.columnDef.header, header.getContext())
              ) : (
                <Button
                  variant="ghost"
                  onClick={() =>
                    header.column.toggleSorting(
                      header.column.getIsSorted() === "asc"
                    )
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.id == "numbers"}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
