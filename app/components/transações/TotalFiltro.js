import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

import AppMaskText from "../AppMaskText";
import AppText from "../AppText";

const TotalFiltro = ({ valorFiltrado }) => {
  let unidade = "R$ ";
  if (valorFiltrado < 0) unidade = "-R$ ";

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="filter-menu"
        size={19}
        color={colors.primary}
        style={{ marginRight: 7, bottom: -1 }}
      />
      <AppText style={styles.text}>Total</AppText>
      <AppMaskText
        style={styles.valorFiltrado}
        unit={unidade}
        value={valorFiltrado}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.white,
    width: "100%",
    height: "6.5%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ////// shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  text: {
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    color: colors.primary,
    fontSize: 13,
  },
  valorFiltrado: {
    fontWeight: "700",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    color: colors.primary,
    marginLeft: 7,
    fontSize: 17,
    marginRight: "10%",
  },
});

export default TotalFiltro;
