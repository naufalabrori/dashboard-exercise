import { BaseTypes } from "../baseTypes";

export type OtherOutboundHeader = BaseTypes & {
  code?: string;
  bussinessPartner?: string;
  bpOrder?: string;
  remarks?: string;
  transactionStatus?: string;
  confirmedBy?: string;
  confirmedOn?: string;
  approvedBy?: string;
  approvedOn?: string;
}