import React from "react";
import { View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../../config/colors";

import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function TransaçõesVazias(props) {
  return (
    <View style={styles.container}>
      <AppText style={styles.titulo}>Nenhuma transação neste mês</AppText>
      <View style={{ flexDirection: "row" }}>
        <AppText style={styles.subTitulo}>Adicione uma no botão </AppText>
        <Entypo
          name="circle-with-plus"
          size={applyDinamicWidth(24)}
          color={colors.medium}
          style={{ justifyContent: "center", bottom: 3 }}
        />
        <AppText style={styles.subTitulo}> abaixo</AppText>
      </View>
      <Entypo
        name="arrow-long-down"
        size={100}
        color={colors.medium}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: applyDinamicHeight(250),
  },
  titulo: {
    fontSize: applyDinamicWidth(20),
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    marginBottom: applyDinamicHeight(14),
    color: colors.dark,
  },
  subTitulo: {
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    color: colors.medium,
    fontSize: applyDinamicWidth(15),
  },
  icon: {
    marginTop: applyDinamicHeight(30),
  },
});

export default TransaçõesVazias;
