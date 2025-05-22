import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors, spacing, typography } from "@/presentation/theme";
import type { CarRequestFilters } from "@/domain/entities/CarRequestFilters";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";

interface FilterSheetProps {
  filters: CarRequestFilters;
  onApply: (filters: CarRequestFilters) => void;
  onReset: () => void;
}

export interface FilterSheetRef {
  expand: () => void;
  close: () => void;
}

const CAR_TYPES = ["SUV", "Sedan", "Hatchback", "Coupe", "Wagon"];

export const FilterSheet = forwardRef<FilterSheetRef, FilterSheetProps>(
  ({ filters, onApply, onReset }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [localFilters, setLocalFilters] =
      React.useState<CarRequestFilters>(filters);

    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.expand(),
      close: () => bottomSheetRef.current?.close(),
    }));

    const handleApply = () => {
      onApply(localFilters);
    };

    const handleReset = () => {
      setLocalFilters({});
      onReset();
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["75%"]}
        enablePanDownToClose
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Filters</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Price Range</Text>
            <Slider
              style={styles.slider}
              minimumValue={10000}
              maximumValue={40000}
              step={1000}
              value={localFilters.price || 20000}
              onValueChange={(value: number) =>
                setLocalFilters((prev) => ({ ...prev, price: value }))
              }
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.border}
            />
            <Text style={styles.value}>
              ${localFilters.price?.toLocaleString() || "20,000"}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Production Year</Text>
            <Slider
              style={styles.slider}
              minimumValue={2015}
              maximumValue={2023}
              step={1}
              value={localFilters.productionYear || 2020}
              onValueChange={(value: number) =>
                setLocalFilters((prev) => ({ ...prev, productionYear: value }))
              }
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.border}
            />
            <Text style={styles.value}>
              {localFilters.productionYear || "2020"}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Car Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={localFilters.type}
                onValueChange={(value: string) =>
                  setLocalFilters((prev) => ({ ...prev, type: value }))
                }
                style={styles.picker}
              >
                <Picker.Item label="All Types" value="" />
                {CAR_TYPES.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.buttons}>
            <Pressable style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
  },
  handleIndicator: {
    backgroundColor: colors.border,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  label: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  value: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  resetButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  resetButtonText: {
    ...typography.body1,
    color: colors.text.primary,
  },
  applyButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  applyButtonText: {
    ...typography.body1,
    color: colors.background,
    fontWeight: "600" as const,
  },
});
