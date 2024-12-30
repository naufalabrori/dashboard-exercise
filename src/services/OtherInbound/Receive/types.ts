import { BaseTypes } from "@/services/baseTypes";

export type OtherInboundReceive = BaseTypes & {
  otherInboundDetailId?: string;
  stockCode?: string;
  itemCode?: string;
  itemDesc?: string;
  transportasi?: string;
  noSuratJalan?: string;
  lotNo?: string;
  manufacturingDate?: string | null;
  departureDate?: string | null;
  inDate?: string | null;
  expiredDate?: string | null;
  quantity?: number;
  qtyPerBag?: number;
  receiveStatus?: string;
  receivedBy?: string;
  receivedOn?: string | null;
  receiveType?: string;
  availablePutawayQty?: number;
  availablePutawayBagQty?: number;
}

export type PrintOtherInboundReceive = OtherInboundReceive & {}