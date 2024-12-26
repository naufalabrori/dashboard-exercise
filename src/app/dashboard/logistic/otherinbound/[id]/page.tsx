"use client";
import { OtherInboundDetailDataTable } from "@/components/modules/dashboard/logistic/otherinbound/detail/data-table";
import { OtherInboundHeaderForm } from "@/components/modules/dashboard/logistic/otherinbound/header/OtherInboundHeaderForm";
import { Separator } from "@/components/ui/separator";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

const RolePageByID = ({ params }: { params: { id: string } }) => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Other Inbound");
  }, [setMenu]);

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <OtherInboundHeaderForm id={params.id} />
      </div>
      <div className="bg-white p-9 rounded-md shadow-lg">
        <div className="text-xl font-bold mb-3">Other Inbound Detail</div>
        <Separator className="mb-3" />
        <OtherInboundDetailDataTable headerId={params.id} />
      </div>
    </>
  );
};

export default RolePageByID;
