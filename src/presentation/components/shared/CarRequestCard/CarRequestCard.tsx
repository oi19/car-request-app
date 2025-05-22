"use client";

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ImageStyle,
  TextStyle,
} from "react-native";
import { colors, spacing, typography } from "@/presentation/theme";
import { Car, Calendar, MapPin } from "lucide-react-native";
import type { CarRequest } from "@/domain/entities/CarRequest";

interface CarRequestCardProps {
  carRequest: CarRequest;
  onPress: () => void;
}

export const CarRequestCard: React.FC<CarRequestCardProps> = ({
  carRequest,
  onPress,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return colors.warning;
      case "approved":
        return colors.success;
      case "rejected":
        return colors.error;
      default:
        return colors.text.secondary;
    }
  };

  const formatStatus = (status: string) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const hasValidImage = carRequest.image && carRequest.image.trim() !== "";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {hasValidImage && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: carRequest.image }}
            style={styles.image as ImageStyle}
            resizeMode="cover"
          />
          {carRequest.type && (
            <View style={styles.typeContainer}>
              <Text style={styles.typeText}>{carRequest.type}</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          {carRequest.title && (
            <Text style={styles.title} numberOfLines={1}>
              {carRequest.title}
            </Text>
          )}
          {carRequest.price && (
            <Text style={styles.price}>{carRequest.price}</Text>
          )}
        </View>

        <View style={styles.details}>
          {carRequest.brand && (
            <View style={styles.detailItem}>
              <Car size={16} color={colors.text.secondary} />
              <Text style={styles.detailText}>{carRequest.brand}</Text>
            </View>
          )}

          {carRequest.productionYear && (
            <View style={styles.detailItem}>
              <Calendar size={16} color={colors.text.secondary} />
              <Text style={styles.detailText}>{carRequest.productionYear}</Text>
            </View>
          )}

          {carRequest.location && (
            <View style={styles.detailItem}>
              <MapPin size={16} color={colors.text.secondary} />
              <Text style={styles.detailText} numberOfLines={1}>
                {carRequest.location}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          {carRequest.status && (
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(carRequest.status) },
                ]}
              />
              <Text style={styles.statusText}>
                {formatStatus(carRequest.status)}
              </Text>
            </View>
          )}

          {carRequest.createdAt && (
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {new Date(carRequest.createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: spacing.md,
    marginBottom: spacing.md,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  imageContainer: {
    position: "relative",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  typeContainer: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.primary + "90",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
  },
  typeText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: "600" as const,
  } as TextStyle,
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.sm,
  } as TextStyle,
  price: {
    ...typography.h3,
    color: colors.primary,
  } as TextStyle,
  details: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  detailText: {
    ...typography.body2,
    color: colors.text.secondary,
  } as TextStyle,
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    ...typography.body2,
    color: colors.text.secondary,
  } as TextStyle,
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    ...typography.body2,
    color: colors.text.secondary,
  } as TextStyle,
});
