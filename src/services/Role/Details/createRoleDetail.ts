/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "@/services/AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { RoleDetail } from "./types";

const createRoleDetail = async (data: RoleDetail) => {
  if (data?.id) {
    const {
      id,
      createdBy,
      createdByName,
      createdDate,
      modifiedBy,
      modifiedByName,
      modifiedDate,
      ...saveParams
    } = data;
    const res = await axiosClient
      .put(`/RoleDetail/${data.id}`, { RoleDetail: { ...saveParams } })
      .then((res: any) => {
        return res.data;
      });

    return res.RoleDetail;
  } else {
    const res = await axiosClient
      .post("/RoleDetail", { RoleDetail: data })
      .then((res: any) => {
        return res.data;
      });

    return res.RoleDetail;
  }
};

export function useCreateRoleDetail() {
  return useMutation({
    mutationFn: (data: RoleDetail) => createRoleDetail(data),
  });
}
