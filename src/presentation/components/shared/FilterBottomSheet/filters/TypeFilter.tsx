import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { colors, spacing } from "@/presentation/theme";
import { Check } from "lucide-react-native";

interface TypeFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const CAR_TYPES = [
  { id: "sedan", label: "Sedan" },
  { id: "suv", label: "SUV" },
  { id: "hatchback", label: "Hatchback" },
  { id: "coupe", label: "Coupe" },
  { id: "wagon", label: "Wagon" },
  { id: "convertible", label: "Convertible" },
  { id: "pickup", label: "Pickup" },
  { id: "van", label: "Van" },
];

export const TypeFilter: React.FC<TypeFilterProps> = ({ value, onChange }) => {
  const handleTypePress = (typeId: string) => {
    if (value === typeId) {
      onChange(null);
    } else {
      onChange(typeId);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.typesContainer}>
        {CAR_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeButton,
              value === type.id && styles.typeButtonSelected,
            ]}
            onPress={() => handleTypePress(type.id)}
          >
            <View style={styles.typeContent}>
              <Text style={styles.typeText}>{type.label}</Text>
              {value === type.id && (
                <View style={styles.checkmarkContainer}>
                  <Check size={6} color={colors.white} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {value && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedValue}>
            {CAR_TYPES.find((type) => type.id === value)?.label}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  typeButton: {
    width: "33.33%",
    padding: 4,
  },
  typeButtonSelected: {
    backgroundColor: colors.primary + "08",
  },
  typeContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.xs,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.primary,
  },
  checkmarkContainer: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    width: 6,
    height: 6,
    tintColor: colors.white,
  },
  selectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    padding: 4,
    backgroundColor: colors.primary + "08",
    borderRadius: spacing.xs,
  },
  selectedValue: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
    marginLeft: 4,
  },
});
