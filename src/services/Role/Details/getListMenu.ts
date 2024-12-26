/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";

export type MenuResponse = {
  data: [];
  totalData: number;
};

export type MenuParams = any & PaginationParams;

async function getMenu<T>(params: MenuParams): Promise<T> {
  const res = await axiosClient.get("/Menu", { params }).then((res: any) => {
    return {
      data: res.data.menus,
      totalData: res.data.menusCount,
    };
  });

  return res;
}

export function useListMenu<T extends MenuResponse>(params: MenuParams) {
  const queryKey = ["get-list-menus", JSON.stringify(params)];

  return useQuery<T>({
    queryKey,
    queryFn: () => getMenu(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

