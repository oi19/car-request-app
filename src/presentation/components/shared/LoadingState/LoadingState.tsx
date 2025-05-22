import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "@/presentation/theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoadingState = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
