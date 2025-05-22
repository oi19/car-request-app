"use client";

import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { styles } from "./styles";

export interface TextProps extends RNTextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "subtitle"
    | "body"
    | "caption"
    | "small"
    | "bold"
    | "medium"
    | "light";
}

export const Text: React.FC<TextProps> = ({
  variant = "body",
  style,
  children,
  ...props
}) => {
  return (
    <RNText style={[styles.text, variant && styles[variant], style]} {...props}>
      {children}
    </RNText>
  );
};
