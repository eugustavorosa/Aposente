import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function BarraBalanço({
  porcentagemAporteAtual = 0.2,
  porcentagemDespesaAtual = 0.3,
  porcentagemReceitaAtual = 0.5,
  mesAtual,
}) {
  return (
    <View>
      <AppText style={styles.mes}>{mesAtual}</AppText>
      <View style={styles.container}>
        <View
          style={{
            height: porcentagemAporteAtual * applyDinamicHeight(165),
            backgroundColor: colors.primary,
            borderTopEndRadius: 14,
            borderTopLeftRadius: 14,
          }}
        />
        <View style={{ backgroundColor: colors.primary }}>
          <View
            style={{
              height: porcentagemDespesaAtual * applyDinamicHeight(165),
              backgroundColor: colors.mediumLight,
              borderTopEndRadius: 14,
              borderTopLeftRadius: 14,
            }}
          />
        </View>
        <View style={{ backgroundColor: colors.mediumLight }}>
          <View
            style={{
              height: porcentagemReceitaAtual * applyDinamicHeight(165),
              backgroundColor: colors.white,
              borderTopEndRadius: 14,
              borderTopLeftRadius: 14,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: applyDinamicWidth(30),
    height: applyDinamicHeight(165),
    backgroundColor: colors.backgroundCard,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  mes: {
    alignSelf: "center",
    fontSize: applyDinamicWidth(18),
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    marginBottom: applyDinamicHeight(15),
    textTransform: "capitalize",
  },
});

export default BarraBalanço;
