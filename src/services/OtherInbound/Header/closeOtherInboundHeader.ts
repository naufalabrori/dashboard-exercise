/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";

const closeOtherInboundHeader = async (id: string) => {
  const res = await axiosClient
    .put("/OtherInboundHeader/Close/" + id)
    .then((res: any) => {
      return res.data;
    });

  return res;
};

export function useCloseOtherInboundHeader() {
  return useMutation({
    mutationFn: (id: string) => closeOtherInboundHeader(id),
  });
}
