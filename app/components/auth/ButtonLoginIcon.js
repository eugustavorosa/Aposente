import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../../config/colors";
import AppText from "../AppText";

function ButtonLoginIcon({
  aspectRatio = 10 / 1.4,
  backgroundColor = colors.white,
  onPress,
  color = colors.primary,
  name,
  width = "80%",
  height,
  icon,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, width, height, aspectRatio }]}
      onPress={onPress}
    >
      <View style={{ width: "30%", justifyContent: "center" }}>
        <AntDesign name={icon} size={24} color={color} style={styles.icon} />
      </View>
      <AppText style={[styles.titulo, { color }]}>{name}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  titulo: {
    alignSelf: "center",
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
  icon: {
    alignSelf: "center",
  },
});

export default ButtonLoginIcon;
