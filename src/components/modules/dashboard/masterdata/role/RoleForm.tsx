import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useGetRoleById } from "@/services/Role/getRoleById";
import { Role } from "@/services/Role/types";
import React, { useEffect, useState } from "react";

export function RoleForm({ id }: { id: string }) {
  const [form, setForm] = useState<Role | null>(null);
  const { data } = useGetRoleById(id);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  return (
    <div className="p-5">
      <div className="text-xl font-bold mb-6">Role</div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3 text-sm font-bold">Code</div>
        <div className="col-span-12 md:col-span-9">
          <Input
            id="role-code"
            type="text"
            value={form?.code || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm font-bold">
          Role Name
        </div>
        <div className="col-span-12 md:col-span-9">
          <Input
            id="role-name"
            type="text"
            value={form?.name || ""}
            className="w-full bg-gray-100 border-gray-300"
            readOnly
          />
        </div>
        <div className="col-span-12 md:col-span-3 text-sm font-bold">
          Is Active
        </div>
        <div className="col-span-12 md:col-span-9">
          <Switch
            checked={form?.isActive}
            name="isActive"
            negativeText="No"
            positiveText="Yes"
          />
        </div>
      </div>
      
    </div>
  );
}
