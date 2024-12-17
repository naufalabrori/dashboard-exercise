"use client"; // Jika menggunakan App Router di Next.js

import { useEffect, useState } from "react";
import { OtherInboundHeader, otherInboundHeaderColumns } from "@/components/modules/dashboard/logistic/otherinbound/columns";
import { OtherInboundHeaderDataTable } from "@/components/modules/dashboard/logistic/otherinbound/data-table";
import axiosClient from "@/services/AxiosClient";

export default function DemoPage() {
  const [data, setData] = useState<OtherInboundHeader[]>([]);

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
  }, []);

  return (
    <div>
      <OtherInboundHeaderDataTable columns={otherInboundHeaderColumns} data={data} />
    </div>
  );
}
