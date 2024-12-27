/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { PaginationParams } from "@/lib/types";
import { Supplier } from "./types";

export type SupplierResponse = Supplier & {
  data: Supplier[];
  totalData: number;
};

export type SupplierParams = Supplier & PaginationParams;

async function getSupplier<T>(params: SupplierParams): Promise<T> {
  const res = await axiosClient.get("/Supplier", { params }).then((res: any) => {
    return {
      data: res.data.suppliers,
      totalData: res.data.suppliersCount,
    };
  });

  return res;
}

export function useListSupplier<T extends SupplierResponse>(params: SupplierParams) {
  const queryKey = ["get-suppliers-header", JSON.stringify(params)];

  return useQuery<T>({
    queryKey,
    queryFn: () => getSupplier(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
}

