import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { ChevronDown } from "lucide-react-native";
import { useTheme } from "@theme/ThemeProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./YearFilter.styles";

interface YearFilterProps {
  value: { min: number; max: number } | null;
  onChange: (value: { min: number; max: number } | null) => void;
}

export const YearFilter: React.FC<YearFilterProps> = ({ value, onChange }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMinPicker, setShowMinPicker] = useState(false);
  const [showMaxPicker, setShowMaxPicker] = useState(false);
  const [localMinYear, setLocalMinYear] = useState(
    value?.min?.toString() || ""
  );
  const [localMaxYear, setLocalMaxYear] = useState(
    value?.max?.toString() || ""
  );

  const handleYearChange = (
    event: any,
    selectedDate: Date | undefined,
    isMin: boolean
  ) => {
    if (Platform.OS === "android") {
      setShowMinPicker(false);
      setShowMaxPicker(false);
    }

    if (selectedDate) {
      const year = selectedDate.getFullYear();
      if (isMin) {
        setLocalMinYear(year.toString());
        validateAndUpdateYear(year.toString(), localMaxYear);
      } else {
        setLocalMaxYear(year.toString());
        validateAndUpdateYear(localMinYear, year.toString());
      }
    }
  };

  const validateAndUpdateYear = (min: string, max: string) => {
    const minYear = parseInt(min);
    const maxYear = parseInt(max);

    if (!isNaN(minYear) && !isNaN(maxYear)) {
      if (minYear <= maxYear) {
        onChange({ min: minYear, max: maxYear });
      }
    } else if (!isNaN(minYear)) {
      onChange({ min: minYear, max: minYear });
    } else if (!isNaN(maxYear)) {
      onChange({ min: maxYear, max: maxYear });
    } else {
      onChange(null);
    }
  };

  const formatYear = (year: number) => {
    return year.toString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Production Year
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
          <View style={styles.yearContainer}>
            <TextInput
              style={[
                styles.yearInput,
                {
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              value={localMinYear}
              onChangeText={(text) => {
                setLocalMinYear(text);
                validateAndUpdateYear(text, localMaxYear);
              }}
              placeholder="Min Year"
              placeholderTextColor={theme.colors.placeholder}
              keyboardType="numeric"
              maxLength={4}
            />
            <Text style={[styles.yearLabel, { color: theme.colors.text }]}>
              to
            </Text>
            <TextInput
              style={[
                styles.yearInput,
                {
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              value={localMaxYear}
              onChangeText={(text) => {
                setLocalMaxYear(text);
                validateAndUpdateYear(localMinYear, text);
              }}
              placeholder="Max Year"
              placeholderTextColor={theme.colors.placeholder}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          {Platform.OS === "ios" && (
            <>
              <TouchableOpacity
                onPress={() => setShowMinPicker(true)}
                style={styles.yearContainer}
              >
                <Text style={{ color: theme.colors.text }}>
                  Select Min Year
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowMaxPicker(true)}
                style={styles.yearContainer}
              >
                <Text style={{ color: theme.colors.text }}>
                  Select Max Year
                </Text>
              </TouchableOpacity>
            </>
          )}

          {(showMinPicker || Platform.OS === "android") && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="spinner"
              onChange={(event, date) => handleYearChange(event, date, true)}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
            />
          )}

          {(showMaxPicker || Platform.OS === "android") && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="spinner"
              onChange={(event, date) => handleYearChange(event, date, false)}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
            />
          )}

          {value && (
            <Text
              style={[styles.selectedYear, { color: theme.colors.secondary }]}
            >
              {formatYear(value.min)} - {formatYear(value.max)}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
