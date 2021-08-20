import React from "react";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import colors from "../config/colors";

import AppText from "./AppText";
import applyDinamicWidth from "./valores/applyDinamicWidth";

function AppPicker({ label, onPress, backgroundColor = "gray" }) {
  return (
    <TouchableWithoutFeedback
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <AppText style={styles.label}>{label}</AppText>
      {/* <MaterialCommunityIcons
        name="chevron-down"
        size={24}
        color={colors.white}
        style={styles.chevron}
      /> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
    padding: applyDinamicWidth(8),
    width: applyDinamicWidth(150),
    marginLeft: applyDinamicWidth(40),
  },
  chevron: {
    alignSelf: "center",
  },
  label: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default AppPicker;
