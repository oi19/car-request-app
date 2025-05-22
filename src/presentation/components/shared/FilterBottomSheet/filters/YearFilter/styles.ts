import { StyleSheet } from "react-native";
import { colors, spacing } from "@/presentation/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    padding: 0,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
  },
  sliderContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
    marginTop: 8,
  },
});
