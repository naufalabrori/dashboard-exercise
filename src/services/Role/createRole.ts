/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "../AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { Role } from "./types";

const createRole = async (data: Role) => {
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
      .put(`/Role/${data.id}`, { role: { ...saveParams } })
      .then((res: any) => {
        return res.data;
      });

    return res.role;
  } else {
    const res = await axiosClient
      .post("/Role", { role: data })
      .then((res: any) => {
        return res.data;
      });

    return res.role;
  }
};

export function useCreateRole() {
  return useMutation({
    mutationFn: (data: Role) => createRole(data),
  });
}
