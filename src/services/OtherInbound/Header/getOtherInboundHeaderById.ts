/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { OtherInboundHeader } from "./types";

export type OtherInboundHeadersResponse = OtherInboundHeader & {};

async function getOtherInboundHeader<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/OtherInboundHeader/${id}`).then((res: any) => {
    return res.data;
  });
}

export function useGetOtherInboundHeaderById<T extends OtherInboundHeadersResponse>(id?: string) {
  const queryKey = ["get-otherInboundHeader-by-id", id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getOtherInboundHeader(id),
    enabled: !!id,
  });
}
