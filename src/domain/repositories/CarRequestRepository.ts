import type { CarRequest, CarRequestFilters, PaginationParams } from "../entities/CarRequest"

export interface CarRequestRepository {
  getCarRequests(pagination: PaginationParams, filters: CarRequestFilters): Promise<CarRequest[]>

  clearCache(): void
}
