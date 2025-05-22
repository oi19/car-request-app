import { StyleSheet } from "react-native";
import { colors, spacing } from "@/presentation/theme";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  title: {
    marginBottom: spacing.sm,
  },
  sliderContainer: {
    marginBottom: spacing.sm,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  value: {
    textAlign: "center",
    marginTop: spacing.xs,
    color: colors.primary,
    fontWeight: "600",
  },
});
