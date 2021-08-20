import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

import colors from "../../config/colors";

import AppText from "../AppText";

function CardProgresso({
  referencia,
  preReferencia,
  porcentagem,
  onPressCard,
}) {
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
    <TouchableOpacity style={styles.container} onPress={onPressCard}>
      <View
        style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }}
      >
        <AppText
          style={{
            position: "absolute",
            fontSize: 16,
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
          width={130}
          height={130}
          chartConfig={chartConfig}
          hideLegend={true}
        />
      </View>
      <View
        style={{
          flex: 0.6,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <AppText style={styles.textoProgresso}>
          Você já investiu {porcentagem}% do que planejou {preReferencia}
          <AppText style={styles.textoProgressoDestaque}>{referencia}</AppText>.
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
    marginTop: 14,
    height: "25%",
    width: "85%",
  },
  textoProgresso: {
    fontWeight: "600",
    color: colors.dark,
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: Platform.OS === "android" ? 17 : 16,
  },
  textoProgressoDestaque: {
    fontWeight: "600",
    color: colors.primary,
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: Platform.OS === "android" ? 17 : 16,
  },
});

export default CardProgresso;
