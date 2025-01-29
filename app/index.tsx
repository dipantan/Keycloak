import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />;
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
