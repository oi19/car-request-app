import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  CarRequest,
  CarRequestFilters,
  PaginationParams,
} from "../../domain/entities/CarRequest";

// In-memory cache using Map for faster access
const memoryCache = new Map<string, CarRequest[]>();

// Cache prefix for AsyncStorage keys
const CACHE_PREFIX = "car_requests_cache_";

// Generate a unique cache key based on filters and pagination
export const generateCacheKey = (
  pagination: PaginationParams,
  filters: CarRequestFilters
): string => {
  // Create a normalized representation of filters by sorting keys
  const filterKeys = Object.keys(filters).sort();
  const normalizedFilters: Record<string, any> = {};

  // Only include defined filter values
  filterKeys.forEach((key) => {
    const value = filters[key as keyof CarRequestFilters];
    if (value !== undefined) {
      normalizedFilters[key] = value;
    }
  });

  // Combine pagination and filters into a single string key
  const filterString = JSON.stringify(normalizedFilters);
  return `${CACHE_PREFIX}page${pagination.page}_limit${pagination.limit}_${filterString}`;
};

// Store data in both memory cache and AsyncStorage
export const setCache = async (
  key: string,
  data: CarRequest[]
): Promise<void> => {
  try {
    // Update in-memory cache immediately
    memoryCache.set(key, data);

    // Persist to AsyncStorage
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

// Retrieve data from cache, prioritizing memory cache for performance
export const getCache = async (key: string): Promise<CarRequest[] | null> => {
  try {
    // Try memory cache first (faster)
    if (memoryCache.has(key)) {
      return memoryCache.get(key) || null;
    }

    // Fall back to AsyncStorage
    const cachedData = await AsyncStorage.getItem(key);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData) as CarRequest[];
      // Update memory cache for future fast access
      memoryCache.set(key, parsedData);
      return parsedData;
    }

    return null;
  } catch (error) {
    console.error("Error getting cache:", error);
    return null;
  }
};

// Clear all cached data
export const clearCache = async (): Promise<void> => {
  try {
    // Clear memory cache
    memoryCache.clear();

    // Clear AsyncStorage cache
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
    }
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};

// Filter cached data based on provided filters
export const filterCachedData = (
  data: CarRequest[],
  filters: CarRequestFilters
): CarRequest[] => {
  // Create a filter map for O(1) lookups
  const filterMap = new Map<string, any>();

  // Only add defined filters to the map
  if (filters.price !== undefined) filterMap.set("price", filters.price);
  if (filters.productionYear !== undefined)
    filterMap.set("productionYear", filters.productionYear);
  if (filters.type !== undefined) filterMap.set("type", filters.type);

  // If no filters, return all data
  if (filterMap.size === 0) return data;

  // Apply filters using the hashmap for efficient lookups
  return data.filter((item) => {
    // Check each filter condition
    for (const [key, value] of filterMap.entries()) {
      const itemValue = item[key as keyof CarRequest];

      // Skip undefined values
      if (itemValue === undefined) continue;

      // For string values, use case-insensitive comparison
      if (typeof itemValue === "string" && typeof value === "string") {
        if (!itemValue.toLowerCase().includes(value.toLowerCase())) {
          return false;
        }
      }
      // For numeric values, use exact match
      else if (itemValue !== value) {
        return false;
      }
    }

    return true;
  });
};

// Get all cached data for a specific page size
export const getAllCachedDataForLimit = async (
  limit: number
): Promise<CarRequest[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(
      (key) => key.startsWith(CACHE_PREFIX) && key.includes(`_limit${limit}_`)
    );

    if (cacheKeys.length === 0) return [];

    // Create a hashmap to deduplicate car requests by ID
    const uniqueItemsMap = new Map<string, CarRequest>();

    // Get all cached data and merge
    const cachedDataArray = await AsyncStorage.multiGet(cacheKeys);

    for (const [_, value] of cachedDataArray) {
      if (!value) continue;

      const items = JSON.parse(value) as CarRequest[];

      // Use hashmap to ensure uniqueness by ID
      items.forEach((item) => {
        uniqueItemsMap.set(item.id, item);
      });
    }

    // Convert map values back to array
    return Array.from(uniqueItemsMap.values());
  } catch (error) {
    console.error("Error getting all cached data:", error);
    return [];
  }
};
