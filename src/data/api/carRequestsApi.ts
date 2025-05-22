import type { AxiosInstance } from "axios"
import type {
  CarRequest,
  CarRequestFilters,
  PaginationParams,
  PaginatedResponse,
} from "../../domain/entities/CarRequest"

// API functions for car requests
export const carRequestsApi = {
  // Get car requests with pagination and filters
  getCarRequests: async (
    api: AxiosInstance,
    pagination: PaginationParams,
    filters: CarRequestFilters,
  ): Promise<PaginatedResponse<CarRequest>> => {
    try {
      // Build query parameters
      const params: Record<string, string> = {
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      }

      // Add filter params if they exist
      if (filters.price) {
        params.price = filters.price.toString()
      }

      if (filters.productionYear) {
        params.productionYear = filters.productionYear.toString()
      }

      if (filters.type) {
        params.type = filters.type
      }

      // Make the API request using axios
      const response = await api.get<CarRequest[]>("/api/v1/car-requests", { params })

      return {
        data: response.data,
        nextPage: response.data.length === pagination.limit ? pagination.page + 1 : undefined,
      }
    } catch (error) {
      console.error("Error fetching car requests:", error)
      throw error
    }
  },
}
