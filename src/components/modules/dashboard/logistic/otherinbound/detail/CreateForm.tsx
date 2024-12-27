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
import { ChangeEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MasterItemDataTable } from "./master/data-table";
import { Master } from "@/services/Master/types";
import { useCreateOtherInboundDetail } from "@/services/OtherInbound/Detail/createOtherInboundDetail";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const otherInboundHeaderSchema = z.object({
  quantity: z.number(),
});

type OtherInboundHeaderFormValues = z.infer<typeof otherInboundHeaderSchema>;

export function CreateOtherInboundDetailForm({
  headerId,
}: {
  headerId: string;
}) {
  const [form, setForm] = useState<Partial<OtherInboundHeaderFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof OtherInboundHeaderFormValues, string>>
  >({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateOtherInboundDetail();

  const [master, setMaster] = useState<Master>();

  const handleData = (data: Master) => {
    setMaster(data);
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // Clear the error when user starts typing
    }));
  };

  const handleSubmit = () => {
    if (!master){
      toast("Please select item first", {
        type: "error",
      });
      return
    }
    
    form.quantity = Number(form.quantity);
    const result = otherInboundHeaderSchema.safeParse(form);

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
      const payload = {
        otherInboundHeaderId: headerId,
        itemCode: master?.itemCode,
        itemDesc: master?.itemDesc,
        materialType:
          master?.stockType == 1 ? "RM" : master?.stockType == 2 ? "FG" : "WIP",
        uom: master?.uom,
        qtyPerBag:
          Number(form.quantity) < Number(master?.quantityPerBag)
            ? Number(form.quantity)
            : Number(master?.quantityPerBag),
        quantity: Number(form.quantity),
        status: "In Progress",
      };

      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-other-inbound-detail"],
          });
          toast("Other Inbound Detail Created", { type: "success" });
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
          className="mb-2 bg-violet-500 hover:bg-violet-600"
          onClick={() => {
            setIsDialogOpen(true);
            setForm({});
            setErrors({});
            setMaster(undefined);
          }}
        >
          <PlusIcon />
          Create Other Inbound Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl lg:max-w-[1000px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Create Other Inbound Detail</DialogTitle>
        </DialogHeader>
        <MasterItemDataTable dataMaster={handleData} />
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Item Code</div>
          <div className="col-span-3">
            <Input
              placeholder="Item Code"
              type="text"
              value={master?.itemCode || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Item Desc</div>
          <div className="col-span-3">
            <Input
              placeholder="Item Desc"
              type="text"
              value={master?.itemDesc || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">UOM</div>
          <div className="col-span-3">
            <Input
              placeholder="UOM"
              type="text"
              value={master?.uom || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Qty Per Bag</div>
          <div className="col-span-3">
            <Input
              placeholder="Qty Per Bag"
              type="text"
              value={master?.quantityPerBag || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Material Type</div>
          <div className="col-span-3">
            <Input
              placeholder="Material Type"
              type="text"
              value={
                master?.stockType == 1
                  ? "RM"
                  : master?.stockType == 2
                  ? "FG"
                  : master?.stockType == 3
                  ? "WIP"
                  : ""
              }
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Quantity</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Quantity"
              type="number"
              name="quantity"
              value={form.quantity || ""}
              onChange={onChange}
              className="w-full"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>
        </div>
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
