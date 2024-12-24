/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/services/Role/types"; 
import { useMemo } from "react";
import { formatDateTime } from "@/lib/utils";
import { DeleteRoleAlert } from "./Delete-Alert";
import { UpdateRoleForm } from "./Update-Form";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ColumnRole {
  currentPage: number;
  perPage: number;
}

export const RoleColumns = ({
  currentPage,
  perPage,
}: ColumnRole) => {
  const pathname = usePathname();
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
        accessorKey: "code",
        header: () => "Code",
      },
      {
        accessorKey: "name",
        header: () => "Role Name",
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
        id: "actions",
        header: "Action",
        cell: (info) => {
          const {
            id,
            code,
            name,
            isActive,
            createdBy,
            createdByName,
            createdDate
          } = info.row.original;

          const masterData = {
            id,
            code,
            name,
            isActive,
            createdBy,
            createdByName,
            createdDate
          };
          return (
            <>
              <Link href={`${pathname}/${id}`}>
                <Button className="mr-1 bg-blue-500 hover:bg-blue-600 p-3">
                  <EyeIcon/>
                </Button>
              </Link>
              <UpdateRoleForm data={masterData}  />
              <DeleteRoleAlert id={id as string} />
            </>
          );
        },
      },
    ],
    [currentPage, perPage, pathname]
  );

  return columns;
};
