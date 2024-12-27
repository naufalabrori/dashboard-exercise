/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { OtherInboundPutaway } from "@/services/OtherInbound/Putaway/types";
import { useMemo } from "react";
import { formatDate, formatDateTime } from "@/lib/utils";

interface ColumnOtherInboundPutaway {
  currentPage: number;
  perPage: number;
}

export const OtherInboundPutawayColumns = ({
  currentPage,
  perPage,
}: ColumnOtherInboundPutaway) => {
  const columns = useMemo<ColumnDef<any, OtherInboundPutaway>[]>(
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
        accessorKey: "noSuratJalan",
        header: () => "No Surat Jalan",
      },
      {
        accessorKey: "lotNo",
        header: () => "Lot No",
      },
      {
        accessorKey: "inDate",
        header: () => "In Date",
        cell: ({ row }) => formatDate(row.getValue("inDate")),
      },
      {
        accessorKey: "expiredDate",
        header: () => "Expired Date",
        cell: ({ row }) => formatDate(row.getValue("expiredDate")),
      },
      {
        accessorKey: "putawayQty",
        header: () => "Putaway Qty",
      },
      {
        accessorKey: "qtyPerBag",
        header: () => "Qty Per Bag",
      },
      {
        accessorKey: "bagQty",
        header: () => "Bag Qty",
        cell: ({ row }) => Number(row.getValue("putawayQty")) / Number(row.getValue("qtyPerBag")),
      },
      {
        accessorKey: "binRackCode",
        header: () => "Bin Rack Code",
      },
      {
        accessorKey: "binRackName",
        header: () => "Bin Rack Name",
      },
      {
        accessorKey: "createdByName",
        header: () => "Putaway By",
      },
      {
        accessorKey: "createdDate",
        header: () => "Putaway Date",
        cell: ({ row }) => formatDateTime(row.getValue("createdDate")),
      },
    ],
    [currentPage, perPage]
  );

  return columns;
};
