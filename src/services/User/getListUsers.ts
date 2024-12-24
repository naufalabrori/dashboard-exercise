/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { User } from "./types";

export type UserResponse = User & {
  data: User[];
  totalData: number;
};

export type UserParams = User & PaginationParams;

async function getUser<T>(params: UserParams): Promise<T> {
  const res = await axiosClient.get("/User/Users", { params }).then((res: any) => {
    return {
      data: res.data.users,
      totalData: res.data.usersCount,
    };
  });

  return res;
}

export function useListUser<T extends UserResponse>(params: UserParams) {
  const queryKey = ["get-list-users", JSON.stringify(params)];

  return useQuery<T>({
    queryKey,
    queryFn: () => getUser(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

