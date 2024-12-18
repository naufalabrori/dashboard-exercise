"use client"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender, HeaderGroup } from "@tanstack/react-table"

interface DataTableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[]
}

export function DataTableHeader<TData>({ headerGroups }: DataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}