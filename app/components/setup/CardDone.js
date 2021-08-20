import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function CardDone({ titulo, subTitulo, onPress }) {
  return (
    <View style={styles.container} onPress={onPress}>
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
      <MaterialCommunityIcons
        name="check-circle"
        size={35}
        color={colors.white}
        style={{ alignSelf: "center", marginLeft: applyDinamicWidth(30) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: "80%",
    aspectRatio: 10 / 2.9,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.primary,
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: applyDinamicHeight(30),
  },

  titulo: {
    color: colors.white,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(15),
  },
  subTitulo: {
    color: colors.white,
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    fontSize: applyDinamicWidth(13),
    marginTop: applyDinamicHeight(8),
  },
});

export default CardDone;
