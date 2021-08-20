import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

import AppMaskText from "../AppMaskText";
import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function CardPlanodeAposentadoria({
  valorMensal,
  aporte,
  anos,
  juros,
  onPressChange,
}) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.55, flexDirection: "row" }}>
        <View style={{ flex: 0.75, left: 2 }}>
          <AppText style={styles.tituloGrande}>Você se aposentará com:</AppText>
          <View style={{ flexDirection: "row" }}>
            <AppMaskText
              value={valorMensal}
              style={styles.valorMensal}
              precision="2"
            />
            <AppText
              style={{
                alignSelf: "flex-end",
                bottom: 2,
                fontWeight: "300",
                fontFamily:
                  Platform.OS === "android"
                    ? "sans-serif-light"
                    : "Helvetica Neue",
                fontSize: applyDinamicWidth(16),
              }}
            >
              {"  "}
              mensais
            </AppText>
          </View>
        </View>
        <View
          style={{
            flex: 0.25,
            paddingVertical: applyDinamicHeight(20),
            left: applyDinamicWidth(15),
          }}
        >
          <TouchableOpacity style={styles.button} onPress={onPressChange}>
            <MaterialCommunityIcons
              name="autorenew"
              size={applyDinamicHeight(35)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 0.45,
          flexDirection: "row",
          justifyContent: "space-around",
          marginHorizontal: applyDinamicWidth(25),
          marginTop: applyDinamicHeight(10),
        }}
      >
        <View
          style={{ alignItems: "center", marginRight: applyDinamicWidth(8) }}
        >
          <AppText style={styles.tituloPequeno}>Aporte</AppText>
          <AppMaskText value={aporte} style={styles.valorAporte} />
        </View>
        <View style={{ alignItems: "center" }}>
          <AppText style={styles.tituloPequeno}>Anos de contribuição</AppText>
          <AppText style={styles.valorSub}>{anos} anos</AppText>
        </View>
        <View style={{ alignItems: "center" }}>
          <AppText style={styles.tituloPequeno}>Taxa de Juros</AppText>
          <AppText style={styles.valorSub}>{juros}%</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: applyDinamicHeight(50),
    height: applyDinamicHeight(50),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "90deg" }],
  },
  container: {
    alignSelf: "center",
    backgroundColor: colors.backgroundCard,
    borderRadius: 35,
    marginTop: applyDinamicHeight(14),
    width: "85%",
    height: applyDinamicHeight(160),
  },
  tituloGrande: {
    paddingHorizontal: applyDinamicHeight(40),
    paddingTop: applyDinamicHeight(15),
    paddingBottom: applyDinamicHeight(8),
    fontSize: applyDinamicWidth(17),
    fontWeight: "200",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
  },
  tituloPequeno: {
    fontWeight: "200",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    fontSize: applyDinamicHeight(13),
  },
  valorMensal: {
    paddingLeft: applyDinamicWidth(40),
    fontSize: applyDinamicHeight(28),
    fontWeight: "700",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    color: colors.dark,
  },
  valorAporte: {
    color: colors.primary,
    fontSize: applyDinamicWidth(18),
    alignSelf: "center",
    top: applyDinamicHeight(5),
    fontSize: applyDinamicWidth(15),
  },
  valorSub: {
    alignSelf: "center",
    top: applyDinamicHeight(5),
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(15),
  },
});
export default CardPlanodeAposentadoria;
