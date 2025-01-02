"use client";
import { CreateOtherOutboundHeaderForm } from "@/components/modules/dashboard/logistic/OtherOutbound/Header/CreateForm";
import { OtherOutboundHeaderDataTable } from "@/components/modules/dashboard/logistic/OtherOutbound/Header/data-table";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

const OtherOutboundPage = () => {
  const { setMenu } = useMenuStore();
  useEffect(() => {
    setMenu("Other Outbound");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CreateOtherOutboundHeaderForm/>
      <OtherOutboundHeaderDataTable />
    </div>
  );
};

export default OtherOutboundPage;
