import axios from "axios"
import type { CarRequest, CarRequestFilters, PaginationParams } from "../../domain/entities/CarRequest"

export interface CarRequestDataSource {
  fetchCarRequests(pagination: PaginationParams, filters: CarRequestFilters): Promise<CarRequest[]>
}

export class CarRequestApiDataSource implements CarRequestDataSource {
  private baseUrl = "https://6820b96e259dad2655ad68e1.mockapi.io"
  private axiosInstance = axios.create({
    baseURL: this.baseUrl,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  async fetchCarRequests(pagination: PaginationParams, filters: CarRequestFilters): Promise<CarRequest[]> {
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
      const response = await this.axiosInstance.get<CarRequest[]>("/api/v1/car-requests", { params })
      return response.data
    } catch (error) {
      console.error("Error fetching car requests:", error)
      throw error
    }
  }
}
