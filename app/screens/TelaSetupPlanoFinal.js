import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { useTransações } from "../components/context/contextProvider";
import * as firebase from "firebase";

import turnToMensal from "../components/valores/TurnToMensal";
import AppText from "../components/AppText";
import DoneButton from "../components/setup/DoneButton";
import AppMaskText from "../components/AppMaskText";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";

function TelaSetupPlanoFinal({ route }) {
  ////////////////////////////////////// TESTE PRO FRONT END
  const navigation = useNavigation();

  const patrimonioFinal =
    route.params.patrimonioInicial *
      Math.pow(1 + route.params.taxaJurosMensal, route.params.meses) +
    (route.params.aporteMensal / route.params.taxaJurosMensal) *
      (Math.pow(1 + route.params.taxaJurosMensal, route.params.meses) - 1);

  const totalInvestido =
    route.params.aporteMensal * route.params.meses +
    route.params.patrimonioInicial * 1;

  const isEdit = route.params.isEdit;

  const {
    setTransações,
    setAporteMensal,
    setMesesContribuição,
    setTaxaJurosAnual,
    setRendaPassiva,
    setInvestimentoInicial,
    setPatrimonioFinal,
    setShowButton,
    //////////////////////////////////////////////////////////// SETUP SCREEN
    rendaMensal,
    facudadeValor,
    aluguelValor,
    aguaValor,
    luzValor,
    academiaValor,
    celularValor,
    limpezaValor,
    internetValor,
  } = useTransações();

  const handleOnSubmitPlano = () => {
    setAporteMensal(route.params.aporteMensal);
    setMesesContribuição(route.params.meses);
    setTaxaJurosAnual(route.params.taxaJurosAnual);
    setInvestimentoInicial(route.params.patrimonioInicial);
    setPatrimonioFinal(patrimonioFinal);
    setRendaPassiva((patrimonioFinal * 0.06) / 12);
    if (isEdit) {
      handleOnSubmitPlanoEdit();
      navigation.navigate("Casa", { screen: "Investimentos" });
    } else {
      handleOnSubmitMensalSetup();
      navigation.navigate("Casa", { screen: "Home" });
    }
    setShowButton(true);
  };

  const handleOnSubmitPlanoEdit = () => {
    const plano = {
      id: Date.now(),
      aporteMensal: route.params.aporteMensal,
      mesesContribuição: route.params.meses,
      taxaJurosAnual: route.params.taxaJurosAnual,
      investimentoInicial: route.params.patrimonioInicial,
      patrimonioFinal: patrimonioFinal,
      rendaPassiva: (patrimonioFinal * 0.06) / 12,
    };

    firebase
      .database()
      .ref("users/" + uid)
      .update({ plano: plano });
  };

  const handleOnSubmitMensalSetup = () => {
    const plano = {
      id: Date.now(),
      aporteMensal: route.params.aporteMensal,
      mesesContribuição: route.params.meses,
      taxaJurosAnual: route.params.taxaJurosAnual,
      investimentoInicial: route.params.patrimonioInicial,
      patrimonioFinal: patrimonioFinal,
      rendaPassiva: (patrimonioFinal * 0.06) / 12,
      planoFeito: true,
    };

    const renda = {
      id: Date.now(),
      title: "Renda Mensal",
      valor: rendaMensal,
      dataTransação: new Date(),
      nameIcon: "briefcase",
      category: { label: "Salário", value: 1, name: "briefcase" },
      tipoTransação: "receita",
      isMensal: true,
    };
    const aporte = {
      id: Date.now() - 1,
      title: "Aporte",
      valor: route.params.aporteMensal,
      dataTransação: new Date(),
      nameIcon: "cash",
      category: { label: "Aporte Mensal", value: 1, name: "cash" },
      tipoTransação: "aporte",
      isMensal: false,
    };
    const faculdade = {
      id: Date.now() + 1,
      title: "Faculdade",
      valor: facudadeValor,
      dataTransação: new Date(),
      nameIcon: "school",
      category: { label: "Educação", value: 5, name: "school" },
      tipoTransação: "despesa",
      isMensal: true,
    };
    const aluguel = {
      id: Date.now() + 2,
      title: "Aluguel",
      valor: aluguelValor,
      dataTransação: new Date(),
      nameIcon: "home",
      category: { label: "Moradia", value: 9, name: "home" },
      tipoTransação: "despesa",
      isMensal: true,
    };
    const agua = {
      id: Date.now() + 3,
      title: "Agua",
      valor: aguaValor,
      dataTransação: new Date(),
      nameIcon: "water",
      category: { label: "Água", value: 17, name: "water" },
      tipoTransação: "despesa",
      isMensal: true,
    };
    const luz = {
      id: Date.now() + 4,
      title: "Luz",
      valor: luzValor,
      dataTransação: new Date(),
      nameIcon: "lightbulb",
      category: { label: "Luz", value: 18, name: "lightbulb" },
      tipoTransação: "despesa",
      isMensal: true,
    };
    const academia = {
      id: Date.now() + 5,
      title: "Academia",
      valor: academiaValor,
      dataTransação: new Date(),
      nameIcon: "weight-lifter",
      category: {
        label: "Academia",
        value: 19,
        name: "weight-lifter",
      },
      tipoTransação: "despesa",
      isMensal: true,
    };
    const celular = {
      id: Date.now() + 6,
      title: "Celular",
      valor: celularValor,
      dataTransação: new Date(),
      nameIcon: "cellphone-android",
      category: {
        label: "Celular",
        value: 20,
        name: "cellphone-android",
      },
      tipoTransação: "despesa",
      isMensal: true,
    };
    const limpeza = {
      id: Date.now() + 7,
      title: "Limpeza",
      valor: limpezaValor,
      dataTransação: new Date(),
      nameIcon: "broom",
      category: { label: "Limpeza", value: 21, name: "broom" },
      tipoTransação: "despesa",
      isMensal: true,
    };
    const internet = {
      id: Date.now() + 8,
      title: "Internet",
      valor: internetValor,
      dataTransação: new Date(),
      nameIcon: "wifi",
      category: { label: "Internet", value: 22, name: "wifi" },
      tipoTransação: "despesa",
      isMensal: true,
    };

    const updatedTransações = [];

    if (rendaMensal != 0) {
      updatedTransações.push(renda);
      updatedTransações.push(aporte);
      updatedTransações.push(...turnToMensal(renda));
    }

    if (facudadeValor != 0) {
      updatedTransações.push(faculdade);
      updatedTransações.push(...turnToMensal(faculdade));
    }

    if (aluguelValor != 0) {
      updatedTransações.push(aluguel);
      updatedTransações.push(...turnToMensal(aluguel));
    }

    if (aguaValor != 0) {
      updatedTransações.push(agua);
      updatedTransações.push(...turnToMensal(agua));
    }

    if (luzValor != 0) {
      updatedTransações.push(luz);
      updatedTransações.push(...turnToMensal(luz));
    }
    if (academiaValor != 0) {
      updatedTransações.push(academia);
      updatedTransações.push(...turnToMensal(academia));
    }
    if (celularValor != 0) {
      updatedTransações.push(celular);
      updatedTransações.push(...turnToMensal(celular));
    }
    if (limpezaValor != 0) {
      updatedTransações.push(limpeza);
      updatedTransações.push(...turnToMensal(limpeza));
    }
    if (internetValor != 0) {
      updatedTransações.push(internet);
      updatedTransações.push(...turnToMensal(internet));
    }
    setTransações(updatedTransações.flat(Infinity));
    firebase
      .database()
      .ref("users/" + uid)
      .update({ transações: JSON.stringify(updatedTransações), plano: plano });
  };

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
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
        <AppText style={styles.titulo}>Monte a seguir o seu </AppText>
        <AppText style={styles.tituloPrimary}>plano de aposentadoria </AppText>
        <AppText style={styles.subTitulo}>
          Projete o quanto você pode poupar mensalmente com objetivo de formar
          sua aposentadoria, o cálculo feito aqui é de juros compostos.
        </AppText>
        <ScrollView>
          <View
            style={{
              backgroundColor: colors.white,
              width: "85%",
              aspectRatio: 10 / 7.5,
              alignSelf: "center",
              marginTop: applyDinamicHeight(10),
              borderRadius: 15,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <AppText
              style={[
                styles.tituloCard,
                { alignSelf: "center", marginTop: applyDinamicHeight(25) },
              ]}
            >
              Seu patrimônio será de:
            </AppText>
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                marginTop: applyDinamicHeight(5),
              }}
            >
              <AppText style={styles.prefixoPatrimonio}>R$ </AppText>
              <AppMaskText
                value={patrimonioFinal}
                style={styles.valorPatrimonio}
                precision={2}
                unit=""
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: applyDinamicWidth(25),
                marginTop: applyDinamicHeight(45),
              }}
            >
              <AppText
                style={[
                  styles.tituloCard,
                  {
                    fontSize: applyDinamicWidth(16),
                    marginRight: applyDinamicWidth(90),
                    width: applyDinamicWidth(110),
                  },
                ]}
              >
                Total Investido
              </AppText>
              <AppText
                style={[
                  styles.prefixoPatrimonio,
                  { fontSize: applyDinamicWidth(17) },
                ]}
              >
                R${" "}
              </AppText>
              <AppMaskText
                value={totalInvestido}
                style={styles.valorSubtitulo}
                precision={2}
                unit=""
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: applyDinamicWidth(15),
                marginTop: applyDinamicHeight(15),
              }}
            >
              <AppText
                style={[
                  styles.tituloCard,
                  {
                    fontSize: applyDinamicWidth(16),
                    width: applyDinamicWidth(110),
                    textAlign: "center",
                    marginRight: "30%",
                  },
                ]}
              >
                Total ganho com juros
              </AppText>
              <AppText
                style={[
                  styles.prefixoPatrimonio,
                  { fontSize: applyDinamicWidth(17) },
                ]}
              >
                R${" "}
              </AppText>
              <AppMaskText
                value={patrimonioFinal - totalInvestido}
                style={styles.valorSubtitulo}
                precision={2}
                unit=""
              />
            </View>
            <View
              style={{
                width: "90%",
                height: applyDinamicHeight(1),
                backgroundColor: colors.mediumLight,
                alignSelf: "center",
                marginTop: applyDinamicHeight(15),
              }}
            />
            <View
              style={{
                flexDirection: "row",
                marginLeft: applyDinamicWidth(15),
                marginTop: applyDinamicHeight(15),
              }}
            >
              <AppText
                style={[
                  styles.tituloCard,
                  {
                    fontSize: applyDinamicWidth(16),
                    width: applyDinamicWidth(110),
                    textAlign: "center",
                    marginRight: "30%",
                  },
                ]}
              >
                Total
              </AppText>
              <AppText
                style={[
                  styles.prefixoPatrimonio,
                  { fontSize: applyDinamicWidth(17) },
                ]}
              >
                R${" "}
              </AppText>
              <AppMaskText
                value={patrimonioFinal}
                style={styles.valorSubtitulo}
                precision={2}
                unit=""
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View
              style={{
                backgroundColor: colors.white,
                width: "85%",
                aspectRatio: 10 / 4,
                //height: applyDinamicHeight(140),
                alignSelf: "center",
                marginTop: applyDinamicHeight(30),
                marginBottom: applyDinamicHeight(50),
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <MaterialCommunityIcons
                name="information"
                size={36}
                color={colors.dark}
                style={styles.info}
              />
              <AppText
                style={[
                  styles.tituloCard,
                  {
                    alignSelf: "center",
                    marginTop: applyDinamicHeight(30),
                    fontSize: applyDinamicWidth(18),
                  },
                ]}
              >
                Em ativos de renda passiva rende:
              </AppText>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: applyDinamicWidth(70),
                  marginTop: applyDinamicHeight(20),
                  left: applyDinamicWidth(-14),
                }}
              >
                <AppText
                  style={[
                    styles.prefixoPatrimonio,
                    {
                      fontSize: applyDinamicWidth(30),
                      alignSelf: "center",
                      marginTop: applyDinamicHeight(2),
                    },
                  ]}
                >
                  R${" "}
                </AppText>
                <AppMaskText
                  value={(patrimonioFinal * 0.065) / 12}
                  style={{
                    fontSize: applyDinamicWidth(30),
                    color: colors.dark,
                    fontWeight: "500",
                    fontFamily:
                      Platform.OS === "android"
                        ? "sans-serif-medium"
                        : "Helvetica Neue",
                    alignSelf: "center",
                  }}
                  precision={2}
                  unit=""
                />
                <AppText
                  style={{
                    alignSelf: "flex-end",
                    color: colors.primary,
                    fontSize: applyDinamicWidth(22),
                    fontWeight: "500",
                    fontFamily:
                      Platform.OS === "android"
                        ? "sans-serif-medium"
                        : "Helvetica Neue",
                    marginBottom: applyDinamicHeight(2),
                  }}
                >
                  {"  "}
                  mensal
                </AppText>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={{ flex: 1 }} />
        <DoneButton
          titulo="UTILIZAR ESSE PLANO"
          bottom={applyDinamicHeight(30)}
          onPress={handleOnSubmitPlano}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AppText style={styles.modalTitulo}>
              Como chegamos nesse número?
            </AppText>
            <AppText style={styles.modalSubTitulo}>
              O cálculo foi feito a partir da média de Dividend Yield de Fundos
              Imobiliários, cerca de 6,5% ao ano.
            </AppText>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: colors.primary }}
              onPress={() => {
                setModalVisible(!isModalVisible);
              }}
            >
              <Text style={styles.textStyle}>Beleza!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  back: {
    marginLeft: applyDinamicWidth(10),
    marginTop: applyDinamicHeight(50),
  },
  info: {
    position: "absolute",
    alignSelf: "flex-end",
    right: -10,
    top: -10,
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
  tituloCard: {
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
  },
  prefixoPatrimonio: {
    fontSize: applyDinamicWidth(20),
    color: colors.medium,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
  valorPatrimonio: {
    fontSize: applyDinamicWidth(20),
    color: colors.dark,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
  valorSubtitulo: {
    fontSize: applyDinamicWidth(17),
    color: colors.dark,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
  ////////////////////////////////////
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: applyDinamicHeight(22),
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: Platform.OS === "android" ? 13 : 14,
  },
  modalTitulo: {
    textAlign: "center",
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    marginBottom: 8,
  },
  modalSubTitulo: {
    textAlign: "center",
    fontSize: Platform.OS === "android" ? 15 : 17,
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    marginBottom: 15,
  },
});

export default TelaSetupPlanoFinal;
