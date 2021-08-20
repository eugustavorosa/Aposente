import React from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function AuthButton({
  titulo,
  backgroundColor = colors.darkPurple,
  color = colors.white,
  fontWeight = "600",
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <AppText style={[styles.titulo, { color, fontWeight }]}>{titulo}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 13,
    width: applyDinamicWidth(200),
    aspectRatio: 10 / 2.1,
    alignSelf: "center",
    borderRadius: 15,
    justifyContent: "center",
  },
  titulo: {
    alignSelf: "center",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(15),
  },
});

export default AuthButton;
