/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { Role } from "./types";

export type RolesResponse = Role & {};

async function getRole<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/Role/${id}`).then((res: any) => {
    return res.data;
  });
}

export function useGetRoleById<T extends RolesResponse>(id?: string) {
  const queryKey = ["get-role-header-by-id", id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getRole(id),
    enabled: !!id,
  });
}
