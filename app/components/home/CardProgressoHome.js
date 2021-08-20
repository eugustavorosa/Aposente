import { getMonth, isWithinInterval, subMonths } from "date-fns";
import { parseISO } from "date-fns/esm";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

import colors from "../../config/colors";
import { useTransações } from "../context/contextProvider";

import AppText from "../AppText";
import sum from "../valores/sum";
import valor from "../valores/valor";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function CardProgressoHome({}) {
  const {
    patrimonio,
    patrimonioFinal,
    aporteMensal,
    transações,
    mesesContribuição,
  } = useTransações();
  const mesesReferenciaAporte = [
    1,
    getMonth(new Date()) > 6
      ? getMonth(new Date()) - 5
      : getMonth(new Date()) + 1,
    getMonth(new Date()) + 1,
    360,
  ];
  const mesesReferenciaDivisao = [1, 6, 12, mesesContribuição];
  const preReferencia = ["para este ", "para o ", "para o ", "no seu "];
  const referencia = ["mês", "semestre", "ano", "plano de aposentadoria"];
  const [assignee, setAssignee] = useState(1);
  const handleAssigneeOnClick = () => {
    setAssignee((prev) => (prev + 1) % 4);
  };
  const valorTotalAporteReferencia = transações
    .filter((item) => item.tipoTransação.includes("aporte"))
    .filter((item) =>
      isWithinInterval(parseISO(item.dataTransação), {
        start: subMonths(new Date(), mesesReferenciaAporte[assignee]),
        end: new Date(),
      })
    )
    .map(valor)
    .reduce(sum, 0);
  let porcentagem = (
    ((assignee === 3 ? patrimonio : valorTotalAporteReferencia) /
      (assignee === 3
        ? patrimonioFinal
        : aporteMensal * mesesReferenciaDivisao[assignee])) *
    100
  ).toFixed(0);

  porcentagem > 100;
  const data = {
    data: [porcentagem > 100 ? 1 : porcentagem / 100],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.white,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(123, 44, 191, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleAssigneeOnClick}>
      <View
        style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}
      >
        <AppText
          style={{
            position: "absolute",
            fontSize: applyDinamicWidth(16),
            fontWeight: "600",
            fontFamily:
              Platform.OS === "android"
                ? "sans-serif-medium"
                : "Helvetica Neue",
          }}
        >
          {porcentagem}%
        </AppText>
        <ProgressChart
          data={data}
          width={applyDinamicHeight(130)}
          height={applyDinamicHeight(130)}
          chartConfig={chartConfig}
          hideLegend={true}
        />
      </View>
      <View
        style={{
          flex: 0.6,
          alignItems: "center",
          justifyContent: "center",
          padding: applyDinamicHeight(10),
        }}
      >
        <AppText style={styles.textoProgresso}>
          Você já investiu {porcentagem}% do que planejou{" "}
          {preReferencia[assignee]}
          <AppText style={styles.textoProgressoDestaque}>
            {referencia[assignee]}
          </AppText>
          .
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: colors.backgroundCard,
    borderRadius: 35,
    flexDirection: "row",
    marginTop: applyDinamicHeight(14),
    width: "85%",
    height: applyDinamicHeight(160),
  },
  textoProgresso: {
    fontWeight: "600",
    color: colors.dark,
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(16),
  },
  textoProgressoDestaque: {
    fontWeight: "600",
    color: colors.primary,
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(16),
  },
});

export default CardProgressoHome;
