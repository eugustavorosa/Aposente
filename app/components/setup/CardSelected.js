import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function CardSelected({ titulo, subTitulo, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={{
          marginTop: applyDinamicHeight(10),
          marginLeft: applyDinamicWidth(16),
          width: "70%",
        }}
      >
        <AppText style={styles.titulo}>{titulo}</AppText>
        <AppText style={styles.subTitulo}>{subTitulo}</AppText>
      </View>
      <AppText style={styles.começar}>começar</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    width: "80%",
    aspectRatio: 10 / 2.9,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.primary,
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: applyDinamicHeight(30),
  },
  começar: {
    color: colors.primary,
    alignSelf: "center",
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(15),
    marginLeft: applyDinamicWidth(10),
  },
  titulo: {
    color: colors.dark,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(15),
  },
  subTitulo: {
    color: colors.medium,
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    fontSize: applyDinamicWidth(13),
    marginTop: applyDinamicHeight(8),
  },
});

export default CardSelected;
