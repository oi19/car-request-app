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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#F7F9FC",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingLeft: 32,
    fontSize: 16,
    color: "#1A1A1A",
  },
  inputFocused: {
    backgroundColor: "#fff",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  separator: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  currency: {
    position: "absolute",
    left: 16,
    top: 14,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  label: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 8,
    fontWeight: "500",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});
