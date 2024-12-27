import { BaseTypes } from "@/services/baseTypes";

export type OtherInboundReceive = BaseTypes & {
  otherInboundDetailId?: string;
  stockCode?: string;
  itemCode?: string;
  itemDesc?: string;
  transportasi?: string;
  noSuratJalan?: string;
  lotNo?: string;
  manufacturingDate?: string;
  departureDate?: string;
  inDate?: string;
  expiredDate?: string;
  quantity?: number;
  qtyPerBag?: number;
  receiveStatus?: string;
  receivedBy?: string;
  receivedOn?: string;
  receiveType?: string;
  availablePutawayQty?: number;
  availablePutawayBagQty?: number;
}