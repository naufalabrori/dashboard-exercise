"use client";
import { CreateRoleDetailForm } from "@/components/modules/dashboard/masterdata/role/role-detail/CreateForm";
import { RoleDetailDataTable } from "@/components/modules/dashboard/masterdata/role/role-detail/data-table";
import { RoleForm } from "@/components/modules/dashboard/masterdata/role/RoleForm";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

const RolePageByID = ({ params }: { params: { id: string } }) => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Role");
  }, [setMenu]);

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <RoleForm id={params.id} />
      </div>
      <div className="bg-white p-9 rounded-md shadow-lg">
        <CreateRoleDetailForm headerId={params.id} />
        <RoleDetailDataTable headerId={params.id} />
      </div>
    </>
  );
};

export default RolePageByID;
