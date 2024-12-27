import { BaseTypes } from "@/services/baseTypes";

export type OtherInboundDetail = BaseTypes & {
  otherInboundHeaderId?: string;
  itemCode?: string;
  itemDesc?: string;
  materialType?: string;
  uom?: string;
  qtyPerBag?: number;
  quantity?: number;
  status?: string;
}