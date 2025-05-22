import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import { useFilterStore } from "@store/filterStore";
import { YearFilter } from "./filters/YearFilter";
import { PriceFilter } from "./filters/PriceFilter";
import { TypeFilter } from "./filters/TypeFilter";
import { styles } from "./FilterBottomSheet.styles";
import { FilterState, defaultFilters } from "./filters/types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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
  filters = defaultFilters,
  onFilterChange = {
    setPrice: () => {},
    setYear: () => {},
    setType: () => {},
  },
}) => {
  const theme = useTheme();
  const [slideAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [isClosing, setIsClosing] = useState(false);
  const closingRef = React.useRef(false);

  // Update local filters when props change
  useEffect(() => {
    if (!closingRef.current) {
      setLocalFilters(filters);
    }
  }, [filters]);

  useEffect(() => {
    if (isVisible && !closingRef.current) {
      setIsClosing(false);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, slideAnim, fadeAnim]);

  const handleClose = (callback?: () => void) => {
    if (closingRef.current) return;

    closingRef.current = true;
    setIsClosing(true);
    Keyboard.dismiss();

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setTimeout(() => {
          closingRef.current = false;
          setIsClosing(false);
          onClose();
          // Execute callback after modal is fully closed
          callback?.();
        }, 100);
      }
    });
  };

  const handleApply = () => {
    // Close first, then update store after animation completes
    handleClose(() => {
      // Delay store update to ensure modal is fully closed
      setTimeout(() => {
        onApply(localFilters);
      }, 50);
    });
  };

  const handleReset = () => {
    Keyboard.dismiss();
    setLocalFilters(defaultFilters);
    onReset();
  };

  const handleBackdropPress = () => {
    handleClose();
  };

  const handlePriceChange = (price: number | null) => {
    setLocalFilters((prev) => ({ ...prev, price }));
    onFilterChange?.setPrice?.(price);
  };

  const handleYearChange = (year: number | null) => {
    setLocalFilters((prev) => ({ ...prev, year }));
    onFilterChange?.setYear?.(year);
  };

  const handleTypeChange = (type: string | null) => {
    setLocalFilters((prev) => ({ ...prev, type }));
    onFilterChange?.setType?.(type);
  };

  if (!isVisible && !isClosing) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [SCREEN_HEIGHT, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={[styles.header, { borderBottomColor: theme.colors.border }]}
          >
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Filters
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text
                style={[styles.closeButtonText, { color: theme.colors.text }]}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          >
            <View style={styles.mainContent}>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.content}>
                  <PriceFilter
                    value={localFilters.price}
                    onChange={handlePriceChange}
                  />

                  <YearFilter
                    value={localFilters.year}
                    onChange={handleYearChange}
                  />

                  <TypeFilter
                    value={localFilters.type}
                    onChange={handleTypeChange}
                  />
                </View>
              </ScrollView>

              <View
                style={[styles.footer, { borderTopColor: theme.colors.border }]}
              >
                <TouchableOpacity
                  style={[styles.button, styles.resetButton]}
                  onPress={handleReset}
                >
                  <Text
                    style={[styles.buttonText, { color: theme.colors.text }]}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.applyButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  onPress={handleApply}
                >
                  <Text
                    style={[styles.buttonText, { color: theme.colors.card }]}
                  >
                    Apply Filters
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};
