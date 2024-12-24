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
import { useCreateRole } from "@/services/Role/createRole";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";

const roleSchema = z.object({
  name: z.string().min(3, "Role Name must be at least 3 characters"),
  isActive: z.boolean().default(true),
});

type RoleFormValues = z.infer<typeof roleSchema>;

export function UpdateRoleForm({ data }: { data: RoleFormValues }) {
  const [form, setForm] = useState<Partial<RoleFormValues>>(data);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RoleFormValues, string>>
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

  const { mutate, isPending } = useCreateRole();

  const handleSubmit = () => {
    const result = roleSchema.safeParse(form);

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
            queryKey: ["get-roles-header"],
          });
          toast("Role Updated", { type: "success" });
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
      setIsDialogOpen(false); // Close dialog after success
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
          <div className="col-span-2">Role Name</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Role Name"
              type="text"
              name="name"
              value={form.name || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
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
            { isPending ? <Loader2 className="animate-spin" /> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
