import { BaseTypes } from "../baseTypes";

export type User = BaseTypes & {
  nik?: string;
  username?: string;
  fullname?: string;
  roleId?: string;
  accessApp?: string;
  roleName?: string;
  photo?: string;
  bagian?: string;
  inforId?: string;
}