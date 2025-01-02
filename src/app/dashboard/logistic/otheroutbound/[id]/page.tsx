"use client";
import { OtherOutboundHeaderForm } from "@/components/modules/dashboard/logistic/OtherOutbound/Header/OtherOutboundHeaderForm";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

const RolePageByID = ({ params }: { params: { id: string } }) => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Other Outbound");
  }, [setMenu]);

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <OtherOutboundHeaderForm id={params.id} />  
      </div>
    </>
  );
};

export default RolePageByID;
