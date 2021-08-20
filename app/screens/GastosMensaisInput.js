import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";

import colors from "../config/colors";
import { useTransações } from "../components/context/contextProvider";

import AppText from "../components/AppText";
import UndoneButton from "../components/setup/UndoneButton";
import DoneButton from "../components/setup/DoneButton";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";

function GastosMensaisInput({ route, navigation }) {
  const {
    setGastosCheck,
    facudadeValor,
    setFaculdadeValor,
    aluguelValor,
    setAluguelValor,
    aguaValor,
    setAguaValor,
    luzValor,
    setLuzValor,
    academiaValor,
    setAcademiaValor,
    celularValor,
    setCelularValor,
    limpezaValor,
    setLimpezaValor,
    internetValor,
    setInternetValor,
  } = useTransações();

  const {
    faculdadeCheck,
    aluguelCheck,
    aguaCheck,
    luzCheck,
    academiaCheck,
    celularCheck,
    limpezaCheck,
    internetCheck,
  } = route.params;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        <AppText style={styles.titulo}>Registre o valor dos seus </AppText>
        <AppText style={styles.tituloPrimary}>gastos mensais </AppText>
        <AppText style={styles.subTitulo}>
          Registre aqui seus gastos mensais e veja quanto sobra cada mês.
        </AppText>
        <ScrollView>
          {faculdadeCheck ? (
            <View style={{ marginLeft: applyDinamicWidth(20) }}>
              <AppText style={styles.tituloInput}>Faculdade</AppText>
              <View style={styles.inputView}>
                <AppText style={styles.prefixo}>R$ </AppText>
                <CurrencyInput
                  value={facudadeValor}
                  onChangeValue={setFaculdadeValor}
                  delimiter="."
                  separator=","
                  precision={2}
                  style={styles.valorInput}
                  placeholder="0,00"
                  placeholderTextColor={colors.mediumMaisLightAinda}
                />
              </View>
            </View>
          ) : null}
          {aluguelCheck ? (
            <View style={{ marginLeft: 20 }}>
              <AppText style={styles.tituloInput}>Aluguel</AppText>
              <View style={styles.inputView}>
                <AppText style={styles.prefixo}>R$ </AppText>
                <CurrencyInput
                  value={aluguelValor}
                  onChangeValue={setAluguelValor}
                  delimiter="."
                  separator=","
                  precision={2}
                  style={styles.valorInput}
                  placeholder="0,00"
                  placeholderTextColor={colors.mediumMaisLightAinda}
                />
              </View>
            </View>
          ) : null}
          {aguaCheck ? (
            <View style={{ marginLeft: 20 }}>
              <AppText style={styles.tituloInput}>Água</AppText>
              <View style={styles.inputView}>
                <AppText style={styles.prefixo}>R$ </AppText>
                <CurrencyInput
                  value={aguaValor}
                  onChangeValue={setAguaValor}
                  delimiter="."
                  separator=","
                  precision={2}
                  style={styles.valorInput}
                  placeholder="0,00"
                  placeholderTextColor={colors.mediumMaisLightAinda}
                />
              </View>
            </View>
          ) : null}
          {luzCheck ? (
            <View style={{ marginLeft: 20 }}>
              <AppText style={styles.tituloInput}>Luz</AppText>
              <View style={styles.inputView}>
                <AppText style={styles.prefixo}>R$ </AppText>
                <CurrencyInput
                  value={luzValor}
                  onChangeValue={setLuzValor}
                  delimiter="."
                  separator=","
                  precision={2}
                  style={styles.valorInput}
                  placeholder="0,00"
                  placeholderTextColor={colors.mediumMaisLightAinda}
                />
              </View>
            </View>
          ) : null}
          {academiaCheck ? (
            <View style={{ marginLeft: 20 }}>
              <AppText style={styles.tituloInput}>Academia</AppText>
              <View style={styles.inputView}>
                <AppText style={styles.prefixo}>R$ </AppText>
                <CurrencyInput
                  value={academiaValor}
                  onChangeValue={setAcademiaValor}
                  delimiter="."
                  separator=","
                  precision={2}
                  style={styles.valorInput}
                  placeholder="0,00"
                  placeholderTextColor={colors.mediumMaisLightAinda}
                />
              </View>
            </View>
          ) : null}
          {celularCheck ? (
            <View style={{ marginLeft: 20 }}>
              <AppText style={styles.tituloInput}>Celular</AppText>
              <View style={styles.inputView}>
                <AppText style={styles.prefixo}>R$ </AppText>
                <CurrencyInput
                  value={celularValor}
                  onChangeValue={setCelularValor}
                  delimiter="."
                  separator=","
                  precision={2}
                  style={styles.valorInput}
                  placeholder="0,00"
                  placeholderTextColor={colors.mediumMaisLightAinda}
                />
              </View>
            </View>
          ) : null}
          {limpezaCheck ? (
            <View style={{ marginLeft: 20 }}>
              <AppText style={styles.tituloInput}>Limpeza</AppText>
              <View style={styles.inputView}>
                <AppText style={styles.prefixo}>R$ </AppText>
                <CurrencyInput
                  value={limpezaValor}
                  onChangeValue={setLimpezaValor}
                  delimiter="."
                  separator=","
                  precision={2}
                  style={styles.valorInput}
                  placeholder="0,00"
                  placeholderTextColor={colors.mediumMaisLightAinda}
                />
              </View>
            </View>
          ) : null}
          {internetCheck ? (
            <View style={{ marginLeft: 20 }}>
              <AppText style={styles.tituloInput}>Internet</AppText>
              <View style={styles.inputView}>
                <AppText style={styles.prefixo}>R$ </AppText>
                <CurrencyInput
                  value={internetValor}
                  onChangeValue={setInternetValor}
                  delimiter="."
                  separator=","
                  precision={2}
                  style={styles.valorInput}
                  placeholder="0,00"
                  placeholderTextColor={colors.mediumMaisLightAinda}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
        {facudadeValor ||
        aluguelValor ||
        aguaValor ||
        luzValor ||
        academiaValor ||
        celularValor ||
        limpezaValor ||
        internetValor ? (
          <DoneButton
            titulo="Avançar"
            onPress={() => {
              setGastosCheck(true);
              navigation.navigate("SetupScreen");
            }}
          />
        ) : (
          <UndoneButton titulo="Preencha para continuar" />
        )}
      </View>
    </TouchableWithoutFeedback>
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
  tituloInput: {
    color: colors.medium,
    fontSize: applyDinamicWidth(17),
    marginBottom: applyDinamicHeight(8),
    marginLeft: applyDinamicHeight(2),
  },
  valorInput: {
    flex: 1,
    fontSize: applyDinamicWidth(18),
  },
  inputView: {
    width: "95%",
    aspectRatio: 10 / 1.4,
    borderWidth: 1.5,
    borderColor: colors.mediumMaisLightAinda,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: applyDinamicHeight(15),
  },
  prefixo: {
    alignSelf: "center",
    marginLeft: applyDinamicWidth(10),
    color: colors.mediumLight,
  },
});

export default GastosMensaisInput;
