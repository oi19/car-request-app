import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@elements/Text";
import { styles } from "./styles";

const CAR_TYPES = ["Sedan", "SUV", "Truck", "Van", "Sports Car"];

interface TypeFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const TypeFilter: React.FC<TypeFilterProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.title}>
        Car Type
      </Text>
      <View style={styles.typesContainer}>
        {CAR_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              value === type && styles.selectedTypeButton,
            ]}
            onPress={() => onChange(value === type ? null : type)}
          >
            <Text
              variant="body"
              style={[
                styles.typeText,
                value === type && styles.selectedTypeText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
