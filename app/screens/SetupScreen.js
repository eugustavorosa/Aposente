import React from "react";
import { View, StyleSheet, Image, ScrollView, Platform } from "react-native";

import { useTransações } from "../components/context/TransaçãoProvider";

import * as firebase from "firebase";

import colors from "../config/colors";

import AppText from "../components/AppText";
import CardSelected from "../components/setup/CardSelected";
import CardUnselected from "../components/setup/CardUnselected";
import CardDone from "../components/setup/CardDone";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";

function SetupScreen({ navigation }) {
  var user = firebase.auth().currentUser;

  if (user != null) {
    email = user.email;
    uid = user.uid;
  }

  const { rendaCheck, gastosCheck } = useTransações();

  return (
    <View style={styles.tela}>
      <Image
        style={styles.icon}
        source={require("../assets/iconSombreado.png")}
      />
      <AppText style={styles.titulo}>
        Planeje aqui suas finanças pessoais!
      </AppText>
      <AppText style={styles.subTitulo}>
        Os seguintes passos te darão panorama geral das suas contas e te ajudará
        a tomar decisões e projetar seu futuro
      </AppText>

      <ScrollView>
        {rendaCheck ? (
          <CardDone
            titulo="Renda mensal"
            subTitulo="Ter controle da sua receita mensal vai permitir projeções melhores."
          />
        ) : (
          <CardSelected
            titulo="Renda mensal"
            subTitulo="Ter controle da sua receita mensal vai permitir projeções melhores."
            onPress={() => {
              // mandarEmailNome();
              navigation.navigate("RendaMensal");
            }}
          />
        )}
        {rendaCheck === false ? (
          <CardUnselected
            titulo="Gastos mensais"
            subTitulo="Registre aqui seus gastos mensais e veja quanto sobra cada mês."
          />
        ) : null}
        {rendaCheck && gastosCheck === false ? (
          <CardSelected
            titulo="Gastos mensais"
            subTitulo="Registre aqui seus gastos mensais e veja quanto sobra cada mês."
            onPress={() => {
              navigation.navigate("GastosMensaisSelect");
            }}
          />
        ) : null}
        {rendaCheck && gastosCheck ? (
          <CardDone
            titulo="Gastos mensais"
            subTitulo="Registre aqui seus gastos mensais e veja quanto sobra cada mês."
          />
        ) : null}
        {rendaCheck && gastosCheck ? (
          <CardSelected
            titulo="Plano de aposentadoria"
            subTitulo="Projete o quanto você pode poupar mensalmente com objetivo de formar sua aposentadoria."
            onPress={() => {
              navigation.navigate("TelaPlanoInicial", { isEdit: false });
            }}
          />
        ) : (
          <CardUnselected
            titulo="Plano de aposentadoria"
            subTitulo="Projete o quanto você pode poupar mensalmente com objetivo de formar sua aposentadoria."
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    backgroundColor: colors.backgroundCard,
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: applyDinamicHeight(26),
    fontWeight: "700",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    width: applyDinamicWidth(250),
    alignSelf: "center",
    marginTop: applyDinamicHeight(15),
  },
  subTitulo: {
    color: colors.medium,
    alignSelf: "center",
    textAlign: "center",
    width: applyDinamicWidth(300),
    marginTop: applyDinamicHeight(20),
    fontSize: applyDinamicWidth(14),
    fontWeight: "400",
    marginBottom: applyDinamicHeight(60),
  },
  icon: {
    width: applyDinamicWidth(80),
    height: applyDinamicWidth(80),
    alignSelf: "center",
    marginTop: applyDinamicHeight(100),
  },
});

export default SetupScreen;
