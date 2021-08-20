import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { useTransações } from "../components/context/contextProvider";

import { AppForm, AppFormField } from "../components/forms";
import AppText from "../components/AppText";
import DoneButton from "../components/setup/DoneButton";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";

Yup.setLocale({
  mixed: {
    default: "Não é válido",
    required: "É necessário informar ${label}",
  },
  number: {
    min: "Deve ser maior que ${min}",
    max: "Deve ser menor que ${max}",
    required: "É necessário informar",
  },
});

const validationSchema = Yup.object().shape({
  patrimonioInicial: Yup.number().required().label("Patrimonio Inicial"),
  taxaJurosAnual: Yup.number().required().min(1).max(40).label("Taxa de Juros"),
  anos: Yup.number().required().min(1).max(99).label("Anos de contribuição"),
  aporteMensal: Yup.number().required().min(50).label("Aporte Mensal"),
});

function TelaSetupPlano({ route }) {
  const { setShowButton } = useTransações();

  const ref = useRef(null);

  const navigation = useNavigation();

  const isEdit = route.params.isEdit;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.tela}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            isEdit ? setShowButton(true) : null;
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={35}
            color={colors.medium}
            style={styles.back}
          />
        </TouchableOpacity>
        <AppText style={styles.titulo}>Monte a seguir o seu </AppText>
        <AppText style={styles.tituloPrimary}>plano de aposentadoria </AppText>
        <AppText style={styles.subTitulo}>
          Projete o quanto você pode poupar mensalmente com objetivo de formar
          sua aposentadoria, o cálculo feito aqui é de juros compostos.
        </AppText>
        <ScrollView>
          <AppForm
            innerRef={ref}
            initialValues={{
              patrimonioInicial: 0,
              taxaJurosAnual: 10,
              anos: 30,
              aporteMensal: 100,
            }}
            validationSchema={validationSchema}
          >
            <View
              style={{
                marginLeft: applyDinamicWidth(20),
                marginBottom: applyDinamicHeight(30),
              }}
            >
              <AppText style={styles.tituloInput}>Patrimônio Atual</AppText>
              <AppFormField
                name="patrimonioInicial"
                placeholder="0"
                prefixo={"R$ "}
                width="60%"
                aspectRatio={10 / 2.15}
                backgroundColor={colors.backgroundCard}
                borderWidth={1.5}
                borderColor={colors.mediumMaisLightAinda}
                borderRadius={10}
              />
            </View>
            <View
              style={{ marginLeft: applyDinamicWidth(20), marginBottom: 30 }}
            >
              <AppText style={styles.tituloInput}>Aporte mensal</AppText>
              <AppFormField
                name="aporteMensal"
                placeholder="100"
                prefixo={"R$ "}
                width="60%"
                backgroundColor={colors.backgroundCard}
                borderWidth={1.5}
                borderColor={colors.mediumMaisLightAinda}
                borderRadius={10}
                height={applyDinamicWidth(50)}
              />
            </View>
            <View
              style={{ marginLeft: applyDinamicWidth(20), marginBottom: 30 }}
            >
              <AppText style={styles.tituloInput}>Anos de contribuição</AppText>
              <AppFormField
                name="anos"
                placeholder="30 anos"
                width="40%"
                maxLength={2}
                backgroundColor={colors.backgroundCard}
                borderWidth={1.5}
                borderColor={colors.mediumMaisLightAinda}
                borderRadius={10}
                height={applyDinamicWidth(50)}
              />
            </View>
            <View
              style={{ marginLeft: applyDinamicWidth(20), marginBottom: 30 }}
            >
              <AppText style={styles.tituloInput}>Taxa de Juros Anual</AppText>
              <AppFormField
                name="taxaJurosAnual"
                placeholder="10"
                width="25%"
                sufixo="%"
                maxLength={2}
                backgroundColor={colors.backgroundCard}
                borderWidth={1.5}
                borderColor={colors.mediumMaisLightAinda}
                borderRadius={10}
                height={applyDinamicWidth(50)}
              />
            </View>
          </AppForm>
        </ScrollView>
        <DoneButton
          titulo="VER RESULTADOS DESTE PLANO"
          bottom={applyDinamicHeight(30)}
          onPress={() =>
            navigation.navigate("TelaResultadoPlano", {
              taxaJurosMensal:
                Math.pow(1 + ref.current.values.taxaJurosAnual / 100, 1 / 12) -
                1,
              meses: ref.current.values.anos * 12,
              aporteMensal: ref.current.values.aporteMensal,
              patrimonioInicial: ref.current.values.patrimonioInicial,
              taxaJurosAnual: ref.current.values.taxaJurosAnual,
              isEdit: isEdit,
            })
          }
        />
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
    fontSize: applyDinamicWidth(15),
    marginLeft: applyDinamicWidth(20),
    marginTop: applyDinamicHeight(10),
    marginBottom: applyDinamicHeight(40),
    marginRight: applyDinamicWidth(35),
  },
  tituloInput: {
    color: colors.dark,
    fontSize: applyDinamicWidth(17),
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    marginBottom: applyDinamicHeight(8),
    marginLeft: applyDinamicWidth(2),
  },
});

export default TelaSetupPlano;
