/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { User } from "@/services/User/types";
import { useMemo } from "react";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface ColumnUser {
  currentPage: number;
  perPage: number;
}

export const UserColumns = ({ currentPage, perPage }: ColumnUser) => {
  const pathname = usePathname();
  const columns = useMemo<ColumnDef<any, User>[]>(
    () => [
      {
        id: "numbers",
        header: "No",
        cell: (info) => {
          return (
            <div className="text-center">
              {perPage * (currentPage - 1) + (info?.row.index + 1)}
            </div>
          );
        },
      },
      {
        accessorKey: "nik",
        header: () => "NIK",
      },
      {
        accessorKey: "inforId",
        header: () => "ID Infor",
      },
      {
        accessorKey: "username",
        header: () => "User Name",
      },
      {
        accessorKey: "fullname",
        header: () => "Full Name",
      },
      {
        accessorKey: "photo",
        header: () => "Photo",
        cell: (info) => (
          <Image
            src={info.row.original.photo}
            width={40}
            height={40}
            alt="gaada photo"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
            }}
          />
        ),
      },
      {
        accessorKey: "bagian",
        header: () => "Section",
      },
      {
        accessorKey: "accessApp",
        header: () => "Access App",
        cell: (info) => info.row.original.accessApp == "1" ? "Web" : info.row.original.accessApp == "2" ? "Mobile" : "Web & Mobile"
      },
      {
        accessorKey: "roleName",
        header: () => "Role",
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
        cell: ({ row }) => formatDateTime(row.getValue("createdDate")),
      },
      {
        accessorKey: "modifiedByName",
        header: () => "Modified By",
      },
      {
        accessorKey: "modifiedDate",
        header: () => "Modified Date",
        cell: ({ row }) => formatDateTime(row.getValue("modifiedDate")),
      },
      {
        id: "actions",
        header: "Action",
        cell: (info) => {
          const {
            id,
            // code,
            // name,
            // isActive,
            // createdBy,
            // createdByName,
            // createdDate
          } = info.row.original;

          //   const masterData = {
          //     id,
          //     code,
          //     name,
          //     isActive,
          //     createdBy,
          //     createdByName,
          //     createdDate
          //   };
          return (
            <>
              <Link href={`${pathname}/${id}`}>
                <Button className="mr-1 bg-blue-500 hover:bg-blue-600 p-3">
                  <PenIcon />
                </Button>
              </Link>
            </>
          );
        },
      },
    ],
    [currentPage, perPage, pathname]
  );

  return columns;
};
