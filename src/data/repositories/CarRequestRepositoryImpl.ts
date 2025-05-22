import AsyncStorage from "@react-native-async-storage/async-storage"
import type { CarRequest, CarRequestFilters, PaginationParams } from "../../domain/entities/CarRequest"
import type { CarRequestRepository } from "../../domain/repositories/CarRequestRepository"
import type { CarRequestDataSource } from "../datasources/CarRequestApiDataSource"

export class CarRequestRepositoryImpl implements CarRequestRepository {
  constructor(private dataSource: CarRequestDataSource) {}

  async getCarRequests(pagination: PaginationParams, filters: CarRequestFilters): Promise<CarRequest[]> {
    const cacheKey = this.generateCacheKey(pagination, filters)

    try {
      // Try to get data from cache first
      const cachedData = await AsyncStorage.getItem(cacheKey)

      if (cachedData) {
        return JSON.parse(cachedData) as CarRequest[]
      }

      // If not in cache, fetch from API
      const carRequests = await this.dataSource.fetchCarRequests(pagination, filters)

      // Cache the response
      await AsyncStorage.setItem(cacheKey, JSON.stringify(carRequests))

      return carRequests
    } catch (error) {
      console.error("Repository error:", error)
      throw error
    }
  }

  async clearCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const carRequestKeys = keys.filter((key) => key.startsWith("car_requests_"))

      if (carRequestKeys.length > 0) {
        await AsyncStorage.multiRemove(carRequestKeys)
      }
    } catch (error) {
      console.error("Error clearing cache:", error)
    }
  }

  private generateCacheKey(pagination: PaginationParams, filters: CarRequestFilters): string {
    const filterString = JSON.stringify(filters)
    return `car_requests_page${pagination.page}_limit${pagination.limit}_${filterString}`
  }
}
