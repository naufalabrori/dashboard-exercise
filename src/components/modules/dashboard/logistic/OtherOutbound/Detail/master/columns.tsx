/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Master } from "@/services/Master/types";
import { useMemo, useState } from "react";

export const MasterColumns = ({ onChoose }: any) => {
  const [selectedItem, setSelectedItem] = useState<Master | null>(null);
  const columns = useMemo<ColumnDef<any, Master>[]>(
    () => [
      {
        id: "select",
        header: () => "",
        cell: (info) => {
          const {
            itemCode,
            itemDesc,
            stockType,
            uom,
            remarks,
            quantityPerBag,
          } = info.row.original;

          const masterData = {
            itemCode,
            itemDesc,
            stockType,
            uom,
            remarks,
            quantityPerBag,
          };

          return (
            <div className="flex items-center mb-4">
              <input
                id={`radio-${itemCode}`}
                type="radio"
                name="master-radio"
                checked={selectedItem?.itemCode === itemCode}
                onChange={() => {
                  setSelectedItem(masterData);
                  onChoose(masterData);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          );
        },
      },
      {
        accessorKey: "stockType",
        header: () => "Type",
        cell: ({ row }) =>
          row.getValue("stockType") == "1"
            ? "RM"
            : row.getValue("stockType") == "2"
            ? "FG"
            : row.getValue("stockType") == "3"
            ? "WIP"
            : "",
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
        accessorKey: "quantityPerBag",
        header: () => "Qty Per Bag",
      }
    ],
    [onChoose, selectedItem]
  );

  return columns;
};
