import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import colors from "../../config/colors";

import AppMaskText from "../AppMaskText";
import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicSize from "../valores/applyDinamicSize";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function CardSaldoMensal({
  receitaMensal = 1000,
  despesaMensal = 650.23,
  aporteMensal = 300,
}) {
  const saldoMensal = receitaMensal - (despesaMensal + aporteMensal);

  let unidade = "R$ ";
  if (saldoMensal < 0) unidade = "-R$ ";

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.patrimonioContainer}>
          <AppText style={styles.tituloPatrimonio}>
            {format(new Date(), "MMMM", { locale: ptBR })} - Saldo Mensal
          </AppText>
          <AppMaskText
            value={saldoMensal * 1}
            style={styles.valorPatrimonio}
            precision="2"
            unit={unidade}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginRight: applyDinamicWidth(10) }}>
          <AppText style={styles.tituloPequeno}>Receitas</AppText>
          <AppMaskText value={receitaMensal * 1} style={styles.valorPequeno} />
        </View>
        <View style={{ marginRight: applyDinamicWidth(10) }}>
          <AppText style={styles.tituloPequeno}>Despesas</AppText>
          <AppMaskText value={despesaMensal * 1} style={styles.valorPequeno} />
        </View>
        <View style={{ marginRight: applyDinamicWidth(10) }}>
          <AppText style={styles.tituloPequeno}>Aportes</AppText>
          <AppMaskText value={aporteMensal * 1} style={styles.valorPequeno} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botãoAporteContainer: {
    flex: 0.25,
    alignItems: "center",
  },
  container: {
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderRadius: 30,
    marginTop: applyDinamicSize(25),
    // Platform.OS === "android" ? applyDinamicSize(-20) : applyDinamicSize(25),
    width: "85%",
    aspectRatio: 10 / 3.65,
  },
  patrimonioContainer: {
    flex: 0.68,
    marginBottom: applyDinamicHeight(5),
  },
  tituloPatrimonio: {
    paddingHorizontal: applyDinamicWidth(30),
    paddingVertical: applyDinamicHeight(10),
    marginTop: applyDinamicHeight(2),
    color: colors.white,
    fontWeight: "200",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    fontSize: applyDinamicWidth(17),
    textTransform: "capitalize",
  },
  tituloAporte: {
    color: colors.white,
    marginTop: 15,
    fontSize: 14,
    fontWeight: "bold",
  },
  tituloPequeno: {
    color: colors.white,
    fontSize: applyDinamicWidth(15),
    fontWeight: "200",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    marginLeft: applyDinamicWidth(30),
    fontSize: applyDinamicWidth(13),
  },
  valorPatrimonio: {
    color: colors.white,
    paddingHorizontal: applyDinamicWidth(30),
    top: applyDinamicHeight(-7),
    fontSize: applyDinamicWidth(26),
    fontWeight: "bold",
  },
  valorPequeno: {
    color: colors.white,
    marginLeft: applyDinamicWidth(30),
    fontSize: applyDinamicWidth(15),
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
});

export default CardSaldoMensal;
