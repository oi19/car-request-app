import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "../../elements/Text";
import { colors } from "@/presentation/theme/colors";
import { spacing } from "@/presentation/theme/spacing";
import { typography } from "@/presentation/theme/typography";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  transparent = false,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={[styles.container, transparent && styles.transparentContainer]}
    >
      <View style={styles.content}>
        {showBackButton && (
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft
              size={24}
              color={transparent ? colors.white : colors.gray[900]}
            />
          </Pressable>
        )}
        <Text
          variant="h2"
          style={[
            styles.title,
            transparent && styles.transparentTitle,
            showBackButton && styles.titleWithBack,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  transparentContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  backButton: {
    padding: spacing.xs,
    borderRadius: 8,
    marginRight: spacing.xs,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  title: {
    color: colors.gray[900],
    flex: 1,
    textAlign: "center",
  },
  titleWithBack: {
    marginRight: spacing.xl,
  },
  transparentTitle: {
    color: colors.white,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
