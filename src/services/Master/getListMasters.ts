/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { Master } from "./types";

export type MasterResponse = Master & {
  data: Master[];
  totalData: number;
};

export type MasterParams = Master & PaginationParams;

async function getMaster<T>(params: MasterParams): Promise<T> {
  const res = await axiosClient.get("/RawMaterial/Masters", { params }).then((res: any) => {
    return {
      data: res.data.listMasters,
      totalData: res.data.listMastersCount,
    };
  });

  return res;
}

export function useListMaster<T extends MasterResponse>(params: MasterParams) {
  const queryKey = ["get-list-masters", JSON.stringify(params)];

  return useQuery<T>({
    queryKey,
    queryFn: () => getMaster(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

