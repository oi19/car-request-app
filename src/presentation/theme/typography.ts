import { TextStyle } from "react-native";

export interface Typography {
  h1: {
    fontSize: number;
    fontWeight: string;
  };
  h2: {
    fontSize: number;
    fontWeight: string;
  };
  h3: {
    fontSize: number;
    fontWeight: string;
  };
  body1: {
    fontSize: number;
    fontWeight: string;
  };
  body2: {
    fontSize: number;
    fontWeight: string;
  };
  button: {
    fontSize: number;
    fontWeight: string;
  };
}

export const typography: Typography = {
  h1: {
    fontSize: 32,
    fontWeight: "700",
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
  },
  body1: {
    fontSize: 16,
    fontWeight: "400",
  },
  body2: {
    fontSize: 14,
    fontWeight: "400",
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
  },
};
