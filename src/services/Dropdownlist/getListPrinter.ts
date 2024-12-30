/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { DropdownList } from "./types";

export type DropdownListResponse = DropdownList & {
  data: DropdownList[];
  totalData: number;
};

export type DropdownListParams = DropdownList & PaginationParams;

async function getDropdownListPrinter<T>(): Promise<T> {
  const res = await axiosClient.get("/Dropdownlist/Printers").then((res: any) => {
    return {
      data: res.data,
      totalData: res.data.length,
    };
  });

  return res;
}

export function useListPrinter<T extends DropdownListResponse>() {
  const queryKey = ["get-dropdownlist-printer"];

  return useQuery<T>({
    queryKey,
    queryFn: () => getDropdownListPrinter(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
