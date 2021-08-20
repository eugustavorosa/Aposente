import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function UnSelectedItem({ name, onPressUnselected }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressUnselected}>
      <AppText style={styles.title}>{name}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "6%",
    marginTop: applyDinamicHeight(30),
  },
  title: {
    fontSize: applyDinamicWidth(16),
    fontWeight: "200",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
  },
});

export default UnSelectedItem;
