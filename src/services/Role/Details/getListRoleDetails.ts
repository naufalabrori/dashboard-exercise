/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/services/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { RoleDetail } from "./types";

export type RoleDetailResponse = RoleDetail & {
  data: RoleDetail[];
  totalData: number;
};

export type RoleDetailParams = RoleDetail & PaginationParams;

async function getRoleDetail<T>(params: RoleDetailParams): Promise<T> {
  const res = await axiosClient.get("/RoleDetail/Extra", { params }).then((res: any) => {
    return {
      data: res.data.roleDetails,
      totalData: res.data.roleDetailsCount,
    };
  });

  return res;
}

export function useListRoleDetail<T extends RoleDetailResponse>(params: RoleDetailParams) {
  const queryKey = ["get-RoleDetails-header", JSON.stringify(params)];

  return useQuery<T>({
    queryKey,
    queryFn: () => getRoleDetail(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

