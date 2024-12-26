/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient"; 
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { OtherInboundDetail } from "./types";

export type OtherInboundDetailResponse = OtherInboundDetail & {
  data: OtherInboundDetail[];
  totalData: number;
};

export type OtherInboundDetailParams = OtherInboundDetail & PaginationParams;

async function getOtherInboundDetail<T>(
  params: OtherInboundDetailParams
): Promise<T> {
  const res = await axiosClient
    .get("/OtherInboundDetail", { params })
    .then((res: any) => {
      return {
        data: res.data.otherInboundDetails,
        totalData: res.data.otherInboundDetailsCount,
      };
    });

  return res;
}

export function useListOtherInboundDetail<T extends OtherInboundDetailResponse>(
  params: OtherInboundDetailParams
) {
  return useQuery<T>({
    queryKey: ["get-other-inbound-detail", JSON.stringify(params)],
    queryFn: () => getOtherInboundDetail(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}
