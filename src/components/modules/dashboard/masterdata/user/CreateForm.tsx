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
import { useCreateUser } from "@/services/User/createUser";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListBagian } from "@/services/Dropdownlist/getListBagian";
import { useListRole } from "@/services/Role/getListRoles";
import { User } from "@/services/User/types";
import { objectToFormData } from "@/lib/utils";

const userSchema = z.object({
  NIK: z.string().max(16, "NIK only max 16 characters"),
  username: z.string().min(5, "Username at least 5 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  fullname: z.string(),
  photo: z.string(),
  Bagian: z.string(),
  roleId: z.string(),
  AccessApp: z.number(),
  inforId: z.string(),
  isActive: z.boolean().default(true),
});

type UserFormValues = z.infer<typeof userSchema>;

export function CreateUserForm({ data }: { data: User | null }) {
  const [form, setForm] = useState<Partial<UserFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormValues, string>>
  >({});
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog visibility
  const queryClient = useQueryClient();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const { mutate, isSuccess, isError } = useCreateUser(data?.id as string);

  const handleSubmit = () => {
    const withBoolean = {
      ...form,
      nik: form.NIK == null ? "" : form.NIK,
      inforId: form.inforId == null ? "" : form.inforId,
      isActive: !!form.isActive,
    };

    const result = userSchema.safeParse(withBoolean);
    const newPayload = objectToFormData(withBoolean);

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
      mutate(newPayload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-list-users"],
          });
          toast("User Created", { type: "success" });
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

  const { data: listBagian } = useListBagian();

  const paramsRole: any = {
    limit: 1000,
    isActive: true,
  };

  const { data: listRole } = useListRole(paramsRole);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2 bg-violet-500 hover:bg-violet-600"
          onClick={() => {
            setIsDialogOpen(true);
            setForm({});
          }}
        >
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Username</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Username"
              type="text"
              name="username"
              value={form.username || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">NIK</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert NIK"
              type="text"
              name="NIK"
              value={form.NIK || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.NIK && <p className="text-red-500 text-sm">{errors.NIK}</p>}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">ID Infor</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert ID Infor"
              type="text"
              name="inforId"
              value={form.inforId || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.inforId && (
              <p className="text-red-500 text-sm">{errors.inforId}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Fullname</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Fullname"
              type="text"
              name="fullname"
              value={form.fullname || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Password</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Password"
              type="password"
              name="password"
              value={form.password || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Photo</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert ID Infor"
              type="file"
              name="photo"
              value={form.photo || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Access App</div>
          <div className="col-span-3">
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, AccessApp: Number(value) }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Access App" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Web</SelectItem>
                  <SelectItem value="2">Mobile</SelectItem>
                  <SelectItem value="3">Web & Mobile</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.AccessApp && (
              <p className="text-red-500 text-sm">{errors.AccessApp}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Section</div>
          <div className="col-span-3">
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, Bagian: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listBagian?.data.map((item) => (
                    <SelectItem key={item.key} value={item.label}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.Bagian && (
              <p className="text-red-500 text-sm">{errors.Bagian}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Role</div>
          <div className="col-span-3">
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, roleId: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listRole?.data.map((item) => (
                    <SelectItem key={item.id} value={item.id as string}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.roleId && (
              <p className="text-red-500 text-sm">{errors.roleId}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
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
          <Button type="submit" onClick={handleSubmit} className="mb-2 sm:mb-0">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
