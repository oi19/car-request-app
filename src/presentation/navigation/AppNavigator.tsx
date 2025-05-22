import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import CarDetailsScreen from "../screens/CarDetailsScreen";
import type { CarRequest } from "@/domain/entities/CarRequest";

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { carRequest: CarRequest };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
    </Stack.Navigator>
  );
};
