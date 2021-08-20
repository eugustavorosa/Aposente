import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

function Loading({ size = "large", style}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} style={style} />
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

export default Loading;
