/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@/services/Role/types";
import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const MenuColumns = ({ selectedRows, onChoose }: any) => {
  const columns = useMemo<ColumnDef<any, Role>[]>(
    () => [
      {
        id: "select",
        header: () => "",
        cell: (info) => {
          const { id, code, name, path, menuGroup, description, application } =
            info.row.original;

          const masterData = {
            id,
            code,
            name,
            path,
            menuGroup,
            description,
            application,
          };

          return (
            <Checkbox
              checked={selectedRows.some(
                (item: any) => item.code == masterData.code
              )}
              onCheckedChange={(checked) => onChoose(checked, masterData)}
            />
          );
        },
      },
      {
        accessorKey: "code",
        header: () => "Code",
      },
      {
        accessorKey: "application",
        header: () => "Application",
      },
      {
        accessorKey: "menuGroup",
        header: () => "Group Feature",
      },
      {
        accessorKey: "name",
        header: () => "Feature",
      },
      {
        accessorKey: "description",
        header: () => "Description",
      },
      {
        accessorKey: "path",
        header: () => "Path",
      },
    ],
    [selectedRows, onChoose]
  );

  return columns;
};
