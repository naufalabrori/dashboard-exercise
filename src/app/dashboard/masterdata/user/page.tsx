"use client";
import { CreateUserForm } from "@/components/modules/dashboard/masterdata/user/CreateForm";
import { UserDataTable } from "@/components/modules/dashboard/masterdata/user/data-table";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

const UserPage = () => {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("User");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CreateUserForm data={null}/>
      <UserDataTable/>
    </div>
  );
};

export default UserPage;
