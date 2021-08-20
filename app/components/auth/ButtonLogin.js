import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";

function ButtonLogin({
  backgroundColor = colors.white,
  onPress,
  color = colors.primary,
  name,
  width = "80%",
  height,
  aspectRatio = 10 / 1.4,
  icon,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, width, height, aspectRatio }]}
      onPress={onPress}
    >
      <AppText style={[styles.titulo, { color }]}>{name}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  titulo: {
    alignSelf: "center",
    fontWeight: "500",
  },
  icon: {
    alignSelf: "center",
  },
});

export default ButtonLogin;
