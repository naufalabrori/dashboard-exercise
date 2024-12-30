import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { useGetOtherInboundHeaderById } from "@/services/OtherInbound/Header/getOtherInboundHeaderById";
import { OtherInboundHeader } from "@/services/OtherInbound/Header/types";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";

export function OtherInboundHeaderForm({ id }: { id: string }) {
  const [form, setForm] = useState<OtherInboundHeader | null>(null);
  const { data } = useGetOtherInboundHeaderById(id);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  return (
    <div className="p-5">
      <div className="text-xl font-bold mb-3">Other Inbound Header</div>
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
              value={form?.confirmedOn != null ? formatDate(form?.confirmedOn) : ""}
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
              value={form?.approvedOn != null ? formatDate(form?.approvedOn) : ""}
              className="w-full bg-gray-100 border-gray-300 pl-10"
              readOnly
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">Transaction Status</div>
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
