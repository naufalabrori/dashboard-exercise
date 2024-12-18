"use client";

import { useEffect, useState } from "react";
import { OtherInboundHeader, otherInboundHeaderColumns } from "@/components/modules/dashboard/logistic/otherinbound/columns";
import { OtherInboundHeaderDataTable } from "@/components/modules/dashboard/logistic/otherinbound/data-table";
import axiosClient from "@/services/AxiosClient";
import useMenuStore from "@/hooks/useMenuStore";

export default function OtherInboundPage() {
  const [data, setData] = useState<OtherInboundHeader[]>([]);
  const { setMenu } = useMenuStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get("/OtherInboundHeader", { params: { Limit: 10 } });
        setData(response.data.otherInboundHeaders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    setMenu("Other Inbound")
  }, []);

  return (
    <div>
      <OtherInboundHeaderDataTable columns={otherInboundHeaderColumns} data={data} />
    </div>
  );
}
