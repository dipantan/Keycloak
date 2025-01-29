import { keycloak as KC } from "@/constants";
import {
  ReactNativeKeycloakProvider,
  useKeycloak,
} from "@react-keycloak/native";
import { SplashScreen, Stack, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { keycloak } = useKeycloak();
  const navigate = useNavigation();

  useEffect(() => {
    if (!keycloak) {
      navigate.reset({ index: 0, routes: [{ name: "login" }] });
    } else {
      navigate.reset({ index: 0, routes: [{ name: "dashboard" }] });
    }
  }, [keycloak]);

  return (
    <ReactNativeKeycloakProvider
      authClient={KC}
      initOptions={{
        redirectUri: "keycloak://dashboard",
        inAppBrowserOptions: {
          dismissButtonStyle: "close",
          toolbarColor: "#000000",
        },
      }}
      autoRefreshToken={true}
      LoadingComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={"red"} />;
        </View>
      }
    >
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </ReactNativeKeycloakProvider>
  );
}
