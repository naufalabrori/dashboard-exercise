/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "../AxiosClient";
import { useMutation } from "@tanstack/react-query";
import { User } from "./types";

const createUser = async (data: any, id: string) => {
  if (id) {
    const res = await axiosClient
      .put(`/User`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res: any) => {
        return res.data;
      });

    return res.user;
  } else {
    const res = await axiosClient.post('/User', data, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res: any) => {
      return res.data;
    });

    return res.user;
  }
};

export function useCreateUser(id: string) {
  return useMutation({
    mutationFn: (data: any) => createUser(data, id),
  });
}
