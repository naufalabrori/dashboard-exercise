import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { OtherInboundDetail } from "@/services/OtherInbound/Detail/types";
import React, { useEffect, useState } from "react";

export function OtherInboundDetailForm({ data }: { data?: OtherInboundDetail }) {
  const [form, setForm] = useState<OtherInboundDetail | null>(null);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  return (
    <div className="p-5">
      <div className="text-xl font-bold mb-3">Other Inbound Detail</div>
      <Separator />
      <div className="grid grid-cols-12 gap-3 mt-3">
        <div className="col-span-12 md:col-span-3 text-sm">Item Code</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.itemCode || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">
          Item Desc
        </div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.itemDesc || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">Type</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.materialType || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">UOM</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.uom || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">Qty Per Bag</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.qtyPerBag || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">Order Quantity</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.quantity || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm">
          Status
        </div>
        <div className="col-span-12 md:col-span-9">
          <Input
            type="text"
            value={form?.status || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
