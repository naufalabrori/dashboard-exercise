/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OtherOutboundDetail } from "@/services/OtherOutbound/Detail/types";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyeIcon } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface ColumnOtherOutboundDetail {
  currentPage: number;
  perPage: number;
  headerStatus: string;
}

export const OtherOutboundDetailColumns = ({
  currentPage,
  perPage,
  headerStatus
}: ColumnOtherOutboundDetail) => {
  const pathname = usePathname();
  const columns = useMemo<ColumnDef<any, OtherOutboundDetail>[]>(
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
        accessorKey: "uom",
        header: () => "UOM",
      },
      {
        accessorKey: "bagQty",
        header: () => "Bag Qty",
        cell: ({ row }) => Number(row.getValue("quantity")) / Number(row.getValue("qtyPerBag")),
      },
      {
        accessorKey: "quantity",
        header: () => "Quantity",
      },
      {
        accessorKey: "qtyPerBag",
        header: () => "Qty Per Bag",
      },
      {
        accessorKey: "diffQty",
        header: () => "Diff Qty",
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
        cell: ({ row }) => (
          <>
            <Link href={`${pathname.split("/").slice(0, -1).join("/")}/detail/${row.original.id}`}>
            <Button className="mr-1 bg-blue-500 hover:bg-blue-600 p-3">
              <EyeIcon />
            </Button>
            </Link>
            {/* { headerStatus == "Open" ? <DeleteOtherOutboundDetailAlert id={row.original.id} /> : null } */}
          </>
        ),
      },
    ],
    [currentPage, perPage, pathname, headerStatus]
  );

  return columns;
};
