"use client";
import { InboundHeaderDataTable } from "@/components/modules/dashboard/logistic/inbound/data-table";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

const InboundPage = () => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Inbound");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <InboundHeaderDataTable />
    </div>
  );
};

export default InboundPage;
