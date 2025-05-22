export interface Colors {
  primary: string;
  background: string;
  card: string;
  text: {
    primary: string;
    secondary: string;
  };
  border: string;
  shadow: string;
  disabled: string;
  white: string;
  warning: string;
  success: string;
  error: string;
}

export const colors: Colors = {
  primary: "#007AFF",
  background: "#FFFFFF",
  card: "#F8F8F8",
  text: {
    primary: "#000000",
    secondary: "#666666",
  },
  border: "#E5E5E5",
  shadow: "#000000",
  disabled: "#CCCCCC",
  white: "#FFFFFF",
  warning: "#FF9500",
  success: "#34C759",
  error: "#FF3B30",
};
