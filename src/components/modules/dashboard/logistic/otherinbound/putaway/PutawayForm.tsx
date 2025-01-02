/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxIcon, CalendarIcon, Check, ChevronsUpDown, Loader2, PrinterIcon } from "lucide-react";

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
import { toast } from "react-toastify";
import { OtherInboundReceive } from "@/services/OtherInbound/Receive/types";
import { useListPrinter } from "@/services/Dropdownlist/getListPrinter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatDate } from "@/lib/utils";
import { useCreateOtherInboundPutaway } from "@/services/OtherInbound/Putaway/createOtherInboundPutaway";
import { useListBinRack } from "@/services/BinRack/getListBinRack";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const InboundPutawaySchema = z.object({
  putawayQty: z.number(),
  binRackId: z.string(),
  binRackCode: z.string(),
  binRackName: z.string(),
});

type InboundPutawayFormValues = z.infer<typeof InboundPutawaySchema>;

export function OtherInboundPutawayForm({
  dataReceive,
}: {
  dataReceive?: OtherInboundReceive;
}) {
  const [form, setForm] = useState<Partial<InboundPutawayFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof InboundPutawayFormValues, string>>
  >({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const { mutate, isPending } = useCreateOtherInboundPutaway();

  const handleSubmit = () => {
    form.putawayQty = Number(form?.putawayQty);
    const result = InboundPutawaySchema.safeParse(form);

    if (!result.success) {
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
        otherInboundReceiveId: dataReceive?.id,
        stockCode: dataReceive?.stockCode,
        itemCode: dataReceive?.itemCode,
        itemDesc: dataReceive?.itemDesc,
        transportasi: dataReceive?.transportasi,
        noSuratJalan: dataReceive?.noSuratJalan,
        lotNo: dataReceive?.lotNo,
        inDate: dataReceive?.inDate,
        expiredDate: dataReceive?.expiredDate,
        qtyPerBag: dataReceive?.qtyPerBag,
        putawayMethod: "Web",
        putBy: "",
        putOn: new Date().toISOString(),
        ...form,
      };
      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-other-inbound-receive"],
          });
          queryClient.invalidateQueries({
            queryKey: ["get-other-inbound-putaway"],
          });
          toast("Putaway Successfully", { type: "success" });
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

  const paramsBinRack = {
    orderBy: "code",
    Limit: 10000,
    isDesc: false,
    isActive: true,
  }
  const { data: listBinRack } = useListBinRack(paramsBinRack);

  const filteredList = listBinRack?.data.map((item) => ({
    value: [item.id, item.code],
    label: item.code,
  }));

  const [openBinRack, setOpenBinRack] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="text-violet-500 underline cursor-pointer">Putaway</div>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Putaway</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Available Qty</div>
          <div className="col-span-3">
            <Input
              placeholder="Available Qty"
              type="text"
              value={dataReceive?.availablePutawayQty || 0}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Putaway Qty</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Putaway Qty"
              type="number"
              name="putawayQty"
              value={form?.putawayQty || ""}
              onChange={onChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Qty Per Bag</div>
          <div className="col-span-3">
            <Input
              placeholder="Qty Per Bag"
              type="text"
              value={dataReceive?.qtyPerBag || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Select BinRack</div>
          <div className="col-span-3">
            <Popover open={openBinRack} onOpenChange={setOpenBinRack} modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openBinRack}
                  className="w-full justify-between"
                >
                  {form?.binRackCode
                    ? filteredList?.find(
                        (item) => item.value[1] === form?.binRackCode
                      )?.label
                    : "Select BinRack..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search BinRack..." />
                  <CommandList>
                    <CommandEmpty>No BinRack found.</CommandEmpty>
                    <CommandGroup>
                      {filteredList?.map((item) => (
                        <CommandItem
                          key={item.value[1]}
                          value={item.value[1]}
                          onSelect={(currentValue) => {
                            setForm((prev) => ({
                              ...prev,
                              binRackId: item.value[0],
                              binRackCode: currentValue,
                              binRackName: currentValue,
                            }));
                            setOpenBinRack(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              form?.binRackCode === item.value[1]
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
            {errors.binRackCode && (
              <p className="text-red-500 text-sm">{errors.binRackCode}</p>
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
