import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function SelectedTitle({ name }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{name}</AppText>
      <View
        style={{
          width: 5,
          height: 5,
          borderRadius: 10,
          backgroundColor: colors.dark,
          marginTop: applyDinamicHeight(4),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "6%",
    marginTop: applyDinamicHeight(30),
    alignItems: "center",
  },
  title: {
    color: colors.dark,
    fontSize: applyDinamicWidth(18),
    fontWeight: "700",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
});

export default SelectedTitle;
