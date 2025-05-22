import type { CarRequest, CarRequestFilters, PaginationParams } from "../entities/CarRequest"
import type { CarRequestRepository } from "../repositories/CarRequestRepository"

// Create a function that returns the use case functions
export const createGetCarRequestsUseCase = (repository: CarRequestRepository) => {
  // Execute the use case
  const execute = (pagination: PaginationParams, filters: CarRequestFilters): Promise<CarRequest[]> => {
    return repository.getCarRequests(pagination, filters)
  }

  return {
    execute,
  }
}
