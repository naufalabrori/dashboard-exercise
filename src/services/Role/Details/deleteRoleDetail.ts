/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "../../AxiosClient";
import { useMutation } from "@tanstack/react-query";

const deleteRoleDetail = async (id: string) => {
  const res = await axiosClient
      .delete(`/RoleDetail?id=${id}`)
      .then((res: any) => {
        return res.data;
      });

    return res.roleDetail;
};

export function useDeleteRoleDetail() {
  return useMutation({
    mutationFn: (id: string) => deleteRoleDetail(id),
  });
}
