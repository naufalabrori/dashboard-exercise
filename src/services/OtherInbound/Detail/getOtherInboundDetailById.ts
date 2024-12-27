/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { OtherInboundDetail } from "./types";

export type OtherInboundDetailsResponse = OtherInboundDetail & {};

async function getOtherInboundDetail<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/OtherInboundDetail/${id}`).then((res: any) => {
    return res.data;
  });
}

export function useGetOtherInboundDetailById<T extends OtherInboundDetailsResponse>(id?: string) {
  const queryKey = ["get-other-inbound-detail-by-id", id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getOtherInboundDetail(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}
