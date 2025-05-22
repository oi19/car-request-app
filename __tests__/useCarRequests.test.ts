import { renderHook, waitFor } from "@testing-library/react-hooks"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useCarRequests } from "../src/presentation/hooks/useCarRequests"
import { carRequestsApi } from "../src/data/api/carRequestsApi"
import * as cacheService from "../src/data/cache/cacheService"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock the API and cache service
jest.mock("../src/data/api/carRequestsApi", () => ({
  carRequestsApi: {
    getCarRequests: jest.fn(),
  },
}))

jest.mock("../src/data/cache/cacheService", () => ({
  generateCacheKey: jest.fn(),
  getCache: jest.fn(),
  setCache: jest.fn(),
  clearCache: jest.fn(),
}))

// Mock data
const mockCarRequests = [
  {
    id: "1",
    carModel: "Toyota RAV4",
    productionYear: 2020,
    price: 32000,
    type: "SUV",
    requesterName: "Ahmed Samir",
    location: "Cairo",
    image: "https://example.com/image.png",
  },
]

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe("useCarRequests", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock API response
    ;(carRequestsApi.getCarRequests as jest.Mock).mockResolvedValue({
      data: mockCarRequests,
      nextPage: 2,
    })
    // Mock cache miss
    ;(cacheService.getCache as jest.Mock).mockResolvedValue(null)
  })

  it("should initialize with default values", async () => {
    const { result } = renderHook(() => useCarRequests(), {
      wrapper: createWrapper(),
    })

    expect(result.current.carRequests).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(false)
    expect(result.current.filters).toEqual({
      price: undefined,
      productionYear: undefined,
      type: undefined,
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it("should update filters correctly", async () => {
    const { result } = renderHook(() => useCarRequests(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    // Update filters
    result.current.updateFilters({ price: 25000, type: "SUV" })

    expect(result.current.filters).toEqual({
      price: 25000,
      productionYear: undefined,
      type: "SUV",
    })
  })

  it("should reset filters correctly", async () => {
    const { result } = renderHook(() => useCarRequests(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    // First set some filters
    result.current.updateFilters({ price: 25000, type: "SUV" })

    // Then reset them
    result.current.resetFilters()

    expect(result.current.filters).toEqual({
      price: undefined,
      productionYear: undefined,
      type: undefined,
    })
  })

  it("should fetch car requests successfully", async () => {
    const { result } = renderHook(() => useCarRequests(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.carRequests.length).toBe(1)
    expect(result.current.carRequests[0].carModel).toBe("Toyota RAV4")
    expect(carRequestsApi.getCarRequests).toHaveBeenCalled()
  })

  it("should use cached data when available", async () => {
    // Mock cache hit
    ;(cacheService.getCache as jest.Mock).mockResolvedValue(mockCarRequests)

    const { result } = renderHook(() => useCarRequests(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.carRequests.length).toBe(1)
    expect(cacheService.getCache).toHaveBeenCalled()
    // API should not be called when cache hit
    expect(carRequestsApi.getCarRequests).not.toHaveBeenCalled()
  })
})
