import { BaseTypes } from "../baseTypes";

export type Supplier = BaseTypes & {
  bpId?: string;
  bpDescription?: string;
  searchKey?: string;
  bpType?: string;
  bpTypeName?: string;
  addressCode?: string;
  address?: string;
  telephone?: string;
  country?: string;
  countryName?: string;
  provinceCode?: string;
  provinceName?: string;
  cityCode?: string;
  cityName?: string;
}