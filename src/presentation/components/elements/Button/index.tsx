"use client";

import React from "react";
import {
  TouchableOpacity,
  type TouchableOpacityProps,
  ActivityIndicator,
  View,
} from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import { Text } from "../Text";
import { styles } from "./styles";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  loading = false,
  icon,
  fullWidth = false,
  disabled,
  style,
  children,
  ...props
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: theme.colors.primary,
          borderWidth: 0,
        };
      case "secondary":
        return {
          backgroundColor: theme.colors.secondary,
          borderWidth: 0,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return styles.small;
      case "large":
        return styles.large;
      default:
        return {};
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.text;
    if (variant === "outline" || variant === "ghost")
      return theme.colors.primary;
    return theme.colors.card;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getVariantStyles(),
        getSizeStyles(),
        fullWidth && { width: "100%" },
        disabled && styles.disabled,
        loading && styles.loading,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.container}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text
            style={[styles.text, getSizeStyles(), { color: getTextColor() }]}
          >
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
