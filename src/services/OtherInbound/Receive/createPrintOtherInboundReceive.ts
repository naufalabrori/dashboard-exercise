/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { PrintOtherInboundReceive } from "./types";

const createPrintOtherInboundReceive = async (data: PrintOtherInboundReceive) => {
  const res = await axiosClient
    .post("/OtherInboundReceive/PrintReceive", { data: data })
    .then((res: any) => {
      return res.data;
    });

  return res.data;
};

export function useCreatePrintOtherInboundReceive() {
  return useMutation({
    mutationFn: (data: PrintOtherInboundReceive) => createPrintOtherInboundReceive(data),
  });
}
