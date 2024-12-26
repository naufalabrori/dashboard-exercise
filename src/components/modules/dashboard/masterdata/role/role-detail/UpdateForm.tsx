/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, PenIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import { useCreateRoleDetail } from "@/services/Role/Details/createRoleDetail";

const roleDetailSchema = z.object({
  id: z.string(),
  roleId: z.string(),
  menuId: z.string(),
  application: z.string(),
  menuGroup: z.string(),
  feature: z.string(),
  permission: z.boolean(),
  isActive: z.boolean(),
});

type RoleDetailFormValues = z.infer<typeof roleDetailSchema>;

export function UpdateRoleDetailForm({ data }: { data: RoleDetailFormValues }) {
  const [form, setForm] = useState<Partial<RoleDetailFormValues>>(data);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RoleDetailFormValues, string>>
  >({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const queryClient = useQueryClient();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const { mutate, isPending } = useCreateRoleDetail();

  const handleSubmit = () => {
    const result = roleDetailSchema.safeParse(form);

    if (!result.success) {
      // Collect and display validation errors
      const validationErrors = result.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      );
      setErrors(validationErrors);
    } else {
      mutate(form, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-RoleDetails-header"],
          });
          toast("Role Detail Updated", { type: "success" });
        },
        onError: (error: any) => {
          toast(
            error?.response?.data?.detail ||
              "Terjadi kesalahan, silakan coba beberapa saat lagi.",
            {
              type: "error",
            }
          );
        },
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2 bg-yellow-500 hover:bg-yellow-600 mr-1"
          onClick={() => setIsDialogOpen(true)}
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle>Update Role</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Application</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Application"
              type="text"
              name="application"
              value={form.application || ""}
              onChange={onChange}
              className="max-w-xs"
              readOnly
            />
            {errors.application && (
              <p className="text-red-500 text-sm">{errors.application}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Group Feature</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Group Feature"
              type="text"
              name="menuGroup"
              value={form.menuGroup || ""}
              onChange={onChange}
              className="max-w-xs"
              readOnly
            />
            {errors.menuGroup && (
              <p className="text-red-500 text-sm">{errors.menuGroup}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Feature</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Feature"
              type="text"
              name="feature"
              value={form.feature || ""}
              onChange={onChange}
              className="max-w-xs"
              readOnly
            />
            {errors.feature && (
              <p className="text-red-500 text-sm">{errors.feature}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Permission</div>
          <div className="col-span-3">
            <Switch
              checked={form?.permission}
              name="permission"
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, permission: checked }))
              }
              negativeText="No"
              positiveText="Yes"
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Is Active</div>
          <div className="col-span-3">
            <Switch
              checked={form?.isActive}
              name="isActive"
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, isActive: checked }))
              }
              negativeText="No"
              positiveText="Yes"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit} disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
