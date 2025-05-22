import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  TextStyle,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ArrowLeft, Phone, Mail, Building } from "lucide-react-native";
import { colors, spacing, typography } from "@/presentation/theme";
import type { CarRequest } from "@/domain/entities/CarRequest";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "@/presentation/navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

type RouteParams = RouteProp<RootStackParamList, "CarDetails">;

const { width } = Dimensions.get("window");

const CarDetailsScreen = () => {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation();
  const { carRequest } = route.params;

  const renderInfoItem = (label: string, value: string | number) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const hasValidImage = carRequest.image && carRequest.image.trim() !== "";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {hasValidImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: carRequest.image }}
              style={styles.image}
              resizeMode="cover"
            />
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={24} color={colors.text.primary} />
            </Pressable>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{carRequest.title}</Text>
          <Text style={styles.price}>{carRequest.price}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Car Details</Text>
            {renderInfoItem("Brand", carRequest.brand)}
            {renderInfoItem("Type", carRequest.type)}
            {renderInfoItem("Production Year", carRequest.productionYear)}
            {renderInfoItem("Location", carRequest.location)}
            {renderInfoItem("Status", carRequest.status)}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Request Information</Text>
            {renderInfoItem(
              "Created At",
              new Date(carRequest.createdAt).toLocaleDateString()
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: spacing.lg,
    left: spacing.lg,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: width,
    height: width * 0.75,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  } as TextStyle,
  price: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.lg,
  } as TextStyle,
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  } as TextStyle,
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    ...typography.body1,
    color: colors.text.secondary,
  } as TextStyle,
  infoValue: {
    ...typography.body1,
    color: colors.text.primary,
  } as TextStyle,
});

export default CarDetailsScreen;
