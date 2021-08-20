import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";

import colors from "../config/colors";
import { useTransações } from "../components/context/contextProvider";

import Tela from "../components/Tela";
import AppText from "../components/AppText";
import OkButton from "../components/OkButton";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

function RendaMensal({ navigation }) {
  const { setRendaCheck, rendaMensal, setRendaMensal } = useTransações();

  return (
    <Tela backgroundColor={colors.backgroundCard}>
      <View>
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
        <AppText style={styles.titulo}>Registre aqui sua </AppText>
        <AppText style={styles.tituloPrimary}>renda mensal </AppText>
        <AppText style={styles.subTitulo}>
          Ter controle da sua receita mensal vai permitir projeções melhores.
        </AppText>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <AppText style={styles.prefix}>R$</AppText>
          <CurrencyInput
            value={rendaMensal}
            onChangeValue={setRendaMensal}
            delimiter="."
            separator=","
            precision={2}
            style={styles.rendaMensal}
            placeholder="0,00"
            placeholderTextColor={colors.dark}
          />
        </View>
        <View style={{ marginTop: 100 }}>
          <OkButton
            onPress={() => {
              setRendaCheck(true);
              navigation.navigate("SetupScreen");
            }}
          />
        </View>
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  back: {
    marginLeft: applyDinamicWidth(10),
  },
  prefix: {
    color: colors.medium,
    alignSelf: "center",
    marginTop: applyDinamicHeight(52),
    marginRight: applyDinamicWidth(10),
  },
  rendaMensal: {
    fontSize: applyDinamicWidth(40),
    fontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica Neue",
    alignSelf: "center",
    marginTop: applyDinamicHeight(40),
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
  },
});

export default RendaMensal;
