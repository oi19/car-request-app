import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "@elements/Text";
import Slider from "@react-native-community/slider";
import { styles } from "./styles";
import { colors } from "@/presentation/theme";

interface PriceFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const STEP = 1000;

export const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  onChange,
}) => {
  const [price, setPrice] = useState(value ?? MIN_PRICE);

  useEffect(() => {
    setPrice(value ?? MIN_PRICE);
  }, [value]);

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
    onChange(newPrice);
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
      <Text variant="h3" style={styles.title}>
        Price
      </Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={MIN_PRICE}
          maximumValue={MAX_PRICE}
          step={STEP}
          value={price}
          onValueChange={handlePriceChange}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />
        <Text style={styles.value}>{formatPrice(price)}</Text>
      </View>
    </View>
  );
};
