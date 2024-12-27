import { BaseTypes } from "@/services/baseTypes";

export type OtherInboundHeader = BaseTypes & {
  code?: string;
  businessPartner?: string;
  bpOrder?: string;
  remarks?: string;
  transactionStatus?: string;
  confirmedBy?: string;
  confirmedOn?: string | null;
  approvedBy?: string;
  approvedOn?: string | null;
};