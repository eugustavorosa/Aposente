import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

import BarraBalanço from "../transações/BarraBalanço";
import BarraBalançoPequena from "../transações/BarraBalançoPequena";
import LegendaBalançoMensal from "../transações/LegendaBalançoMensal";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function CardBalançoHome({
  valorAporteMensal,
  valorDespesaMensal,
  valorReceitaMensal,
  mesAtual,
  mesAnterior,

  porcentagemReceitaAtual,
  porcentagemAporteAtual,
  porcentagemDespesaAtual,
}) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: colors.backgroundCard,
    borderRadius: 35,
    marginTop: applyDinamicHeight(14),
    height: "40%",
    width: "85%",
    flexDirection: "row",
  },
});

export default CardBalançoHome;
