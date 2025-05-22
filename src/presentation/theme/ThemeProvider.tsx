"use client";

import React, { createContext, useContext } from "react";
import type { StyleSheet } from "react-native";

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    error: string;
    success: string;
    placeholder: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
  };
}

const defaultTheme: Theme = {
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#f8f9fa",
    card: "#ffffff",
    text: "#2c3e50",
    border: "#e9ecef",
    error: "#e74c3c",
    success: "#27ae60",
    placeholder: "#adb5bd",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 24,
  },
  typography: {
    fontFamily: "System",
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
  },
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

// Helper function to create themed styles
export const createThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleCreator: (theme: Theme) => T
): T => {
  return styleCreator(defaultTheme);
};
