import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

import AppText from "../AppText";

function ContainerConfiguração({ titulo, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AppText style={styles.titulo}>{titulo}</AppText>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={colors.medium}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    height: 60,
    flexDirection: "row",
  },
  titulo: {
    alignSelf: "center",
    width: "86%",
    marginLeft: 20,
    fontSize: 15,
    color: colors.dark,
    fontWeight: "400",
  },
  chevron: {
    alignSelf: "center",
  },
});

export default ContainerConfiguração;
