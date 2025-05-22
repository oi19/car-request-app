import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/presentation/screens/HomeScreen";
import { CarDetailsScreen } from "@/presentation/screens/CarDetailsScreen";
import { CarRequest } from "@/domain/entities/CarRequest";

export type RootStackParamList = {
  Home: undefined;
  CarDetails: {
    carRequest: CarRequest;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="CarDetails"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
    </Stack.Navigator>
  );
};
