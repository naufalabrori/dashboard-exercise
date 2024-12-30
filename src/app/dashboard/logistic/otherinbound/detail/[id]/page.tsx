"use client"
import { OtherInboundDetailForm } from '@/components/modules/dashboard/logistic/otherinbound/detail/OtherInboundDetailForm'
import { OtherInboundPutawayDataTable } from '@/components/modules/dashboard/logistic/otherinbound/putaway/data-table';
import { OtherInboundReceiveDataTable } from '@/components/modules/dashboard/logistic/otherinbound/receive/data-table';
import { OtherInboundReceiveForm } from '@/components/modules/dashboard/logistic/otherinbound/receive/ReceiveForm';
import { Separator } from '@/components/ui/separator';
import useMenuStore from '@/hooks/useMenuStore';
import { useGetOtherInboundDetailById } from '@/services/OtherInbound/Detail/getOtherInboundDetailById';
import React, { useEffect } from 'react'

const RoleDetailPageById = ({ params }: { params: { id: string } }) => {
  const { setMenu } = useMenuStore();

  const { data } = useGetOtherInboundDetailById(params.id);

  useEffect(() => {
    setMenu("Other Inbound");
  }, [setMenu]);

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <OtherInboundDetailForm data={data} />
      </div>
      <div className="bg-white p-9 rounded-md shadow-lg">
        <div className="text-xl font-bold mb-3">Other Inbound Receive</div>
        <Separator className="mb-3" />
        <OtherInboundReceiveForm dataDetail={data} />
        <OtherInboundReceiveDataTable detailId={params.id} />
      </div>
      <div className="bg-white p-9 rounded-md shadow-lg">
        <div className="text-xl font-bold mb-3">Other Inbound Putaway</div>
        <Separator className="mb-3" />
        <OtherInboundPutawayDataTable detailId={params.id} />
      </div>
    </>
  )
}

export default RoleDetailPageById