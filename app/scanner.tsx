import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useKeycloak } from "@react-keycloak/native";
import { Camera, CameraType } from "react-native-camera-kit";
import { OnReadCodeData } from "react-native-camera-kit/dist/CameraProps";

export default function Scanner() {
  const { keycloak } = useKeycloak();

  const handleScanSuccess = async (e: OnReadCodeData) => {
    try {
      const payload = JSON.parse(e.nativeEvent.codeStringValue);
      const response = await fetch("https://192.168.1.4:3000/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak?.token}`,
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
      <Camera
        cameraType={CameraType.Back}
        scanBarcode={true}
        onReadCode={handleScanSuccess}
        flashMode="on"
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
