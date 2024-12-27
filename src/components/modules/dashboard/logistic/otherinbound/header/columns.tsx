/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OtherInboundHeader } from "@/services/OtherInbound/Header/types";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyeIcon } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface ColumnOtherInboundHeader {
  currentPage: number;
  perPage: number;
}

export const OtherInboundHeaderColumns = ({
  currentPage,
  perPage,
}: ColumnOtherInboundHeader) => {
  const pathname = usePathname();
  const columns = useMemo<ColumnDef<any, OtherInboundHeader>[]>(
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
        accessorKey: "code",
        header: () => "Code",
      },
      {
        accessorKey: "businessPartner",
        header: () => "Business Partner",
      },
      {
        accessorKey: "bpOrder",
        header: () => "BP Order",
      },
      {
        accessorKey: "remarks",
        header: () => "Remarks",
      },
      {
        accessorKey: "transactionStatus",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("transactionStatus") as string;
          return (
            <Badge
              className={
                status === "Closed" || status == "Cancelled"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
            >
              {status}
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
          const { id } = info.row.original;

          return (
            <>
              <Link href={`${pathname}/${id}`}>
                <Button className="mr-1 bg-blue-500 hover:bg-blue-600 p-3">
                  <EyeIcon />
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
