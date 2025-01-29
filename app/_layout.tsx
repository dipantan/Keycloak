import { keycloak as KC } from "@/constants";
import {
  ReactNativeKeycloakProvider,
  useKeycloak,
} from "@react-keycloak/native";
import { router, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const ROUTES = {
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
};

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { keycloak } = useKeycloak();
  const [loading, setLoading] = useState(true);

  // Handle authentication state and navigation
  const navigateBasedOnAuth = () => {
    if (keycloak?.authenticated) {
      router.push(ROUTES.DASHBOARD);
    } else {
      router.push(ROUTES.LOGIN);
    }
  };

  useEffect(() => {
    // Wait for Keycloak to initialize
    if (!keycloak) {
      return;
    }
    setLoading(false);
    SplashScreen.hideAsync();
    navigateBasedOnAuth();
  }, [keycloak?.authenticated]);

  // Render a loading indicator while initializing
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Main app with Keycloak provider
  return (
    <ReactNativeKeycloakProvider
      authClient={KC}
      initOptions={{
        redirectUri: "keycloak://dashboard", // Ensure this is correctly configured in Keycloak
        inAppBrowserOptions: {},
      }}
      autoRefreshToken={true}
      LoadingComponent={<ActivityIndicator size="large" color={"red"} />}
    >
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </ReactNativeKeycloakProvider>
  );
}
