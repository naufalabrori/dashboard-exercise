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
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import { useCreateOtherOutboundHeader } from "@/services/OtherOutbound/Header/createOtherOutboundHeader";
import { useListSupplier } from "@/services/Supplier/getListSupplier";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

const otherOutboundHeaderSchema = z.object({
  bussinessPartner: z.string(),
  bpOrder: z.string(),
  remarks: z.string().optional(),
});

type OtherOutboundHeaderFormValues = z.infer<typeof otherOutboundHeaderSchema>;

export function CreateOtherOutboundHeaderForm() {
  const [form, setForm] = useState<Partial<OtherOutboundHeaderFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof OtherOutboundHeaderFormValues, string>>
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

  const { mutate, isPending } = useCreateOtherOutboundHeader();

  const handleSubmit = () => {
    const result = otherOutboundHeaderSchema.safeParse(form);

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
        bussinessPartner: form.bussinessPartner,
        bpOrder: form.bpOrder,
        remarks: form.remarks ?? "",
        transactionStatus: "Open",
        confirmedBy: "",
        confirmedOn: null,
        approvedBy: "",
        approvedOn: null,
      };
      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-other-outbound-header"],
          });
          toast("Other Outbound Created", { type: "success" });
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

  const paramsSupplier: any = {
    limit: 1000,
    isActive: true,
  };

  const { data: listSupplier } = useListSupplier(paramsSupplier);

  const filteredList = listSupplier?.data.map((supplier) => ({
    value: [supplier.bpId, supplier.bpDescription, supplier.address],
    label: supplier.bpId + " - " + supplier.bpDescription,
  }));

  const [openSupplier, setOpenSupplier] = useState(false);
  const [bpDescription, setBpDescription] = useState("");
  const [address, setAddress] = useState("");

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2 bg-violet-500 hover:bg-violet-600"
          onClick={() => {
            setIsDialogOpen(true);
            setForm({});
            setErrors({});
            setBpDescription("");
            setAddress("");
          }}
        >
          <PlusIcon />
          Create Other Outbound
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Create Other Outbound header</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Choose Business Partner</div>
          <div className="col-span-3">
            <Popover open={openSupplier} onOpenChange={setOpenSupplier} modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openSupplier}
                  className="w-full justify-between"
                >
                  {form?.bussinessPartner
                    ? filteredList?.find(
                        (item) => item.value[0] === form?.bussinessPartner
                      )?.label
                    : "Select Business Partner..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search Business Partner..." />
                  <CommandList>
                    <CommandEmpty>No Business Partner found.</CommandEmpty>
                    <CommandGroup>
                      {filteredList?.map((item) => (
                        <CommandItem
                          key={item.value[0]}
                          value={item.label}
                          onSelect={(currentValue) => {
                            setForm((prev) => ({
                              ...prev,
                              bussinessPartner: item.value[0],
                            }));
                            setBpDescription(item.value[1] as string);
                            setAddress(item.value[2] as string);
                            setOpenSupplier(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              form?.bussinessPartner === item.value[0]
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.bussinessPartner && (
              <p className="text-red-500 text-sm">{errors.bussinessPartner}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Businness Partner ID</div>
          <div className="col-span-3">
            <Input
              placeholder="Business Partner ID"
              type="text"
              value={form?.bussinessPartner || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Businness Partner Description</div>
          <div className="col-span-3">
            <Input
              placeholder="Business Partner Description"
              type="text"
              value={bpDescription || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Businness Partner Address</div>
          <div className="col-span-3">
            <Textarea
              placeholder="Business Partner Address"
              value={address || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Businness Partner Order</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert BP Order"
              type="text"
              name="bpOrder"
              value={form.bpOrder || ""}
              onChange={onChange}
              className="w-full"
            />
            {errors.bpOrder && (
              <p className="text-red-500 text-sm">{errors.bpOrder}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Remarks</div>
          <div className="col-span-3">
            <Textarea
              placeholder="Insert Remarks"
              name="remarks"
              value={form.remarks || ""}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                const { value } = e.target;
                setForm((prev) => ({ ...prev, remarks: value }));
              }}
              className="w-full"
            />
            {errors.remarks && (
              <p className="text-red-500 text-sm">{errors.remarks}</p>
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
