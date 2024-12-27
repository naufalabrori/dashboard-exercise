export interface PaginationParams {
  orderBy?: string;
  isDesc?: boolean;
  limit?: number;
  offset?: number;
}

export interface TableData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface ApiResponse {
  data: TableData[];
  total: number;
}
