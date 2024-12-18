"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export type OtherInboundHeader = {
  id: string;
  code: string;
  businessPartner: string;
  bpOrder: string;
  remarks: string;
  transactionStatus: "Open" | "Approved" | "Confirmed";
  createdBy: string;
  createdByName: string;
  createdDate: string;
};

export const otherInboundHeaderColumns: ColumnDef<OtherInboundHeader>[] = [
  // {
  //   id: "numbers",
  //   header: "No",
  //   cell: (info) => info.row.index + 1
  // },
  {
    accessorKey: "code",
    header: () => "Code"
  },
  {
    accessorKey: "businessPartner",
    header: () => "Business Partner"
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
    id: "actions",
    header: "Action",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
