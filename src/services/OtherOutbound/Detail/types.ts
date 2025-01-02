import { BaseTypes } from "@/services/baseTypes";

export type OtherOutboundDetail = BaseTypes & {
  otherOutboundHeaderId?: string;
  itemCode?: string;
  itemDesc?: string;
  quantity?: number;
  uom?: string;
  qtyPerBag?: number;
  status?: string;
  preparedBy?: string;
  preparedOn?: string | null;
  checkedBy?: string;
  checkedOn?: string | null;
  confirmedBy?: string;
  confirmedOn?: string | null;
  diffQty?: number;
  returnQty?: number;
  outstandingQty?: number;
  outstandingBagQty?: number;
  recomendationBinRack?: string;
  remarkCheck?: string;
  remarkDoubleCheck?: string;
  doubleCheckedBy?: string;
  doubleCheckedOn?: string | null;
}