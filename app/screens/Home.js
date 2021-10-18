import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { format, isSameMonth, parseISO } from "date-fns";
import subMonths from "date-fns/subMonths";
import { ptBR } from "date-fns/locale";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as firebase from "firebase";
import { useTransações } from "../components/context/contextProvider";
import colors from "../config/colors";

import AppMaskText from "../components/AppMaskText";
import AppText from "../components/AppText";
import Tela from "../components/Tela";
import valor from "../components/valores/valor";
import sum from "../components/valores/sum";
import Loading from "../components/Loading";
import CardBalançoHome from "../components/home/CardBalançoHome";
import CardProgressoHome from "../components/home/CardProgressoHome";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";
import applyDinamicSize from "../components/valores/applyDinamicSize";
import applyInverseWidth from "../components/valores/applyInverseWidth";

function Home(props) {
  //////////////////////////////////////////////////////////////////// getting user name

  var user = firebase.auth().currentUser;

  if (user != null) {
    email = user.email;
    uid = user.uid;
  }

  const [nome, setNome] = useState("Usuário");

  const findNome = () => {
    firebase
      .database()
      .ref("users/" + uid)
      .on("value", (snapshot) => {
        const userName = snapshot.val().userName;
        if (userName !== null) setNome(userName);
      });
  };

  useEffect(() => {
    findNome();
    findPlano();
  }, []);

  //////////////////////// get from FIREBASE

  const findPlano = () => {
    firebase
      .database()
      .ref("users/" + uid)
      .on("value", (snapshot) => {
        const aporte = snapshot.val().plano.aporteMensal;
        const investimentoInicial = snapshot.val().plano.investimentoInicial;
        const mesesContribuição = snapshot.val().plano.mesesContribuição;
        const taxaJurosAnual = snapshot.val().plano.taxaJurosAnual;
        const patrimonioFinal = snapshot.val().plano.patrimonioFinal;
        const rendaPassiva = snapshot.val().plano.rendaPassiva;

        setAporteMensal(aporte);
        setMesesContribuição(mesesContribuição);
        setTaxaJurosAnual(taxaJurosAnual);
        setInvestimentoInicial(investimentoInicial);
        setPatrimonioFinal(patrimonioFinal);
        setRendaPassiva((patrimonioFinal * 0.06) / 12);

        setLoading(false);
      });
  };

  ///////////////////////////////////////////////////////////////////

  const [loading, setLoading] = useState(true);

  const {
    transações,
    patrimonio,
    setAporteMensal,
    setMesesContribuição,
    setTaxaJurosAnual,
    setInvestimentoInicial,
    setPatrimonioFinal,
    setRendaPassiva,
  } = useTransações();

  const [budgetSelected, setBudgetSelected] = useState(true);

  ////////////////// mensal

  const valorReceitaMensal = transações
    .filter((item) => item.tipoTransação.includes("receita"))
    .filter((item) => isSameMonth(parseISO(item.dataTransação), new Date()))
    .map(valor)
    .reduce(sum, 0);
  const valorDespesaMensal = transações
    .filter((item) => item.tipoTransação.includes("despesa"))
    .filter((item) => isSameMonth(parseISO(item.dataTransação), new Date()))
    .map(valor)
    .reduce(sum, 0);
  const valorAporteMensal = transações
    .filter((item) => item.tipoTransação.includes("aporte"))
    .filter((item) => isSameMonth(parseISO(item.dataTransação), new Date()))
    .map(valor)
    .reduce(sum, 0);

  const saldoMensal =
    valorReceitaMensal - (valorDespesaMensal + valorAporteMensal);

  //////////////// total

  const valorReceitaTotal = transações
    .filter((item) => item.tipoTransação.includes("receita"))
    .filter((item) => parseISO(item.dataTransação))
    .map(valor)
    .reduce(sum, 0);
  const valorDespesaTotal = transações
    .filter((item) => item.tipoTransação.includes("despesa"))
    .filter((item) => parseISO(item.dataTransação))
    .map(valor)
    .reduce(sum, 0);
  const valorAporteTotal = transações
    .filter((item) => item.tipoTransação.includes("aporte"))
    .filter((item) => parseISO(item.dataTransação))
    .map(valor)
    .reduce(sum, 0);

  const saldoTotal = valorReceitaTotal - (valorDespesaTotal + valorAporteTotal);

  let porcentagemAporteAtual =
    valorAporteMensal /
    (valorAporteMensal + valorDespesaMensal + valorReceitaMensal);
  if (valorAporteMensal + valorDespesaMensal + valorReceitaMensal === 0) {
    porcentagemAporteAtual = 0.1;
  }
  let porcentagemDespesaAtual =
    valorDespesaMensal /
    (valorAporteMensal + valorDespesaMensal + valorReceitaMensal);
  if (valorAporteMensal + valorDespesaMensal + valorReceitaMensal === 0) {
    porcentagemDespesaAtual = 0.2;
  }
  let porcentagemReceitaAtual =
    valorReceitaMensal /
    (valorAporteMensal + valorDespesaMensal + valorReceitaMensal);
  if (valorAporteMensal + valorDespesaMensal + valorReceitaMensal === 0) {
    porcentagemReceitaAtual = 0.9;
  }

  let unidade = "R$ ";
  if (saldoMensal < 0) unidade = "-R$ ";

  return (
    <Tela backgroundColor={colors.primary}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Image
              style={styles.icon}
              source={require("../assets/iconSombreado.png")}
            />
            <View
              style={{
                marginLeft: applyDinamicWidth(5),
                alignSelf: "flex-end",
                marginBottom: applyDinamicWidth(10),
              }}
            >
              <AppText style={styles.ola}>Olá,</AppText>
              {loading ? (
                <Loading
                  size="small"
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: applyDinamicWidth(5),
                    height: applyDinamicHeight(30),
                  }}
                />
              ) : (
                <AppText
                  style={styles.nome}
                  numberOfLines={1}
                  ellipsizeMode="clip"
                >
                  {nome.split(" ")[0]}!
                </AppText>
              )}
            </View>
          </View>
          {budgetSelected ? (
            <View style={styles.budgetSelected}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: applyDinamicHeight(7),
                }}
              >
                <AppText style={styles.selectedText}>Finanças Pessoais</AppText>
                <View style={styles.iconSelected}>
                  <MaterialCommunityIcons
                    name="account"
                    size={applyDinamicHeight(24)}
                    color={colors.primary}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.iconUnSelected}
                onPress={() => {
                  setBudgetSelected(false);
                  // Analytics.logEvent("SelecionouInvestimentos", {
                  //   sender: "home",
                  //   /*
                  //    * This may be too specific and not very useful, but maybe down the line * we could investigate why a certain user is more popular than others.
                  //    */
                  //   user: uid,
                  //   /*
                  //    * We can use this information later to compare against other events.
                  //    */
                  //   screen: "home",
                  //   purpose: "Ver balanço investimentos",
                  // });
                }}
              >
                <MaterialCommunityIcons
                  name="chart-line-variant"
                  size={applyDinamicHeight(20)}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.investimentoSelected}>
              <TouchableOpacity
                style={styles.iconUnSelected}
                onPress={() => {
                  setBudgetSelected(true);
                }}
              >
                <MaterialCommunityIcons
                  name="account"
                  size={applyDinamicHeight(22)}
                  color={colors.white}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: applyDinamicHeight(7),
                  marginRight: applyDinamicWidth(2),
                }}
              >
                <AppText style={styles.selectedText}>Investimentos</AppText>
                <View style={styles.iconSelected}>
                  <MaterialCommunityIcons
                    name="chart-line-variant"
                    size={applyDinamicHeight(24)}
                    color={colors.primary}
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        {budgetSelected ? (
          <View>
            {/* <AppText style={styles.tituloSaldo}>
              {format(new Date(), "MMMM", { locale: ptBR })} - Saldo Mensal
            </AppText> */}
            <AppText style={styles.tituloSaldo}>Saldo total</AppText>
            {loading ? (
              <Loading
                style={{
                  marginTop: applyDinamicHeight(60),
                  alignSelf: "flex-start",
                  marginLeft: applyDinamicWidth(100),
                }}
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: applyDinamicSize(15),
                  marginLeft: applyDinamicWidth(30),
                }}
              >
                <AppText style={styles.unitSaldo}>{unidade}</AppText>
                <AppMaskText
                  style={styles.valorSaldo}
                  value={saldoTotal}
                  precision={2}
                  unit=""
                />
              </View>
            )}
          </View>
        ) : (
          <View>
            <AppText style={styles.tituloSaldo}>Patrimônio Investido</AppText>
            <View
              style={{
                flexDirection: "row",
                marginTop: applyDinamicSize(15),
                marginLeft: applyDinamicWidth(30),
              }}
            >
              <AppText style={styles.unitSaldo}>R$ </AppText>
              <AppMaskText
                style={styles.valorSaldo}
                value={patrimonio}
                precision={2}
                unit=""
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.visaoGeral}>
        <AppText style={styles.tituloVisaoGeral}>Visão Geral</AppText>
        <AppText style={styles.tituloMenor}>Balanço Mensal</AppText>
        <CardBalançoHome
          valorAporteMensal={valorAporteMensal}
          valorDespesaMensal={valorDespesaMensal}
          valorReceitaMensal={valorReceitaMensal}
          mesAnterior={format(subMonths(new Date(), 1), "MMMM", {
            locale: ptBR,
          })}
          mesAtual={format(new Date(), "MMMM", { locale: ptBR })}
          porcentagemAporteAtual={porcentagemAporteAtual}
          porcentagemDespesaAtual={porcentagemDespesaAtual}
          porcentagemReceitaAtual={porcentagemReceitaAtual}
        />
        <AppText style={styles.tituloMenor}>Progresso</AppText>
        <CardProgressoHome />
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "26%",
  },
  icon: {
    width: applyDinamicHeight(70),
    height: applyDinamicHeight(70),
    marginLeft: applyDinamicWidth(25),
  },
  ola: {
    color: colors.white,
    fontSize: applyDinamicHeight(20),
    fontWeight: "200",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
  },
  nome: {
    color: colors.white,
    fontSize: applyDinamicHeight(26),
    fontWeight: "700",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    width: applyDinamicWidth(150),
    textTransform: "capitalize",
    height: 30,
  },
  tituloSaldo: {
    textTransform: "capitalize",
    color: colors.white,
    marginHorizontal: applyDinamicHeight(30),
    marginTop: applyDinamicSize(25),
    fontSize: applyDinamicWidth(20),
    fontWeight: "200",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
  },
  tituloVisaoGeral: {
    fontSize: applyDinamicWidth(26),
    fontWeight: "700",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    marginHorizontal: applyDinamicWidth(25),
    marginTop: applyDinamicHeight(20),
  },
  tituloMenor: {
    fontSize: applyDinamicWidth(16),
    marginHorizontal: applyDinamicWidth(25),
    marginTop: applyDinamicHeight(15),
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
  unitSaldo: {
    color: colors.white,
    alignSelf: "flex-end",
    marginBottom: applyDinamicWidth(3),
  },
  budgetSelected: {
    marginRight: applyDinamicWidth(5),
  },
  investimentoSelected: {
    marginRight: applyDinamicWidth(5),
  },
  selectedText: {
    color: colors.white,
    fontSize: applyDinamicHeight(13),
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    marginRight: applyDinamicWidth(5),
    alignSelf: "center",
  },
  iconSelected: {
    backgroundColor: colors.white,
    borderRadius: 100,
    padding: applyDinamicHeight(2),
    justifyContent: "center",
    alignItems: "center",
  },
  iconUnSelected: {
    alignSelf: "flex-end",
    backgroundColor: colors.darkPurple,
    width: applyDinamicHeight(29),
    height: applyDinamicHeight(29),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  valorSaldo: {
    color: colors.white,
    fontSize: applyDinamicHeight(36),
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
  visaoGeral: {
    backgroundColor: colors.white,
    height: "74%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Home;
