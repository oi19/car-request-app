export interface CarRequestFilters {
  price?: number;
  productionYear?: number;
  type?: string;
  location?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
