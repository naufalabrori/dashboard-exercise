/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxIcon, CalendarIcon, Loader2 } from "lucide-react";

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
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useListTransportation } from "@/services/Dropdownlist/getListTransportation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCreateOtherInboundReceive } from "@/services/OtherInbound/Receive/createOtherInboundReceive";
import { OtherInboundDetail } from "@/services/OtherInbound/Detail/types";

const otherInboundReceiveSchema = z.object({
  noSuratJalan: z.string(),
  transportasi: z.string(),
  lotNo: z.string(),
  manufacturingDate: z.date(),
  departureDate: z.date(),
  inDate: z.date(),
  expiredDate: z.date(),
  quantity: z.number(),
  receiveType: z.string(),
});

type OtherInboundReceiveFormValues = z.infer<typeof otherInboundReceiveSchema>;

export function OtherInboundReceiveForm({
  dataDetail,
}: {
  dataDetail?: OtherInboundDetail;
}) {
  const [form, setForm] = useState<Partial<OtherInboundReceiveFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof OtherInboundReceiveFormValues, string>>
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

  const { mutate, isPending } = useCreateOtherInboundReceive();

  const handleSubmit = () => {
    form.quantity = Number(form?.quantity);
    const result = otherInboundReceiveSchema.safeParse(form);

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
        otherInboundDetailId: dataDetail?.id,
        stockCode: "",
        itemCode: dataDetail?.itemCode,
        itemDesc: dataDetail?.itemDesc,
        transportasi: form.transportasi,
        noSuratJalan: form.noSuratJalan,
        lotNo: form.lotNo,
        manufacturingDate: form.manufacturingDate ? format(form.manufacturingDate, "yyyy-MM-dd") : null,
        departureDate: form.departureDate ? format(form.departureDate, "yyyy-MM-dd") : null,
        inDate: form.inDate ? format(form.inDate, "yyyy-MM-dd") : null,
        expiredDate: form.expiredDate ? format(form.expiredDate, "yyyy-MM-dd") : null,
        quantity: Number(form?.quantity),
        qtyPerBag: dataDetail?.qtyPerBag,
        receiveStatus: "Receive",
        receivedBy: "",
        receivedOn: null,
        receiveType: form.receiveType,
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

  const { data: listTransportation } = useListTransportation();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2 bg-green-500 hover:bg-green-600"
          onClick={() => {
            setIsDialogOpen(true);
            setForm({});
            setErrors({});
          }}
        >
          <BoxIcon />
          Receive
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Receive Material</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Delivery Order Number</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Delivery Order Number"
              type="text"
              name="noSuratJalan"
              value={form?.noSuratJalan || ""}
              className="w-full"
              onChange={onChange}
            />
            {errors.noSuratJalan && (
              <p className="text-red-500 text-sm">{errors.noSuratJalan}</p>
            )}
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
                <SelectValue placeholder="Select Transportation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listTransportation?.data.map((item) => (
                    <SelectItem key={item.key} value={item.label}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.transportasi && (
              <p className="text-red-500 text-sm">{errors.transportasi}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Lot No</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Lot No"
              type="text"
              name="lotNo"
              value={form?.lotNo || ""}
              className="w-full"
              onChange={onChange}
            />
            {errors.lotNo && (
              <p className="text-red-500 text-sm">{errors.lotNo}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Manufacturing Date</div>
          <div className="col-span-3">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form?.manufacturingDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {form?.manufacturingDate ? (
                    format(form?.manufacturingDate, "PPP")
                  ) : (
                    <span>Select Manufacturing Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form?.manufacturingDate}
                  onSelect={(date) => {
                    setForm((prev) => ({ ...prev, manufacturingDate: date }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.manufacturingDate && (
              <p className="text-red-500 text-sm">{errors.manufacturingDate}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Departure Date</div>
          <div className="col-span-3">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form?.departureDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {form?.departureDate ? (
                    format(form?.departureDate, "PPP")
                  ) : (
                    <span>Select Departure Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form?.departureDate}
                  onSelect={(date) => {
                    setForm((prev) => ({ ...prev, departureDate: date }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.departureDate && (
              <p className="text-red-500 text-sm">{errors.departureDate}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">In Date</div>
          <div className="col-span-3">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form?.inDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {form?.inDate ? (
                    format(form?.inDate, "PPP")
                  ) : (
                    <span>Select In Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form?.inDate}
                  onSelect={(date) => {
                    setForm((prev) => ({ ...prev, inDate: date }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.inDate && (
              <p className="text-red-500 text-sm">{errors.inDate}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Expired Date</div>
          <div className="col-span-3">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form?.expiredDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {form?.expiredDate ? (
                    format(form?.expiredDate, "PPP")
                  ) : (
                    <span>Select Expired Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form?.expiredDate}
                  onSelect={(date) => {
                    setForm((prev) => ({ ...prev, expiredDate: date }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.expiredDate && (
              <p className="text-red-500 text-sm">{errors.expiredDate}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Quantity Order</div>
          <div className="col-span-3">
            <Input
              type="text"
              value={dataDetail?.quantity || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">UOM</div>
          <div className="col-span-3">
            <Input
              type="text"
              value={dataDetail?.uom || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Receive Type</div>
          <div className="col-span-3">
            <RadioGroup
              defaultValue="Non-Full Bag"
              onValueChange={(value) => {
                setForm((prev) => ({ ...prev, receiveType: value }));
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Non-Full Bag" id="r1" />
                <Label htmlFor="r1">Non-Full Bag</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Full Bag" id="r2" />
                <Label htmlFor="r2">Full Bag</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Qty Per Bag</div>
          <div className="col-span-3">
            <Input
              type="text"
              value={dataDetail?.qtyPerBag || ""}
              className="w-full bg-gray-100 border-gray-300"
              readOnly
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">Receive Quantity</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Receive Quantity"
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
