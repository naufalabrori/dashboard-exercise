/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";

const removeOtherInboundHeader = async (id: string) => {
  const res = await axiosClient
    .put("/OtherInboundHeader/Remove/" + id)
    .then((res: any) => {
      return res.data;
    });

  return res;
};

export function useRemoveOtherInboundHeader() {
  return useMutation({
    mutationFn: (id: string) => removeOtherInboundHeader(id),
  });
}
