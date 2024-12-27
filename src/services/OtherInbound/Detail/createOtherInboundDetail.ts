/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { OtherInboundDetail } from "./types";

const createOtherInboundDetail = async (data: OtherInboundDetail) => {
  const res = await axiosClient
    .post("/OtherInboundDetail", { otherInboundDetail: data })
    .then((res: any) => {
      return res.data;
    });

  return res.otherInboundDetail;
};

export function useCreateOtherInboundDetail() {
  return useMutation({
    mutationFn: (data: OtherInboundDetail) => createOtherInboundDetail(data),
  });
}
