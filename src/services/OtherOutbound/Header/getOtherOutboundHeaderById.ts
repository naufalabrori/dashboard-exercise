/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { OtherOutboundHeader } from "./types";

export type OtherOutboundHeadersResponse = OtherOutboundHeader & {};

async function getOtherOutboundHeader<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/OtherOutboundHeader/${id}`).then((res: any) => {
    return res.data;
  });
}

export function useGetOtherOutboundHeaderById<T extends OtherOutboundHeadersResponse>(id?: string) {
  const queryKey = ["get-OtherOutboundHeader-by-id", id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getOtherOutboundHeader(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}
