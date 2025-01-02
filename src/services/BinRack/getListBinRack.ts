/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient"; 
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { BinRack } from "./types";

export type BinRackResponse = BinRack & {
  data: BinRack[];
  totalData: number;
};

export type BinRackParams = BinRack & PaginationParams;

async function getBinRack<T>(
  params: BinRackParams
): Promise<T> {
  const res = await axiosClient
    .get("/BinRack", { params })
    .then((res: any) => {
      return {
        data: res.data.binRacks,
        totalData: res.data.binRacksCount,
      };
    });

  return res;
}

export function useListBinRack<T extends BinRackResponse>(
  params: BinRackParams
) {
  return useQuery<T>({
    queryKey: ["get-binrack", JSON.stringify(params)],
    queryFn: () => getBinRack(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}
