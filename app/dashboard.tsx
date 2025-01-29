import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";
import { useKeycloak } from "@react-keycloak/native";

export default function Dashboard() {
  const { keycloak } = useKeycloak();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Link href="/scanner">Go to QR Scanner</Link>
      <Button
        title="Logout"
        onPress={() => {
          keycloak?.logout();
        }}
      />
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
