import { BaseTypes } from "../baseTypes";

export type InboundHeader = BaseTypes & {
  poNumber?: string;
  poDate?: string;
  businessPartner?: string;
  bpOrder?: string;
  planDateDelivery?: string;
  remarks?: string;
  transactionStatus?: string;
}