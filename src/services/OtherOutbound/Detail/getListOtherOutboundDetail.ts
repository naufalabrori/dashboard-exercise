/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { OtherOutboundDetail } from "./types";

export type OtherOutboundDetailResponse = OtherOutboundDetail & {
  data: OtherOutboundDetail[];
  totalData: number;
};

export type OtherOutboundDetailParams = OtherOutboundDetail & PaginationParams;

async function getOtherOutboundDetail<T>(
  params: OtherOutboundDetailParams
): Promise<T> {
  const res = await axiosClient
    .get("/OtherOutboundDetail", { params })
    .then((res: any) => {
      return {
        data: res.data.otherOutboundDetails,
        totalData: res.data.otherOutboundDetailsCount,
      };
    });

  return res;
}

export function useListOtherOutboundDetail<T extends OtherOutboundDetailResponse>(
  params: OtherOutboundDetailParams
) {
  return useQuery<T>({
    queryKey: ["get-other-outbound-detail", JSON.stringify(params)],
    queryFn: () => getOtherOutboundDetail(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}
