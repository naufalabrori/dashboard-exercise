/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, PlusIcon } from "lucide-react";

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
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MenuDataTable } from "./menu/data-table-menu";
import { useCreateRoleDetail } from "@/services/Role/Details/createRoleDetail";

export function CreateRoleDetailForm({ headerId }: { headerId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog visibility
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateRoleDetail();
  const [menu, setMenu] = useState<any[]>([]);
  const handleData = (data: any[]) => {
    setMenu(data);
  };

  const handleSubmit = () => {
    if (menu.length === 0) {
      toast("Please select at least one menu", { type: "error" });
      return;
    }

    menu.forEach((data) => {
      const payload = {
        roleId: headerId,
        application: data.application,
        menuId: data.id,
        feature: data.name,
        permission: true,
      };

      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-RoleDetails-header"],
          });
          toast("Role Detail berhasil di simpan", { type: "success" });
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
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2 bg-violet-500 hover:bg-violet-600"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          <PlusIcon />
          Create Role Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl lg:max-w-[1000px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Create Role Detail</DialogTitle>
        </DialogHeader>
        <MenuDataTable dataMaster={handleData} />
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit} disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
