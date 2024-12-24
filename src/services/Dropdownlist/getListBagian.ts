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

async function getDropdownListBagian<T>(): Promise<T> {
  const res = await axiosClient.get("/Dropdownlist/Bagian").then((res: any) => {
    return {
      data: res.data,
      totalData: res.data.length,
    };
  });

  return res;
}

export function useListBagian<T extends DropdownListResponse>() {
  const queryKey = ["get-dropdownlist-bagian"];

  return useQuery<T>({
    queryKey,
    queryFn: () => getDropdownListBagian(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
