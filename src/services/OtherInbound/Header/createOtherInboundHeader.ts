/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { OtherInboundHeader } from "./types";

const createOtherInboundHeader = async (data: OtherInboundHeader) => {
  const res = await axiosClient
    .post("/OtherInboundHeader", { otherInboundHeader: data })
    .then((res: any) => {
      return res.data;
    });

  return res.otherInboundHeader;
};

export function useCreateOtherInboundHeader() {
  return useMutation({
    mutationFn: (data: OtherInboundHeader) => createOtherInboundHeader(data),
  });
}
