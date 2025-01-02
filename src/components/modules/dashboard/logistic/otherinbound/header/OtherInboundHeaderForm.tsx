/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { useApproveOtherInboundHeader } from "@/services/OtherInbound/Header/approveOtherInboundHeader";
import { useCloseOtherInboundHeader } from "@/services/OtherInbound/Header/closeOtherInboundHeader";
import { useConfirmOtherInboundHeader } from "@/services/OtherInbound/Header/confirmOtherInboundHeader";
import { useGetOtherInboundHeaderById } from "@/services/OtherInbound/Header/getOtherInboundHeaderById";
import { useRemoveOtherInboundHeader } from "@/services/OtherInbound/Header/removeOtherInboundHeader";
import { OtherInboundHeader } from "@/services/OtherInbound/Header/types";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function OtherInboundHeaderForm({ id }: { id: string }) {
  const [form, setForm] = useState<OtherInboundHeader | null>(null);
  const { data } = useGetOtherInboundHeaderById(id);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const queryClient = useQueryClient();

  const { mutate: confirm } = useConfirmOtherInboundHeader();
  const { mutate: approve } = useApproveOtherInboundHeader();
  const { mutate: remove } = useRemoveOtherInboundHeader();
  const { mutate: close } = useCloseOtherInboundHeader();

  const handleConfirm = () => {
    confirm(id as string, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-otherInboundHeader-by-id"],
        });
        queryClient.invalidateQueries({
          queryKey: ["get-other-inbound-detail"],
        });
        toast("Confirm Successfully", { type: "success" });
      },
      onError: (error: any) => {
        toast(
          error?.response?.data?.detail ||
            "Terjadi kesalahan, silakan coba beberapa saat lagi.",
          {
            type: "error",
          }
        );
      },
    });
  };

  const handleApprove = () => {
    approve(id as string, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-otherInboundHeader-by-id"],
        });
        queryClient.invalidateQueries({
          queryKey: ["get-other-inbound-detail"],
        });
        toast("Approve Successfully", { type: "success" });
      },
      onError: (error: any) => {
        toast(
          error?.response?.data?.detail ||
            "Terjadi kesalahan, silakan coba beberapa saat lagi.",
          {
            type: "error",
          }
        );
      },
    });
  };

  const handleRemove = () => {
    remove(id as string, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-otherInboundHeader-by-id"],
        });
        queryClient.invalidateQueries({
          queryKey: ["get-other-inbound-detail"],
        });
        toast("Remove Successfully", { type: "success" });
      },
      onError: (error: any) => {
        toast(
          error?.response?.data?.detail ||
            "Terjadi kesalahan, silakan coba beberapa saat lagi.",
          {
            type: "error",
          }
        );
      },
    });
  };

  const handleClose = () => {
    close(id as string, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-otherInboundHeader-by-id"],
        });
        queryClient.invalidateQueries({
          queryKey: ["get-other-inbound-detail"],
        });
        toast("Close Successfully", { type: "success" });
      },
      onError: (error: any) => {
        toast(
          error?.response?.data?.detail ||
            "Terjadi kesalahan, silakan coba beberapa saat lagi.",
          {
            type: "error",
          }
        );
      },
    });
  };

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-xl font-bold mb-3">Other Inbound Header</div>
        <div>
          <Button
            className="bg-violet-500 hover:bg-violet-600 mr-1"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button
            className="bg-violet-500 hover:bg-violet-600 mr-1"
            onClick={handleApprove}
          >
            Approve
          </Button>
          <Button
            className="bg-violet-500 hover:bg-violet-600 mr-1"
            onClick={handleRemove}
          >
            Remove
          </Button>
          <Button
            className="bg-violet-500 hover:bg-violet-600"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-12 gap-3 mt-3">
        <div className="col-span-12 md:col-span-3 text-sm">Code</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.code || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">
          Business Partner
        </div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.businessPartner || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">BP Order</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.bpOrder || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">Remarks</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.remarks || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">Confirm By</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.confirmedBy || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">Confirm On</div>
        <div className="col-span-12 md:col-span-9 flex">
          <div className="relative w-full">
            <Input
              type="text"
              value={
                form?.confirmedOn != null ? formatDate(form?.confirmedOn) : ""
              }
              className="w-full bg-gray-100 border-gray-300 pl-10"
              readOnly
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">Approved By</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.approvedBy || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">Approved On</div>
        <div className="col-span-12 md:col-span-9 flex">
          <div className="relative w-full">
            <Input
              type="text"
              value={
                form?.approvedOn != null ? formatDate(form?.approvedOn) : ""
              }
              className="w-full bg-gray-100 border-gray-300 pl-10"
              readOnly
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">
          Transaction Status
        </div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.transactionStatus || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
