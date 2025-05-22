import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    padding: 0,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#F7F9FC",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedTypeButton: {
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOpacity: 0.2,
  },
  typeText: {
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  selectedTypeText: {
    color: "#fff",
    fontWeight: "600",
  },
  icon: {
    marginRight: 8,
  },
});
