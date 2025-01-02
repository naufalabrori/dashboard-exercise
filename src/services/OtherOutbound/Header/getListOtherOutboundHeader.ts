/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { OtherOutboundHeader } from "./types";

export type OtherOutboundHeaderResponse = OtherOutboundHeader & {
  data: OtherOutboundHeader[];
  totalData: number;
};

export type OtherOutboundHeaderParams = OtherOutboundHeader & PaginationParams;

async function getOtherOutboundHeader<T>(
  params: OtherOutboundHeaderParams
): Promise<T> {
  const res = await axiosClient
    .get("/OtherOutboundHeader", { params })
    .then((res: any) => {
      return {
        data: res.data.otherOutboundHeaders,
        totalData: res.data.otherOutboundHeadersCount,
      };
    });

  return res;
}

export function useListOtherOutboundHeader<T extends OtherOutboundHeaderResponse>(
  params: OtherOutboundHeaderParams
) {
  return useQuery<T>({
    queryKey: ["get-other-outbound-header", JSON.stringify(params)],
    queryFn: () => getOtherOutboundHeader(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}
