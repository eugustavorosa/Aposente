import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

import AppText from "../AppText";

function CaixaSelected({ titulo, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AppText style={styles.titulo}>{titulo}</AppText>
      <View style={styles.uncheck}>
        <MaterialCommunityIcons
          name="check"
          size={20}
          color={colors.primary}
          style={{ alignSelf: "center" }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    aspectRatio: 10 / 1.8,
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
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
    borderColor: colors.backgroundCard,
    backgroundColor: colors.backgroundCard,
    alignSelf: "center",
  },
});

export default CaixaSelected;
