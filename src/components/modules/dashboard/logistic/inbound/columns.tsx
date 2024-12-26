/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { InboundHeader } from "@/services/Inbound/types";
import { useMemo } from "react";
import { formatDate, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ColumnInboundHeader {
  currentPage: number;
  perPage: number;
}

export const InboundHeaderColumns = ({ currentPage, perPage }: ColumnInboundHeader) => {
  const pathname = usePathname();
  const columns = useMemo<ColumnDef<any, InboundHeader>[]>(
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
        accessorKey: "poNumber",
        header: () => "PO Number",
      },
      {
        accessorKey: "poDate",
        header: () => "PO Date",
        cell: (info) => formatDate(info.row.original.poDate),
      },
      {
        accessorKey: "bussinessPartner",
        header: () => "Bussiness Partner",
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
        accessorKey: "planDateDelivery",
        header: () => "Plan Date Delivery",
        cell: (info) => formatDate(info.row.original.planDateDelivery),
      },
      {
        accessorKey: "transactionStatus",
        header: "Transaction Status",
        cell: ({ row }) => {
          const status = row.getValue("transactionStatus") as string;
          return (
            <Badge
              className={
                status === "Closed"
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