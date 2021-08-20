import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

import AppMaskText from "../AppMaskText";
import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";
import applyDinamicSize from "../valores/applyDinamicSize";

function CardPatrimônio({
  patrimonio,
  onPressAporte,
  icon,
  investimentoInicial,
  valorAportes,
}) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.patrimonioContainer}>
          <AppText style={styles.tituloPatrimonio}>Patrimônio</AppText>
          <AppMaskText
            value={patrimonio * 1}
            style={styles.valorPatrimonio}
            precision="2"
          />
        </View>
        <View style={styles.botãoAporteContainer}>
          <AppText style={styles.tituloAporte}>Aporte mensal</AppText>
          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              height: applyDinamicWidth(40),
              width: applyDinamicWidth(40),
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              marginTop: applyDinamicHeight(8),
            }}
            onPress={onPressAporte}
          >
            <MaterialCommunityIcons
              name={icon}
              size={applyDinamicWidth(30)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          <AppText style={styles.tituloPequeno}>Investimento Inicial</AppText>
          <AppMaskText
            value={investimentoInicial * 1}
            style={styles.valorPequeno}
          />
        </View>
        <View>
          <AppText style={styles.tituloPequeno}>Aportes</AppText>
          <AppMaskText value={valorAportes * 1} style={styles.valorPequeno} />
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
    marginTop:
      Platform.OS === "android" ? applyDinamicSize(-20) : applyDinamicSize(25),
    width: "85%",
    aspectRatio: 10 / 3.65,
  },
  patrimonioContainer: {
    flex: 0.68,
  },
  tituloPatrimonio: {
    paddingHorizontal: applyDinamicWidth(30),
    paddingVertical: applyDinamicHeight(10),
    marginTop: applyDinamicHeight(2),
    color: colors.white,
    fontWeight: "200",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    fontSize: applyDinamicWidth(19),
  },
  tituloAporte: {
    color: colors.white,
    marginTop: applyDinamicHeight(15),
    fontSize: applyDinamicWidth(12),
    fontWeight: "bold",
  },
  tituloPequeno: {
    color: colors.white,
    fontSize: applyDinamicHeight(14),
    fontWeight: "200",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    marginLeft: applyDinamicWidth(30),
  },
  valorPatrimonio: {
    color: colors.white,
    paddingHorizontal: applyDinamicWidth(30),
    top: -7,
    fontSize: applyDinamicWidth(26),
    fontWeight: "bold",
  },
  valorPequeno: {
    color: colors.white,
    marginLeft: applyDinamicWidth(30),
    fontWeight: "600",
    fontSize: applyDinamicWidth(15),
  },
});

export default CardPatrimônio;
