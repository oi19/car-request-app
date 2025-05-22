import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Filter } from "lucide-react-native";
import { colors, spacing } from "@/presentation/theme";

interface FilterButtonProps {
  onPress: () => void;
  isActive?: boolean;
}

export const FilterButton = ({
  onPress,
  isActive = false,
}: FilterButtonProps) => {
  const handlePress = () => {
    // Ensure the press event is handled
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, isActive && styles.buttonActive]}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Filter
        size={20}
        color={isActive ? colors.background : colors.text.secondary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: spacing.sm,
    minWidth: 44, // Ensure minimum touch target size
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
