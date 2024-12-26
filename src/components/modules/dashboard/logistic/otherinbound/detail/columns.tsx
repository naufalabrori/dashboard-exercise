/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OtherInboundDetail } from "@/services/OtherInbound/Detail/types";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyeIcon } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface ColumnOtherInboundDetail {
  currentPage: number;
  perPage: number;
}

export const OtherInboundDetailColumns = ({
  currentPage,
  perPage,
}: ColumnOtherInboundDetail) => {
  const pathname = usePathname();
  const columns = useMemo<ColumnDef<any, OtherInboundDetail>[]>(
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
        accessorKey: "itemCode",
        header: () => "Item Code",
      },
      {
        accessorKey: "itemDesc",
        header: () => "Item Desc",
      },
      {
        accessorKey: "materialType",
        header: () => "Type",
      },
      {
        accessorKey: "uom",
        header: () => "UOM",
      },
      {
        accessorKey: "qtyPerBag",
        header: () => "Qty Per Bag",
      },
      {
        accessorKey: "quantity",
        header: () => "Quantity",
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
          );
        },
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
