import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

import BarraBalanço from "./BarraBalanço";
import BarraBalançoPequena from "./BarraBalançoPequena";
import LegendaBalançoMensal from "./LegendaBalançoMensal";
import applyDinamicWidth from "../valores/applyDinamicWidth";
import applyDinamicHeight from "../valores/applyDinamicHeight";

function CardBalançoMensal({
  valorAporteMensal,
  valorDespesaMensal,
  valorReceitaMensal,
  mesAtual,
  mesAnterior,
  onPressLeft,
  onPressRight,
  porcentagemReceitaAtual,
  porcentagemAporteAtual,
  porcentagemDespesaAtual,
}) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={applyDinamicWidth(50)}
        color={colors.medium}
        style={styles.chevronLeft}
        onPress={onPressLeft}
      />
      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          marginLeft: applyDinamicWidth(40),
          width: applyDinamicWidth(65),
        }}
      >
        <BarraBalançoPequena
          // porcentagemReceitaAnterior={0.5}
          // porcentagemAporteAnterior={0.3}
          // porcentagemDespesaAnterior={0.2}
          mesAnterior={mesAnterior}
        />
      </View>
      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          marginLeft: applyDinamicWidth(28),
          width: applyDinamicWidth(87),
        }}
      >
        <BarraBalanço
          porcentagemReceitaAtual={porcentagemReceitaAtual}
          porcentagemAporteAtual={porcentagemAporteAtual}
          porcentagemDespesaAtual={porcentagemDespesaAtual}
          mesAtual={mesAtual}
        />
      </View>
      <LegendaBalançoMensal
        valorAporteMensal={valorAporteMensal}
        valorDespesaMensal={valorDespesaMensal}
        valorReceitaMensal={valorReceitaMensal}
      />
      <MaterialCommunityIcons
        name="chevron-right"
        size={applyDinamicWidth(50)}
        color={colors.medium}
        style={styles.chevronRight}
        onPress={onPressRight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: colors.backgroundCard,
    borderRadius: 35,
    marginTop: applyDinamicHeight(14),
    height: "32%",
    width: "85%",
    flexDirection: "row",
  },
  chevronLeft: {
    position: "absolute",
    alignSelf: "center",
    left: -35,
  },
  chevronRight: {
    position: "absolute",
    alignSelf: "center",
    right: -35,
  },
});

export default CardBalançoMensal;
