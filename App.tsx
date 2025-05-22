import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/presentation/theme/ThemeProvider";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiProvider } from "./src/data/api/ApiProvider";
import { AppNavigator } from "./src/presentation/navigation/AppNavigator";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <SafeAreaProvider>
            <ThemeProvider>
              <BottomSheetModalProvider>
                <StatusBar style="auto" />
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </BottomSheetModalProvider>
            </ThemeProvider>
          </SafeAreaProvider>
        </ApiProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
