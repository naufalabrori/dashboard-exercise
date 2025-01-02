/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";

const confirmOtherInboundHeader = async (id: string) => {
  const res = await axiosClient
    .put("/OtherInboundHeader/Confirm/" + id)
    .then((res: any) => {
      return res.data;
    });

  return res;
};

export function useConfirmOtherInboundHeader() {
  return useMutation({
    mutationFn: (id: string) => confirmOtherInboundHeader(id),
  });
}
