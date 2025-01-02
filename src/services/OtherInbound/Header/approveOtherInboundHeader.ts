/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";

const approveOtherInboundHeader = async (id: string) => {
  const res = await axiosClient
    .put("/OtherInboundHeader/Approve/" + id)
    .then((res: any) => {
      return res.data;
    });

  return res;
};

export function useApproveOtherInboundHeader() {
  return useMutation({
    mutationFn: (id: string) => approveOtherInboundHeader(id),
  });
}
