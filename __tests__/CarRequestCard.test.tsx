import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CarRequestCard from "../src/presentation/components/shared/CarRequestCard/CarRequestCard";
import { ThemeProvider } from "../src/presentation/theme/ThemeProvider";
import { jest } from "@jest/globals";

// Mock data
const mockCarRequest = {
  id: "1",
  carModel: "Toyota Camry",
  productionYear: 2020,
  price: 25000,
  type: "Sedan",
  requesterName: "John Doe",
  location: "New York",
  image: "https://example.com/car.jpg",
};

const mockOnPress = jest.fn();

describe("CarRequestCard", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ThemeProvider>
        <CarRequestCard carRequest={mockCarRequest} onPress={mockOnPress} />
      </ThemeProvider>
    );

    expect(getByText("Toyota Camry")).toBeTruthy();
    expect(getByText("2020")).toBeTruthy();
    expect(getByText("$25,000")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarRequestCard carRequest={mockCarRequest} onPress={mockOnPress} />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId("car-request-card"));
    expect(mockOnPress).toHaveBeenCalledWith(mockCarRequest);
  });
});
