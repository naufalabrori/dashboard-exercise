import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const AUTH_COOKIES_KEY = 'app-auth-token';

export const APP_DEFAULT_TABLE_SIZE = "5"

export const NumberOfShowTable = [
  {
    label: "5",
    value: "5"
  },
  {
    label: "10",
    value: "10"
  },
  {
    label: "25",
    value: "25"
  }
]

export const minValue = (val: number, min: number) => {
  if (val < min) return min;
  return val;
};

export const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
