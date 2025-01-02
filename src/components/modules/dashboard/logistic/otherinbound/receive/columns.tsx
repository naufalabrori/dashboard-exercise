/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { OtherInboundReceive } from "@/services/OtherInbound/Receive/types";
import { useMemo } from "react";
import { formatDate, formatDateTime } from "@/lib/utils";
import { PrintOtherInboundReceiveForm } from "./PrintForm";
import { OtherInboundPutawayForm } from "../putaway/PutawayForm";

interface ColumnOtherInboundReceive {
  currentPage: number;
  perPage: number;
}

export const OtherInboundReceiveColumns = ({
  currentPage,
  perPage,
}: ColumnOtherInboundReceive) => {
  const columns = useMemo<ColumnDef<any, OtherInboundReceive>[]>(
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
        accessorKey: "transportasi",
        header: () => "Transportasi",
      },
      {
        accessorKey: "lotNo",
        header: () => "Lot No",
      },
      {
        accessorKey: "manufacturingDate",
        header: () => "Manufacturing Date",
        cell: ({ row }) => formatDate(row.getValue("manufacturingDate")),
      },
      {
        accessorKey: "departureDate",
        header: () => "Departure Date",
        cell: ({ row }) => formatDate(row.getValue("departureDate")),
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
        accessorKey: "quantity",
        header: () => "Quantity",
      },
      {
        accessorKey: "qtyPerBag",
        header: () => "Qty Per Bag",
      },
      {
        accessorKey: "receiveStatus",
        header: "receiveStatus",
        cell: ({ row }) => {
          const status = row.getValue("receiveStatus") as string;
          return (
            <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
          );
        },
      },
      {
        accessorKey: "createdByName",
        header: () => "Receive By",
      },
      {
        accessorKey: "createdDate",
        header: () => "Receive Date",
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
        cell: ({row}) => { 
          const {
            id,
            otherInboundDetailId,
            stockCode,
            itemCode,
            itemDesc,
            transportasi,
            noSuratJalan,
            lotNo,
            manufacturingDate,
            departureDate,
            inDate,
            expiredDate,
            quantity,
            qtyPerBag,
            availablePutawayQty,
            availablePutawayBagQty
          } = row.original;

          const masterData = {
            id,
            otherInboundDetailId,
            stockCode,
            itemCode,
            itemDesc,
            transportasi,
            noSuratJalan,
            lotNo,
            manufacturingDate,
            departureDate,
            inDate,
            expiredDate,
            quantity,
            qtyPerBag,
            availablePutawayQty,
            availablePutawayBagQty
          }

          return (
            <div className="flex items-center gap-2">
              <PrintOtherInboundReceiveForm dataReceive={masterData} />
              <OtherInboundPutawayForm dataReceive={masterData} />
            </div>
          )
        }
      },
    ],
    [currentPage, perPage]
  );

  return columns;
};
