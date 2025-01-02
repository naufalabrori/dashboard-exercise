/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { OtherOutboundDetail } from "./types";

const createOtherOutboundDetail = async (data: OtherOutboundDetail) => {
  const res = await axiosClient
    .post("/OtherOutboundDetail", { otherOutboundDetail: data })
    .then((res: any) => {
      return res.data;
    });

  return res.otherOutboundDetail;
};

export function useCreateOtherOutboundDetail() {
  return useMutation({
    mutationFn: (data: OtherOutboundDetail) => createOtherOutboundDetail(data),
  });
}
