import { BaseTypes } from "@/services/baseTypes";

export type OtherInboundDetail = BaseTypes & {
  OtherInboundHeaderId?: string;
  ItemCode?: string;
  ItemDesc?: string;
  MaterialType?: string;
  Uom?: string;
  QtyPerBag?: number;
  Quantity?: number;
  Status?: string;
}