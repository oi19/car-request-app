export interface FilterState {
  price: number | null;
  year: number | null;
  type: string | null;
}

export interface FilterActions {
  setPrice: (price: number | null) => void;
  setYear: (year: number | null) => void;
  setType: (type: string | null) => void;
  resetFilters: () => void;
}

export const defaultFilters: FilterState = {
  price: null,
  year: null,
  type: null,
};
