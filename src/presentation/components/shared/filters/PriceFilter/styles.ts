import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  chevronContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  chevron: {
    transform: [{ rotate: "0deg" }] as any,
  },
  chevronRotated: {
    transform: [{ rotate: "180deg" }] as any,
  },
  content: {
    marginTop: 8,
  },
  rangeContainer: {
    marginBottom: 16,
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rangeLabel: {
    fontSize: 14,
  },
  sliderContainer: {
    height: 40,
    justifyContent: "center",
  },
  selectedRange: {
    fontSize: 14,
    marginTop: 8,
  },
});
