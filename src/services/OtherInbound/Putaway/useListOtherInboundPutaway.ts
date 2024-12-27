/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient"; 
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { OtherInboundPutaway } from "./types";

export type OtherInboundPutawayResponse = OtherInboundPutaway & {
  data: OtherInboundPutaway[];
  totalData: number;
};

export type OtherInboundPutawayParams = OtherInboundPutaway & PaginationParams;

async function getOtherInboundPutaway<T>(
  params: OtherInboundPutawayParams,
  id: string
): Promise<T> {
  const res = await axiosClient
    .get(`/OtherInboundPutaway/OtherInboundDetail/${id}`, { params })
    .then((res: any) => {
      return {
        data: res.data.otherInboundPutaways,
        totalData: res.data.otherInboundPutawaysCount,
      };
    });

  return res;
}

export function useListOtherInboundPutaway<T extends OtherInboundPutawayResponse>(
  params: OtherInboundPutawayParams,
  id: string
) {
  return useQuery<T>({
    queryKey: ["get-other-inbound-putaway", JSON.stringify(params)],
    queryFn: () => getOtherInboundPutaway(params, id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}
