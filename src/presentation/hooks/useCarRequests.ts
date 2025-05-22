"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import type { CarRequestFilters } from "@/domain/entities/CarRequestFilters";

const API_BASE_URL = "https://6820b96e259dad2655ad68e1.mockapi.io/api/v1";

interface CarRequest {
  id: string;
  carModel: string;
  productionYear: number;
  price: number;
  type: string;
  requesterName: string;
  location: string;
  image: string;
}

interface CarRequestsResponse {
  carRequests: CarRequest[];
  hasMore: boolean;
}

interface UseCarRequestsOptions {
  search?: string;
  filters?: CarRequestFilters;
}

export const useCarRequests = ({
  search,
  filters,
}: UseCarRequestsOptions = {}) => {
  return useInfiniteQuery({
    queryKey: ["carRequests", search, filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: "10",
        ...(search && { search }),
        ...(filters?.price && { price: filters.price.toString() }),
        ...(filters?.productionYear && {
          productionYear: filters.productionYear.toString(),
        }),
        ...(filters?.type && { type: filters.type }),
      });

      const response = await axios.get<CarRequest[]>(
        `${API_BASE_URL}/car-requests?${params.toString()}`
      );

      return {
        carRequests: response.data,
        hasMore: response.data.length === 10,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
