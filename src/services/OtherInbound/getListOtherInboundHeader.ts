/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { OtherInboundHeader } from "@/components/modules/dashboard/logistic/otherinbound/columns";

export type OtherInboundHeaderResponse = OtherInboundHeader & {
  data: OtherInboundHeader[];
  totalData: number;
};

export type OtherInboundHeaderParams = PaginationParams;

async function getOtherInboundHeader<T>(
  params: OtherInboundHeaderParams
): Promise<T> {
  const res = await axiosClient
    .get("/OtherInboundHeader", { params })
    .then((res: any) => {
      return {
        data: res.data.otherInboundHeaders,
        totalData: res.data.otherInboundHeadersCount,
      };
    });

  return res;
}

export function useListOtherInboundHeader<T extends OtherInboundHeaderResponse>(
  params: OtherInboundHeaderParams
) {
  return useQuery<T>({
    queryKey: ["get-other-inbound-header", JSON.stringify(params)],
    queryFn: () => getOtherInboundHeader(params),
  });
}
