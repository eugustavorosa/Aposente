import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

import AppText from "../components/AppText";
import CaixaSelected from "../components/setup/CaixaSelected";
import CaixaUnselected from "../components/setup/CaixaUnselected";
import UndoneButton from "../components/setup/UndoneButton";
import DoneButton from "../components/setup/DoneButton";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";

function GastosMensaisSelect({ navigation }) {
  const [faculdadeCheck, setFaculdadeCheck] = useState(false);
  const [aluguelCheck, setAluguelCheck] = useState(false);
  const [aguaCheck, setAguaCheck] = useState(false);
  const [luzCheck, setLuzCheck] = useState(false);
  const [academiaCheck, setAcademiaCheck] = useState(false);
  const [celularCheck, setCelularCheck] = useState(false);
  const [limpezaCheck, setLimpezaCheck] = useState(false);
  const [internetCheck, setInternetCheck] = useState(false);

  return (
    <View style={styles.tela}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={35}
          color={colors.medium}
          style={styles.back}
        />
      </TouchableOpacity>
      <AppText style={styles.titulo}>Registre aqui seus </AppText>
      <AppText style={styles.tituloPrimary}>gastos mensais </AppText>
      <AppText style={styles.subTitulo}>
        Registre aqui seus gastos mensais e veja quanto sobra cada mês.
      </AppText>
      <ScrollView>
        {faculdadeCheck ? (
          <CaixaSelected
            titulo="Faculdade"
            onPress={() => setFaculdadeCheck(false)}
          />
        ) : (
          <CaixaUnselected
            titulo="Faculdade"
            onPress={() => setFaculdadeCheck(true)}
          />
        )}
        {aluguelCheck ? (
          <CaixaSelected
            titulo="Aluguel"
            onPress={() => setAluguelCheck(false)}
          />
        ) : (
          <CaixaUnselected
            titulo="Aluguel"
            onPress={() => setAluguelCheck(true)}
          />
        )}
        {aguaCheck ? (
          <CaixaSelected titulo="Água" onPress={() => setAguaCheck(false)} />
        ) : (
          <CaixaUnselected titulo="Água" onPress={() => setAguaCheck(true)} />
        )}
        {luzCheck ? (
          <CaixaSelected titulo="Luz" onPress={() => setLuzCheck(false)} />
        ) : (
          <CaixaUnselected titulo="Luz" onPress={() => setLuzCheck(true)} />
        )}
        {academiaCheck ? (
          <CaixaSelected
            titulo="Academia"
            onPress={() => setAcademiaCheck(false)}
          />
        ) : (
          <CaixaUnselected
            titulo="Academia"
            onPress={() => setAcademiaCheck(true)}
          />
        )}
        {celularCheck ? (
          <CaixaSelected
            titulo="Celular"
            onPress={() => setCelularCheck(false)}
          />
        ) : (
          <CaixaUnselected
            titulo="Celular"
            onPress={() => setCelularCheck(true)}
          />
        )}
        {limpezaCheck ? (
          <CaixaSelected
            titulo="Limpeza"
            onPress={() => setLimpezaCheck(false)}
          />
        ) : (
          <CaixaUnselected
            titulo="Limpeza"
            onPress={() => setLimpezaCheck(true)}
          />
        )}
        {internetCheck ? (
          <CaixaSelected
            titulo="Internet"
            onPress={() => setInternetCheck(false)}
          />
        ) : (
          <CaixaUnselected
            titulo="Internet"
            onPress={() => setInternetCheck(true)}
          />
        )}
      </ScrollView>
      {faculdadeCheck ||
      aluguelCheck ||
      aguaCheck ||
      luzCheck ||
      academiaCheck ||
      celularCheck ||
      limpezaCheck ||
      internetCheck ? (
        <DoneButton
          titulo="Avançar"
          onPress={() => {
            navigation.navigate("GastosMensaisInput", {
              faculdadeCheck,
              aluguelCheck,
              aguaCheck,
              luzCheck,
              academiaCheck,
              celularCheck,
              limpezaCheck,
              internetCheck,
            });
          }}
        />
      ) : (
        <UndoneButton titulo="Selecione seus gastos" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    marginLeft: applyDinamicWidth(10),
    marginTop: applyDinamicHeight(50),
  },
  tela: {
    backgroundColor: colors.backgroundCard,
    flex: 1,
  },
  titulo: {
    fontSize: applyDinamicWidth(30),
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    color: colors.dark,
    marginLeft: applyDinamicWidth(20),
    marginTop: applyDinamicHeight(30),
  },
  tituloPrimary: {
    fontSize: applyDinamicWidth(30),
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    color: colors.primary,
    marginLeft: applyDinamicWidth(20),
  },
  subTitulo: {
    color: colors.medium,
    fontSize: applyDinamicWidth(16),
    marginLeft: applyDinamicWidth(20),
    marginTop: applyDinamicHeight(10),
    marginBottom: applyDinamicHeight(40),
    marginRight: applyDinamicWidth(15),
  },
});

export default GastosMensaisSelect;
