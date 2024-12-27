/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";

const deleteOtherInboundDetail = async (id: string) => {
  const res = await axiosClient
      .delete(`/OtherInboundDetail?id=${id}`)
      .then((res: any) => {
        return res.data;
      });

    return res.OtherInboundDetail;
};

export function useDeleteOtherInboundDetail() {
  return useMutation({
    mutationFn: (id: string) => deleteOtherInboundDetail(id),
  });
}
