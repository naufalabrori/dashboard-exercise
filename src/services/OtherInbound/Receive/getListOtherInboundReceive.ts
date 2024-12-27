/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient"; 
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { OtherInboundReceive } from "./types";

export type OtherInboundReceiveResponse = OtherInboundReceive & {
  data: OtherInboundReceive[];
  totalData: number;
};

export type OtherInboundReceiveParams = OtherInboundReceive & PaginationParams;

async function getOtherInboundReceive<T>(
  params: OtherInboundReceiveParams
): Promise<T> {
  const res = await axiosClient
    .get("/OtherInboundReceive", { params })
    .then((res: any) => {
      return {
        data: res.data.otherInboundReceives,
        totalData: res.data.otherInboundReceivesCount,
      };
    });

  return res;
}

export function useListOtherInboundReceive<T extends OtherInboundReceiveResponse>(
  params: OtherInboundReceiveParams
) {
  return useQuery<T>({
    queryKey: ["get-other-inbound-receive", JSON.stringify(params)],
    queryFn: () => getOtherInboundReceive(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}
