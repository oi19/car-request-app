"use client";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { FilterBottomSheet } from "../src/presentation/components/shared/FilterBottomSheet/FilterBottomSheet";
import { ThemeProvider } from "../src/presentation/theme/ThemeProvider";
import { jest } from "@jest/globals";

// Mock functions
const mockOnClose = jest.fn();
const mockOnApply = jest.fn();
const mockOnReset = jest.fn();
const mockOnFilterChange = {
  setPrice: jest.fn(),
  setYear: jest.fn(),
  setType: jest.fn(),
};

const mockFilters = {
  price: { min: 0, max: 1000000 },
  year: null,
  type: null,
};

describe("FilterBottomSheet", () => {
  it("renders correctly when visible", () => {
    const { getByText } = render(
      <ThemeProvider>
        <FilterBottomSheet
          isVisible={true}
          onClose={mockOnClose}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onFilterChange={mockOnFilterChange}
          filters={mockFilters}
        />
      </ThemeProvider>
    );

    expect(getByText("Filters")).toBeTruthy();
    expect(getByText("Apply")).toBeTruthy();
    expect(getByText("Reset")).toBeTruthy();
  });

  it("calls onClose when close button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <FilterBottomSheet
          isVisible={true}
          onClose={mockOnClose}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onFilterChange={mockOnFilterChange}
          filters={mockFilters}
        />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId("close-button"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onApply when apply button is pressed", () => {
    const { getByText } = render(
      <ThemeProvider>
        <FilterBottomSheet
          isVisible={true}
          onClose={mockOnClose}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onFilterChange={mockOnFilterChange}
          filters={mockFilters}
        />
      </ThemeProvider>
    );

    fireEvent.press(getByText("Apply"));
    expect(mockOnApply).toHaveBeenCalled();
  });

  it("calls onReset when reset button is pressed", () => {
    const { getByText } = render(
      <ThemeProvider>
        <FilterBottomSheet
          isVisible={true}
          onClose={mockOnClose}
          onApply={mockOnApply}
          onReset={mockOnReset}
          onFilterChange={mockOnFilterChange}
          filters={mockFilters}
        />
      </ThemeProvider>
    );

    fireEvent.press(getByText("Reset"));
    expect(mockOnReset).toHaveBeenCalled();
  });
});
