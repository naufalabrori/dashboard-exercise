/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { OtherInboundPutaway } from "./types";

const createOtherInboundPutaway = async (data: OtherInboundPutaway) => {
  const res = await axiosClient
    .post("/OtherInboundPutaway", { otherInboundPutaway: data })
    .then((res: any) => {
      return res.data;
    });

  return res.otherInboundPutaway;
};

export function useCreateOtherInboundPutaway() {
  return useMutation({
    mutationFn: (data: OtherInboundPutaway) => createOtherInboundPutaway(data),
  });
}
