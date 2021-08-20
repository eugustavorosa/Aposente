import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../config/colors";

import AppText from "../AppText";

function CaixaUnselected({ titulo, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AppText style={styles.titulo}>{titulo}</AppText>
      <View style={styles.uncheck} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    aspectRatio: 10 / 1.8,
    color: colors.backgroundCard,
    borderWidth: 1.5,
    borderColor: colors.mediumMaisLightAinda,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  titulo: {
    alignSelf: "center",
    marginLeft: 20,
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    flex: 0.9,
  },
  uncheck: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.mediumMaisLightAinda,
    alignSelf: "center",
  },
});

export default CaixaUnselected;
