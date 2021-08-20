import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import colors from "../../config/colors";
import applyDinamicHeight from "../valores/applyDinamicHeight";

function UndoneButton({ titulo, onPress }) {
  return <FAB style={styles.fab} label={titulo} onPress={onPress} />;
}

const styles = StyleSheet.create({
  fab: {
    margin: applyDinamicHeight(16),
    right: 0,
    bottom: applyDinamicHeight(10),
    backgroundColor: colors.medium,
    width: "85%",
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default UndoneButton;
