/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { OtherOutboundHeader } from "./types";

const createOtherOutboundHeader = async (data: OtherOutboundHeader) => {
  const res = await axiosClient
    .post("/OtherOutboundHeader", { otherOutboundHeader: data })
    .then((res: any) => {
      return res.data;
    });

  return res.otherOutboundHeader;
};

export function useCreateOtherOutboundHeader() {
  return useMutation({
    mutationFn: (data: OtherOutboundHeader) => createOtherOutboundHeader(data),
  });
}
