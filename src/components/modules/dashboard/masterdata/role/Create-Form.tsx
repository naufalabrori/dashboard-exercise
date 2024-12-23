/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusIcon } from "lucide-react";

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
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateRole } from "@/services/Role/createRole";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";

const roleSchema = z.object({
  name: z.string().min(3, "Role Name must be at least 3 characters"),
  isActive: z.boolean().default(true),
});

type RoleFormValues = z.infer<typeof roleSchema>;

export function CreateRoleForm() {
  const [form, setForm] = useState<Partial<RoleFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof RoleFormValues, string>>
  >({});
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog visibility
  const queryClient = useQueryClient();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // Clear the error when user starts typing
    }));
  };

  const { mutate, isSuccess, isError } = useCreateRole();

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
          toast("Role Created", { type: "success" });
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
      // Clear form and errors
      setForm({});
      setErrors({});
      setIsDialogOpen(false); // Close dialog after success
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2 bg-violet-500 hover:bg-violet-500"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
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
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
