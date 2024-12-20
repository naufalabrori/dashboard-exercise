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
import { useToast } from "@/hooks/use-toast";
import { useDeleteRole } from "@/services/Role/deleteRole";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

export function DeleteRoleAlert({ id }: { id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog visibility
  const queryClient = useQueryClient();
  
  const { toast } = useToast();
  const { mutate, isSuccess, isError } = useDeleteRole();
  
    const handleSubmit = () => {
      mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-roles-header"],
          });
          toast({ title: "Success", description: "Role created" });
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: "Failed",
            description:
              error?.response?.data?.detail ||
              "Terjadi kesalahan, silakan coba beberapa saat lagi.",
          });
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
          <AlertDialogAction onClick={handleSubmit}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
