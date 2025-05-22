import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import {
  Search,
  Car,
  Truck,
  CarFront,
  CarTaxiFront,
  X,
} from "lucide-react-native";
import { styles } from "./styles";

interface TypeFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

// Car types with icons and categories
const CAR_TYPES = [
  { label: "SUV", value: "SUV", icon: Car, category: "Popular" },
  { label: "Sedan", value: "Sedan", icon: CarTaxiFront, category: "Popular" },
  {
    label: "Hatchback",
    value: "Hatchback",
    icon: CarFront,
    category: "Popular",
  },
  { label: "Truck", value: "Truck", icon: Truck, category: "Commercial" },
  { label: "Coupe", value: "Coupe", icon: Car, category: "Sports" },
  { label: "Convertible", value: "Convertible", icon: Car, category: "Sports" },
  { label: "Van", value: "Van", icon: Truck, category: "Commercial" },
  { label: "Wagon", value: "Wagon", icon: Car, category: "Family" },
  { label: "Sports Car", value: "Sports Car", icon: Car, category: "Sports" },
  { label: "Electric", value: "Electric", icon: Car, category: "Eco" },
  { label: "Hybrid", value: "Hybrid", icon: Car, category: "Eco" },
  { label: "Luxury", value: "Luxury", icon: Car, category: "Premium" },
];

// Group car types by category
const groupedCarTypes = CAR_TYPES.reduce(
  (acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push(type);
    return acc;
  },
  {} as Record<string, typeof CAR_TYPES>
);

export const TypeFilter: React.FC<TypeFilterProps> = ({ value, onChange }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredTypes = useCallback(() => {
    return CAR_TYPES.filter((type) => {
      const matchesSearch = type.label
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(type.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(CAR_TYPES.map((type) => type.category))
    );
    return uniqueCategories;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Car Type
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              {
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search car type..."
            placeholderTextColor={theme.colors.placeholder}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryPill,
                {
                  backgroundColor: selectedCategories.includes(category)
                    ? theme.colors.primary
                    : theme.colors.background,
                },
              ]}
              onPress={() => toggleCategory(category)}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  {
                    color: selectedCategories.includes(category)
                      ? theme.colors.background
                      : theme.colors.text,
                  },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.gridContainer}>
          {filteredTypes().map((type) => (
            <View key={type.value} style={styles.typeItem}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  value === type.value && styles.typeButtonSelected,
                  {
                    borderColor:
                      value === type.value
                        ? theme.colors.primary
                        : theme.colors.border,
                    backgroundColor:
                      value === type.value
                        ? theme.colors.card
                        : theme.colors.background,
                  },
                ]}
                onPress={() => onChange(type.value)}
              >
                {type.icon && (
                  <View style={styles.typeIcon}>
                    {React.createElement(type.icon, {
                      size: 24,
                      color:
                        value === type.value
                          ? theme.colors.primary
                          : theme.colors.text,
                    })}
                  </View>
                )}
                <Text
                  style={[
                    styles.typeLabel,
                    {
                      color:
                        value === type.value
                          ? theme.colors.primary
                          : theme.colors.text,
                    },
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {value && (
          <Text
            style={[styles.selectedType, { color: theme.colors.secondary }]}
          >
            {CAR_TYPES.find((type) => type.value === value)?.label}
          </Text>
        )}
      </View>
    </View>
  );
};
