"use client";

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/presentation/theme";
import { Search } from "lucide-react-native";

interface EmptyStateProps {
  message?: string;
  onRefresh?: () => void;
}

export const EmptyState = ({
  message = "No car requests found",
  onRefresh,
}: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Search size={48} color={colors.text.secondary} style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
      {onRefresh && (
        <Text style={styles.hint}>
          Try adjusting your filters or search query
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  icon: {
    marginBottom: spacing.lg,
  },
  message: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  hint: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
