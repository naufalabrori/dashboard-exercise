import { BaseTypes } from "@/services/baseTypes";

export type OtherOutboundHeader = BaseTypes & {
  code?: string;
  bussinessPartner?: string;
  bpOrder?: string;
  remarks?: string;
  transactionStatus?: string;
  confirmedBy?: string;
  confirmedOn?: string | null;
  approvedBy?: string;
  approvedOn?: string | null;
}