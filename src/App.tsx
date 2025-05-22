import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "@/navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  navigationRef,
  processPendingNavigation,
} from "@/navigation/navigationService";

// Enable screens for better performance
enableScreens();

const queryClient = new QueryClient();

export default function App() {
  const onReady = () => {
    console.log("Navigation container is ready");
    // Process any pending navigation
    processPendingNavigation();
  };

  const onStateChange = () => {
    const currentRouteName = navigationRef.getCurrentRoute()?.name;
    console.log("Navigation state changed to:", currentRouteName);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={onReady}
        onStateChange={onStateChange}
      >
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
