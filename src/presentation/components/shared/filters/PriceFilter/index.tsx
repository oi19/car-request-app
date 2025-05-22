import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { useTheme } from "@theme/ThemeProvider";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { styles } from "./styles";

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const STEP = 1000;

interface PriceFilterProps {
  value: { min: number; max: number } | null;
  onChange: (value: { min: number; max: number } | null) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  onChange,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState(
    value?.min?.toString() || ""
  );
  const [localMaxPrice, setLocalMaxPrice] = useState(
    value?.max?.toString() || ""
  );

  useEffect(() => {
    if (value === null) {
      setLocalMinPrice("");
      setLocalMaxPrice("");
    } else {
      setLocalMinPrice(value.min.toString());
      setLocalMaxPrice(value.max.toString());
    }
  }, [value]);

  const handlePriceChange = (values: number[]) => {
    const [min, max] = values;
    setLocalMinPrice(min.toString());
    setLocalMaxPrice(max.toString());
    onChange({ min, max });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Price Range
        </Text>
        <View style={styles.chevronContainer}>
          <ChevronDown
            size={20}
            color={theme.colors.text}
            style={isExpanded ? styles.chevronRotated : styles.chevron}
          />
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.rangeContainer}>
            <View style={styles.rangeLabels}>
              <Text style={[styles.rangeLabel, { color: theme.colors.text }]}>
                {formatPrice(MIN_PRICE)}
              </Text>
              <Text style={[styles.rangeLabel, { color: theme.colors.text }]}>
                {formatPrice(MAX_PRICE)}
              </Text>
            </View>
            <View style={styles.sliderContainer}>
              <MultiSlider
                values={[value?.min || MIN_PRICE, value?.max || MAX_PRICE]}
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={STEP}
                sliderLength={280}
                onValuesChange={handlePriceChange}
                selectedStyle={{
                  backgroundColor: theme.colors.primary,
                }}
                unselectedStyle={{
                  backgroundColor: theme.colors.border,
                }}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: theme.colors.border,
                }}
                markerStyle={{
                  height: 24,
                  width: 24,
                  backgroundColor: theme.colors.primary,
                }}
                pressedMarkerStyle={{
                  height: 28,
                  width: 28,
                }}
              />
            </View>
          </View>

          {value && (
            <Text
              style={[styles.selectedRange, { color: theme.colors.secondary }]}
            >
              {formatPrice(value.min)} - {formatPrice(value.max)}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
