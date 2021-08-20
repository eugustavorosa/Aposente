import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

import AppMaskText from "../AppMaskText";
import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function LegendaBalançoMensal({
  valorAporteMensal,
  valorDespesaMensal,
  valorReceitaMensal,
}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.primary,
            height: applyDinamicWidth(10),
            width: applyDinamicWidth(10),
            marginRight: applyDinamicWidth(6),
            borderRadius: 50,
          }}
        />
        <AppText style={styles.titulo}>Aporte</AppText>
      </View>
      <AppMaskText
        value={valorAporteMensal * 1}
        precision={2}
        style={styles.valor}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: applyDinamicHeight(10),
        }}
      >
        <View
          style={{
            backgroundColor: colors.mediumLight,
            height: applyDinamicWidth(10),
            width: applyDinamicWidth(10),
            marginRight: applyDinamicWidth(6),
            borderRadius: 10,
          }}
        />
        <AppText style={styles.titulo}>Despesa</AppText>
      </View>
      <AppMaskText
        value={valorDespesaMensal * 1}
        precision={2}
        style={styles.valor}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: applyDinamicHeight(10),
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            height: applyDinamicWidth(10),
            width: applyDinamicWidth(10),
            borderRadius: 10,
            marginRight: applyDinamicWidth(6),
          }}
        />
        <AppText style={styles.titulo}>Receita</AppText>
      </View>
      <AppMaskText
        value={valorReceitaMensal * 1}
        precision={2}
        style={styles.valor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: applyDinamicHeight(40),
    marginLeft: applyDinamicWidth(32),
    top: applyDinamicHeight(10),
  },
  titulo: {
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    fontSize: applyDinamicWidth(14),
  },
  valor: {
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    marginTop: applyDinamicHeight(5),
    fontSize: applyDinamicWidth(14),
  },
});

export default LegendaBalançoMensal;
