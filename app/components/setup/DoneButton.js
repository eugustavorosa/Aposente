import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import colors from "../../config/colors";
import applyDinamicHeight from "../valores/applyDinamicHeight";

function DoneButton({ titulo, onPress, bottom = 10 }) {
  return (
    <FAB style={[styles.fab, { bottom }]} label={titulo} onPress={onPress} />
  );
}

const styles = StyleSheet.create({
  fab: {
    margin: applyDinamicHeight(16),
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: "85%",
    alignSelf: "center",
  },
});

export default DoneButton;
