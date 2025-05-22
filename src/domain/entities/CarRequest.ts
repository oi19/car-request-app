export type CarRequestStatus = "pending" | "approved" | "rejected";

export interface CarRequest {
  id: string;
  title: string;
  price: string;
  brand: string;
  type: string;
  productionYear: number;
  location: string;
  status: CarRequestStatus;
  image: string;
  createdAt: string;
}

export interface CarRequestFilters {
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  type?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextPage?: number;
}
