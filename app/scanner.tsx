import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useStore } from "@/store";

export default function ScannerScreen() {
  const { user } = useStore();

  const handleScanSuccess = async (e: { data: string }) => {
    try {
      const payload = JSON.parse(e.data);
      const response = await fetch("https://192.168.1.4:3000/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ qrPayload: payload }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Attendance marked successfully!");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Invalid QR Code");
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleScanSuccess}
        topContent={<Text>Scan the QR Code to mark attendance</Text>}
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
});
