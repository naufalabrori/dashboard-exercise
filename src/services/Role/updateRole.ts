/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "../AxiosClient";
import { useMutation } from "@tanstack/react-query";

const updateRole = async (id: string) => {
  const res = await axiosClient
      .put(`/Role/${id}`)
      .then((res: any) => {
        return res.data;
      });

    return res.role;
};

export function useUpdateRole() {
  return useMutation({
    mutationFn: (id: string) => updateRole(id),
  });
}
