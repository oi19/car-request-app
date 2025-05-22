import React from "react";
import {
  createNavigationContainerRef,
  StackActions,
} from "@react-navigation/native";
import type { RootStackParamList } from "./AppNavigator";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Queue to store pending navigation actions
let pendingNavigation: { name: keyof RootStackParamList; params?: any } | null =
  null;

// Function to process pending navigation
const processPendingNavigation = () => {
  if (pendingNavigation && navigationRef.isReady()) {
    console.log("Processing pending navigation:", pendingNavigation);
    navigationRef.dispatch(
      StackActions.push(pendingNavigation.name, pendingNavigation.params)
    );
    pendingNavigation = null;
  }
};

export const navigate = (name: keyof RootStackParamList, params?: any) => {
  try {
    if (!navigationRef.isReady()) {
      console.log("Navigation not ready, queueing navigation to:", name);
      pendingNavigation = { name, params };
      return;
    }
    console.log("Navigating to:", name, "with params:", params);
    navigationRef.dispatch(StackActions.push(name, params));
  } catch (error) {
    console.error("Navigation error in navigate:", error);
  }
};

export const reset = (state: any) => {
  try {
    if (!navigationRef.isReady()) {
      console.warn("Navigation attempted before navigation was ready");
      return;
    }
    navigationRef.reset(state);
  } catch (error) {
    console.error("Navigation error in reset:", error);
  }
};

export const goBack = () => {
  try {
    if (!navigationRef.isReady()) {
      console.warn("Navigation attempted before navigation was ready");
      return;
    }
    navigationRef.goBack();
  } catch (error) {
    console.error("Navigation error in goBack:", error);
  }
};

export const replace = (name: keyof RootStackParamList, params?: any) => {
  try {
    if (!navigationRef.isReady()) {
      console.log("Navigation not ready, queueing replace to:", name);
      pendingNavigation = { name, params };
      return;
    }
    console.log("Replacing with:", name, "with params:", params);
    navigationRef.dispatch(StackActions.replace(name, params));
  } catch (error) {
    console.error("Navigation error in replace:", error);
  }
};

export const getState = () => {
  try {
    if (!navigationRef.isReady()) {
      console.warn("Navigation attempted before navigation was ready");
      return null;
    }
    return navigationRef.getState();
  } catch (error) {
    console.error("Navigation error in getState:", error);
    return null;
  }
};

export const getActiveRoute = () => {
  try {
    const state = getState();
    if (state) {
      const selectedRoute = state.routes[state.index];
      if (
        selectedRoute.state &&
        "routes" in selectedRoute.state &&
        selectedRoute.state.index !== undefined
      ) {
        return selectedRoute.state.routes[selectedRoute.state.index];
      }
      return selectedRoute;
    }
    return null;
  } catch (error) {
    console.error("Navigation error in getActiveRoute:", error);
    return null;
  }
};

// Export the processPendingNavigation function
export { processPendingNavigation };
