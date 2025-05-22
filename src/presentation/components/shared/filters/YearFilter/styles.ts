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
  yearContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  yearInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  yearLabel: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  selectedYear: {
    fontSize: 14,
    marginTop: 8,
  },
});
