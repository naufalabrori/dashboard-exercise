"use client";
import { useEffect } from "react";
import { otherInboundHeaderColumns } from "@/components/modules/dashboard/logistic/otherinbound/columns";
import { OtherInboundHeaderDataTable } from "@/components/modules/dashboard/logistic/otherinbound/data-table";
import useMenuStore from "@/hooks/useMenuStore";

export default function OtherInboundPage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Other Inbound")
  }, [setMenu]);

  return (
    <div>
      <OtherInboundHeaderDataTable columns={otherInboundHeaderColumns} initialData={[]} />
    </div>
  );
}
