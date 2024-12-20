/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { Role } from "./types";

export type RoleResponse = Role & {
  data: Role[];
  totalData: number;
};

export type RoleParams = Role & PaginationParams;

async function getRole<T>(params: RoleParams): Promise<T> {
  const res = await axiosClient.get("/Role", { params }).then((res: any) => {
    return {
      data: res.data.roles,
      totalData: res.data.rolesCount,
    };
  });

  return res;
}

export function useListRole<T extends RoleResponse>(params: RoleParams) {
  return useQuery<T>({
    queryKey: ["get-roles-header", JSON.stringify(params)],
    queryFn: () => getRole(params),
  });
}
