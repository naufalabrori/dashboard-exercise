"use client";
import { RoleDataTable } from "@/components/modules/dashboard/masterdata/role/data-table";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";
import { CreateRoleForm } from "@/components/modules/dashboard/masterdata/role/Create-Form";

const RolePage = () => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Role");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CreateRoleForm/>
      <RoleDataTable />
    </div>
  );
};

export default RolePage;
