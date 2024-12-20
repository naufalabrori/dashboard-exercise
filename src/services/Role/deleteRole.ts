/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "../AxiosClient";
import { useMutation } from "@tanstack/react-query";

const deleteRole = async (id: string) => {
  const res = await axiosClient
      .delete(`/Role?id=${id}`)
      .then((res: any) => {
        return res.data;
      });

    return res.role;
};

export function useDeleteRole() {
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
  });
}
