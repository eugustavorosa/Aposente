import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import applyDinamicHeight from "./valores/applyDinamicHeight";

function OkButton({
  onPress,
  backgroundColor = colors.primary,
  checkColor = colors.white,
  checkSize = 34,
  marginTop,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, marginTop }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="check"
        size={checkSize}
        color={checkColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    padding: applyDinamicHeight(25),
    marginVertical: 8,
  },
});

export default OkButton;
