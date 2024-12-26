/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteRoleDetail } from "@/services/Role/Details/deleteRoleDetail";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function DeleteRoleDetailAlert({ id }: { id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog visibility
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteRoleDetail();

  const handleSubmit = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-RoleDetails-header"],
        });
        toast("Role Detail Deleted", { type: "success" });
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
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this data
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}