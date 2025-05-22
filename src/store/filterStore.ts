import { create } from "zustand";
import {
  FilterState,
  defaultFilters,
} from "../presentation/components/shared/FilterBottomSheet/filters/types";

interface FilterStore {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilters,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: defaultFilters }),
}));
