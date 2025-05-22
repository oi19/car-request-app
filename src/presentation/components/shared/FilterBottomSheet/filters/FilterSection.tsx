import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { colors, spacing } from "@/presentation/theme";

interface FilterSectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  subtitle,
  children,
  isActive = false,
}) => {
  return (
    <View style={[styles.container, isActive && styles.containerActive]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  containerActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "05",
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.text.secondary,
  },
  content: {
    marginTop: spacing.sm,
  },
});
