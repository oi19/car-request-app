import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
} from "react-native";
import { BottomSheet } from "@/presentation/components/shared/BottomSheet/BottomSheet";
import { colors, spacing, typography } from "@/presentation/theme";
import { FilterSection } from "./filters/FilterSection";
import { PriceFilter } from "./filters/PriceFilter";
import { YearFilter } from "./filters/YearFilter";
import { TypeFilter } from "./filters/TypeFilter";
import type { FilterState } from "./filters/types";
import { defaultFilters } from "./filters/types";
import { X, RotateCcw } from "lucide-react-native";

interface FilterBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
  filters: FilterState;
  onFilterChange: {
    setPrice: (price: number | null) => void;
    setYear: (year: number | null) => void;
    setType: (type: string | null) => void;
  };
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  isVisible,
  onClose,
  onApply,
  onReset,
  filters,
  onFilterChange,
}) => {
  const hasActiveFilters =
    filters.price !== null || filters.year !== null || filters.type !== null;

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      snapPoints={["85%"]}
      enablePanDownToClose
    >
      <View style={styles.container}>
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          {hasActiveFilters && (
            <TouchableOpacity
              onPress={onReset}
              style={styles.resetButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <RotateCcw size={16} color={colors.primary} />
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <FilterSection
            title="Price"
            subtitle="Set your budget"
            isActive={filters.price !== null}
          >
            <PriceFilter
              value={filters.price}
              onChange={onFilterChange.setPrice}
            />
          </FilterSection>

          <FilterSection
            title="Production Year"
            subtitle="Select year"
            isActive={filters.year !== null}
          >
            <YearFilter
              value={filters.year}
              onChange={onFilterChange.setYear}
            />
          </FilterSection>

          <FilterSection
            title="Car Type"
            subtitle="Choose vehicle type"
            isActive={filters.type !== null}
          >
            <TypeFilter
              value={filters.type}
              onChange={onFilterChange.setType}
            />
          </FilterSection>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.applyButton,
              !hasActiveFilters && styles.applyButtonDisabled,
            ]}
            onPress={() => onApply(filters)}
            disabled={!hasActiveFilters}
          >
            <Text
              style={[
                styles.applyButtonText,
                !hasActiveFilters && styles.applyButtonTextDisabled,
              ]}
            >
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === "ios" ? spacing.xl : spacing.lg,
    maxHeight: "90%",
  },
  handleContainer: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xl * 2,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.md,
  },
  resetButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.xs,
    backgroundColor: colors.card,
  },
  resetText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.secondary,
  },
  applyButton: {
    flex: 1,
    marginLeft: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.xs,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  applyButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  applyButtonTextDisabled: {
    color: colors.text.secondary,
  },
});
