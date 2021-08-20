import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

import AppMaskText from "../AppMaskText";
import AppText from "../AppText";

function Balanço({ valorReceita, valorDespesa, valorAporte }) {
  return (
    <View style={styles.container}>
      <View style={styles.valor}>
        <AppMaskText value={valorReceita} style={styles.receita} />
        <AppText style={styles.legenda}>Receitas</AppText>
      </View>
      <View style={styles.valor}>
        <AppMaskText value={valorDespesa} style={styles.despesa} />
        <AppText style={styles.legenda}>Despesas</AppText>
      </View>
      <View style={styles.valor}>
        <AppMaskText value={valorAporte} style={styles.aporte} />
        <AppText style={styles.legenda}>Aportes</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: colors.white,
  },
  receita: {
    alignSelf: "center",
    fontSize: 20,
    color: colors.receita,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica Neue",
    fontWeight: "500",
  },
  despesa: {
    alignSelf: "center",
    fontSize: 20,
    color: colors.despesa,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica Neue",
    fontWeight: "500",
  },
  aporte: {
    alignSelf: "center",
    fontSize: 20,
    color: colors.primary,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica Neue",
    fontWeight: "500",
  },
  legenda: {
    color: colors.lightGrey,
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "500",
  },
});

export default Balanço;
