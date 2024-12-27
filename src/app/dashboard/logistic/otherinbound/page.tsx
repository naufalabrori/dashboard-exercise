"use client";
import { useEffect } from "react";
import { OtherInboundHeaderDataTable } from "@/components/modules/dashboard/logistic/otherinbound/header/data-table";
import useMenuStore from "@/hooks/useMenuStore";
import { CreateOtherInboundHeaderForm } from "@/components/modules/dashboard/logistic/otherinbound/header/CreateForm";

export default function OtherInboundPage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Other Inbound");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CreateOtherInboundHeaderForm/>
      <OtherInboundHeaderDataTable />
    </div>
  );
}
