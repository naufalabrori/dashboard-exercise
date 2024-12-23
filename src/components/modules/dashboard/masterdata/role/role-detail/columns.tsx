/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/services/Role/types"; 
import { useMemo } from "react";
import { formatDateTime } from "@/lib/utils";

interface ColumnRoleDetail {
  currentPage: number;
  perPage: number;
}

export const RoleColumns = ({
  currentPage,
  perPage,
}: ColumnRoleDetail) => {
  const columns = useMemo<ColumnDef<any, Role>[]>(
    () => [
      {
        id: "numbers",
        header: "No",
        cell: (info) => {
          return (
            <div className="text-center">{perPage * (currentPage - 1) + (info?.row.index + 1)}</div>
          )
        }
      },
      {
        accessorKey: "application",
        header: () => "Application",
      },
      {
        accessorKey: "menuGroup",
        header: () => "Group Feature",
      },
      {
        accessorKey: "feature",
        header: () => "Feature",
      },
      {
        accessorKey: "permission",
        header: "Permission",
        cell: ({ row }) => {
          const status = row.getValue("permission");
          return (
            <Badge
              className={
                !status
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
            >
              {status ? "Permitted" : "Not Permitted"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "isActive",
        header: "Is Active",
        cell: ({ row }) => {
          const status = row.getValue("isActive");
          return (
            <Badge
              className={
                !status
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
            >
              {status ? "Active" : "In Active"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "createdByName",
        header: () => "Created By",
      },
      {
        accessorKey: "createdDate",
        header: () => "Created Date",
        cell: ({ row }) => formatDateTime(row.getValue("createdDate"))
      },
      {
        accessorKey: "modifiedByName",
        header: () => "Modified By",
      },
      {
        accessorKey: "modifiedDate",
        header: () => "Modified Date",
        cell: ({ row }) => formatDateTime(row.getValue("modifiedDate"))
      },
    ],
    [currentPage, perPage]
  );

  return columns;
};
