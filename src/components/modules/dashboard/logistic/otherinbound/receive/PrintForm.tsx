/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxIcon, CalendarIcon, Loader2, PrinterIcon } from "lucide-react";

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
import { useCreateOtherInboundReceive } from "@/services/OtherInbound/Receive/createOtherInboundReceive";
import { OtherInboundReceive } from "@/services/OtherInbound/Receive/types";
import { useListPrinter } from "@/services/Dropdownlist/getListPrinter";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "path";
import { formatDate } from "@/lib/utils";

const printOtherInboundReceiveSchema = z.object({
  printerIpAddress: z.string(),
  printQuantity: z.number(),
});

type PrintOtherInboundReceiveFormValues = z.infer<typeof printOtherInboundReceiveSchema>;

export function PrintOtherInboundReceiveForm({
  dataReceive,
}: {
  dataReceive?: OtherInboundReceive;
}) {
  const [form, setForm] = useState<Partial<PrintOtherInboundReceiveFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof PrintOtherInboundReceiveFormValues, string>>
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

  const { mutate, isPending } = useCreateOtherInboundReceive();

  const handleSubmit = () => {
    const result = printOtherInboundReceiveSchema.safeParse(form);

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
        
      };
      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-other-inbound-receive"],
          });
          toast("Receive Successfully", { type: "success" });
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

  const { data: listPrinter } = useListPrinter();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2 bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            setIsDialogOpen(true);
            setForm({});
            setErrors({});
          }}
        >
          <PrinterIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Print Item Label</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Item Code</div>
          <div className="col-span-3">
            <Input
              placeholder="Item Code"
              type="text"
              value={dataReceive?.itemCode || ""}
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
              value={dataReceive?.itemDesc || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Delivery Order Number</div>
          <div className="col-span-3">
            <Input
              placeholder="Delivery Order Number"
              type="text"
              value={dataReceive?.noSuratJalan || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Lot No</div>
          <div className="col-span-3">
            <Input
              placeholder="Lot No"
              type="text"
              value={dataReceive?.lotNo || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Manufacturing Date</div>
          <div className="col-span-3">
            <Input
              type="text"
              value={dataReceive?.manufacturingDate && formatDate(dataReceive?.manufacturingDate) || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Departure Date</div>
          <div className="col-span-3">
            <Input
              type="text"
              value={dataReceive?.departureDate && formatDate(dataReceive?.departureDate) || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">In Date</div>
          <div className="col-span-3">
            <Input
              type="text"
              value={dataReceive?.inDate && formatDate(dataReceive?.inDate) || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Expired Date</div>
          <div className="col-span-3">
            <Input
              type="text"
              value={dataReceive?.expiredDate && formatDate(dataReceive?.expiredDate) || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Quantity</div>
          <div className="col-span-3">
            <Input
              type="text"
              value={dataReceive?.quantity || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Transportation</div>
          <div className="col-span-3">
            <Select
              name="transportasi"
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, transportasi: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Printer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listPrinter?.data.map((item) => (
                    <SelectItem key={item.key} value={item.label}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.printerIpAddress && (
              <p className="text-red-500 text-sm">{errors.printerIpAddress}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Print Quantity</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Print Quantity"
              type="number"
              name="printQuantity"
              value={form.printQuantity || ""}
              onChange={onChange}
              className="w-full"
            />
            {errors.printQuantity && (
              <p className="text-red-500 text-sm">{errors.printQuantity}</p>
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
