import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { useStore } from "@/store";
import { keycloak } from "@/constants";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { setUser } = useStore();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await keycloak.login();
      if (user.token) {
        setUser(user);
        router.push("/dashboard");
      }
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
