export type OtherInboundHeader = {
  id: string;
  code: string;
  businessPartner: string;
  bpOrder: string;
  remarks: string;
  transactionStatus: "Open" | "Approved" | "Confirmed";
  createdBy: string;
  createdByName: string;
  createdDate: string;
};