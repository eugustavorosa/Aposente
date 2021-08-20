import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function BarraBalançoPequena({
  porcentagemAporteAnterior = 0.2,
  porcentagemDespesaAnterior = 0.3,
  porcentagemReceitaAnterior = 0.5,
  mesAnterior,
}) {
  return (
    <View>
      <AppText style={styles.mes}>{mesAnterior}</AppText>
      <View style={styles.container}>
        <View
          style={{
            height: porcentagemAporteAnterior * applyDinamicHeight(130),
            backgroundColor: colors.primary,
            borderTopEndRadius: 15,
            borderTopLeftRadius: 15,
          }}
        />
        <View style={{ backgroundColor: colors.primary }}>
          <View
            style={{
              height: porcentagemDespesaAnterior * applyDinamicHeight(130),
              backgroundColor: colors.mediumLight,
              borderTopEndRadius: 15,
              borderTopLeftRadius: 15,
            }}
          />
        </View>
        <View style={{ backgroundColor: colors.mediumLight }}>
          <View
            style={{
              height: porcentagemReceitaAnterior * applyDinamicHeight(130),
              backgroundColor: colors.white,
              borderTopEndRadius: 15,
              borderTopLeftRadius: 15,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: applyDinamicWidth(18),
    height: applyDinamicHeight(130),
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
  },
  mes: {
    fontSize: applyDinamicWidth(14),
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    marginBottom: applyDinamicHeight(15),
    alignSelf: "center",
    textTransform: "capitalize",
  },
});

export default BarraBalançoPequena;
