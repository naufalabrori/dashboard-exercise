"use client";
import { CreateOtherOutboundDetailForm } from "@/components/modules/dashboard/logistic/OtherOutbound/Detail/CreateForm";
import { OtherOutboundDetailDataTable } from "@/components/modules/dashboard/logistic/OtherOutbound/Detail/data-table";
import { OtherOutboundHeaderForm } from "@/components/modules/dashboard/logistic/OtherOutbound/Header/OtherOutboundHeaderForm";
import { Separator } from "@/components/ui/separator";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

const OtherOutboundPageByID = ({ params }: { params: { id: string } }) => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Other Outbound");
  }, [setMenu]);

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <OtherOutboundHeaderForm id={params.id} />
      </div>
      <div className="bg-white p-9 rounded-md shadow-lg">
        <div className="text-xl font-bold mb-3">Other Inbound Detail</div>
        <Separator className="mb-3" />
        <CreateOtherOutboundDetailForm headerId={params.id} />
        <OtherOutboundDetailDataTable headerId={params.id} />
      </div>
    </>
  );
};

export default OtherOutboundPageByID;
