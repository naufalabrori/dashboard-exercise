/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { OtherInboundReceive } from "./types";

const createOtherInboundReceive = async (data: OtherInboundReceive) => {
  const res = await axiosClient
    .post("/OtherInboundReceive", { OtherInboundReceive: data })
    .then((res: any) => {
      return res.data;
    });

  return res.otherInboundReceive;
};

export function useCreateOtherInboundReceive() {
  return useMutation({
    mutationFn: (data: OtherInboundReceive) => createOtherInboundReceive(data),
  });
}
