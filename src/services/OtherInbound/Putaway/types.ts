import { BaseTypes } from "@/services/baseTypes";

export type OtherInboundPutaway = BaseTypes & {
  otherInboundReceiveId?: string;
  stockCode?: string;
  itemDesc?: string;
  transportasi?: string;
  noSuratJalan?: string;
  lotNo?: string;
  inDate?: string | null;
  expiredDate?: string | null;
  putawayQty?: number;
  qtyPerBag?: number;
  putawayMethod?: string;
  binRackId?: string;
  binRackCode?: string;
  binRackName?: string;
  putBy?: string;
  putOn?: string;
};