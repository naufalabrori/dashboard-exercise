/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { InboundHeader } from "./types";

export type InboundHeaderResponse = InboundHeader & {
  data: InboundHeader[];
  totalData: number;
};

export type InboundHeaderParams = InboundHeader & PaginationParams;

async function getInboundHeader<T>(params: InboundHeaderParams): Promise<T> {
  const res = await axiosClient
    .get("/InboundOrder", { params })
    .then((res: any) => {
      return {
        data: res.data.inboundOrders,
        totalData: res.data.inboundOrdersCount,
      };
    });

  return res;
}

export function useListInboundHeader<T extends InboundHeaderResponse>(
  params: InboundHeaderParams
) {
  return useQuery<T>({
    queryKey: ["get-inbound-header", JSON.stringify(params)],
    queryFn: () => getInboundHeader(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
