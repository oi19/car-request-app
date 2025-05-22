import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "@elements/Text";
import Slider from "@react-native-community/slider";
import { styles } from "./styles";
import { colors } from "@/presentation/theme";

interface YearFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1900;

export const YearFilter: React.FC<YearFilterProps> = ({ value, onChange }) => {
  const [year, setYear] = useState(value ?? CURRENT_YEAR);

  useEffect(() => {
    setYear(value ?? CURRENT_YEAR);
  }, [value]);

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    onChange(newYear);
  };

  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.title}>
        Production Year
      </Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={MIN_YEAR}
          maximumValue={CURRENT_YEAR}
          step={1}
          value={year}
          onValueChange={handleYearChange}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />
        <Text style={styles.value}>{year}</Text>
      </View>
    </View>
  );
};
