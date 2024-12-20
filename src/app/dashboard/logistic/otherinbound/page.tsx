"use client";
import { useEffect } from "react";
import { OtherInboundHeaderDataTable } from "@/components/modules/dashboard/logistic/otherinbound/data-table";
import useMenuStore from "@/hooks/useMenuStore";

export default function OtherInboundPage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Other Inbound");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <OtherInboundHeaderDataTable />
    </div>
  );
}
