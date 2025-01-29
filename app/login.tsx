import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { useKeycloak } from "@react-keycloak/native";

export default function LoginScreen() {
  const { keycloak } = useKeycloak();

  const handleLogin = async () => {
    try {
      keycloak?.login({
        redirectUri: "keycloak://dashboard",
        action: "register",
      });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Attendance App</Text>
      <Button title="Login with Keycloak" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
