import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import {
  addMonths,
  format,
  isBefore,
  isSameMonth,
  parseISO,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import colors from "../config/colors";
import { useTransações } from "../context/TransaçãoProvider";

import AppText from "../components/AppText";
import CardBalançoMensal from "../components/transações/CardBalançoMensal";
import CardSaldoMensal from "../components/transações/CardSaldoMensal";
import sum from "../components/valores/sum";
import valor from "../components/valores/valor";
import Transação from "../components/transações/Transação";
import ListItemSeparator from "../components/ListItemSeparator";
import Tela from "../components/Tela";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

function TelaPréTransações({ navigation }) {
  const { transações, investimentoInicial } = useTransações();

  const [date, setDate] = useState(new Date(), { locale: ptBR });

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

  //////////////////// BALANÇO

  const valorReceitaMensalBalanço = transações
    .filter((item) => item.tipoTransação.includes("receita"))
    .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
    .map(valor)
    .reduce(sum, 0);
  const valorDespesaMensalBalanço = transações
    .filter((item) => item.tipoTransação.includes("despesa"))
    .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
    .map(valor)
    .reduce(sum, 0);
  const valorAporteMensalBalanço = transações
    .filter((item) => item.tipoTransação.includes("aporte"))
    .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
    .map(valor)
    .reduce(sum, 0);

  let porcentagemAporteAtual =
    valorAporteMensalBalanço /
    (valorAporteMensalBalanço +
      valorDespesaMensalBalanço +
      valorReceitaMensalBalanço);
  if (
    valorAporteMensalBalanço +
      valorDespesaMensalBalanço +
      valorReceitaMensalBalanço ===
    0
  ) {
    porcentagemAporteAtual = 0.1;
  }
  let porcentagemDespesaAtual =
    valorDespesaMensalBalanço /
    (valorAporteMensalBalanço +
      valorDespesaMensalBalanço +
      valorReceitaMensalBalanço);
  if (
    valorAporteMensalBalanço +
      valorDespesaMensalBalanço +
      valorReceitaMensalBalanço ===
    0
  ) {
    porcentagemDespesaAtual = 0.2;
  }
  let porcentagemReceitaAtual =
    valorReceitaMensalBalanço /
    (valorAporteMensalBalanço +
      valorDespesaMensalBalanço +
      valorReceitaMensalBalanço);
  if (
    valorAporteMensalBalanço +
      valorDespesaMensalBalanço +
      valorReceitaMensalBalanço ===
    0
  ) {
    porcentagemReceitaAtual = 0.9;
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  const valorReceitaMensalBalançoAnterior = transações
    .filter((item) => item.tipoTransação.includes("receita"))
    .filter((item) =>
      isSameMonth(parseISO(item.dataTransação), subMonths(date, 1))
    )
    .map(valor)
    .reduce(sum, 0);
  const valorDespesaMensalBalançoAnterior = transações
    .filter((item) => item.tipoTransação.includes("despesa"))
    .filter((item) =>
      isSameMonth(parseISO(item.dataTransação), subMonths(date, 1))
    )
    .map(valor)
    .reduce(sum, 0);
  const valorAporteMensalBalançoAnterior = transações
    .filter((item) => item.tipoTransação.includes("aporte"))
    .filter((item) =>
      isSameMonth(parseISO(item.dataTransação), subMonths(date, 1))
    )
    .map(valor)
    .reduce(sum, 0);

  let porcentagemAporteAnterior =
    valorAporteMensalBalançoAnterior /
    (valorAporteMensalBalançoAnterior +
      valorDespesaMensalBalançoAnterior +
      valorReceitaMensalBalançoAnterior);
  if (
    valorAporteMensalBalançoAnterior +
      valorDespesaMensalBalançoAnterior +
      valorReceitaMensalBalançoAnterior ===
    0
  ) {
    porcentagemAporteAnterior = 0.1;
  }
  let porcentagemDespesaAnterior =
    valorDespesaMensalBalançoAnterior /
    (valorAporteMensalBalançoAnterior +
      valorDespesaMensalBalançoAnterior +
      valorReceitaMensalBalançoAnterior);
  if (
    valorAporteMensalBalançoAnterior +
      valorDespesaMensalBalançoAnterior +
      valorReceitaMensalBalançoAnterior ===
    0
  ) {
    porcentagemDespesaAnterior = 0.2;
  }
  let porcentagemReceitaAnterior =
    valorReceitaMensalBalançoAnterior /
    (valorAporteMensalBalançoAnterior +
      valorDespesaMensalBalançoAnterior +
      valorReceitaMensalBalançoAnterior);
  if (
    valorAporteMensalBalançoAnterior +
      valorDespesaMensalBalançoAnterior +
      valorReceitaMensalBalançoAnterior ===
    0
  ) {
    porcentagemReceitaAnterior = 0.9;
  }

  ///////////////////////////////
  ///////////////////////////////

  let dataUltimasTransações = transações
    .sort(function (a, b) {
      return new Date(b.dataTransação) - new Date(a.dataTransação);
    })
    .filter((item) => isBefore(parseISO(item.dataTransação), new Date()))
    .slice(0, 3);

  if (
    JSON.stringify(
      transações.filter((item) => parseISO(item.dataTransação))
    ) === JSON.stringify([])
  ) {
    dataUltimasTransações = [
      {
        id: 1,
        title: "Investimento Inicial",
        subTitle: "Indefinido",
        valor: investimentoInicial,
        tipoTransação: "aporte",
        nameIcon: "cash-multiple",
        dataTransação: "2021-01-01T15:42:54.400Z",
        category: { label: "Aporte Mensal", value: 1, name: "cash" },
      },
    ];
  }

  return (
    // <ScrollView style={styles.container}>
    <View style={styles.container}>
      <CardSaldoMensal
        receitaMensal={valorReceitaMensal}
        despesaMensal={valorDespesaMensal}
        aporteMensal={valorAporteMensal}
      />
      <AppText style={styles.tituloBalanço}>Balanço Mensal</AppText>
      <CardBalançoMensal
        valorAporteMensal={valorAporteMensalBalanço}
        valorDespesaMensal={valorDespesaMensalBalanço}
        valorReceitaMensal={valorReceitaMensalBalanço}
        mesAnterior={format(subMonths(date, 1), "MMMM", { locale: ptBR })}
        mesAtual={format(date, "MMMM", { locale: ptBR })}
        onPressLeft={() => {
          const newDate = subMonths(date, 1);
          setDate(newDate);
        }}
        onPressRight={() => {
          const newDate = addMonths(date, 1);
          setDate(newDate);
        }}
        porcentagemAporteAtual={porcentagemAporteAtual}
        porcentagemDespesaAtual={porcentagemDespesaAtual}
        porcentagemReceitaAtual={porcentagemReceitaAtual}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AppText style={styles.tituloUltimas}>Últimas transações</AppText>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TelaTransações", {
              screen: "TelaTransações",
            });
          }}
          style={styles.button}
        >
          <AppText style={styles.verMais}>Ver todas</AppText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: applyDinamicWidth(30),
          borderRadius: 25,
          overflow: "hidden",
          backgroundColor: colors.white,
          padding: 0,
        }}
      >
        <FlatList
          data={dataUltimasTransações}
          keyExtractor={(transações) => transações.id.toString()}
          renderItem={({ item }) => (
            <Transação
              title={item.title}
              dataTransação={item.dataTransação}
              tipoTransação={item.tipoTransação}
              valor={item.valor}
              nameIcon={item.category.name}
              fontSize={applyDinamicWidth(15)}
            />
          )}
          ItemSeparatorComponent={() => (
            <ListItemSeparator height={applyDinamicHeight(1.2)} />
          )}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.mediumMaisLightAinda,
    alignSelf: "center",
    padding: applyDinamicHeight(9),
    top: applyDinamicHeight(9),
    marginBottom: applyDinamicHeight(5),
    borderRadius: 15,
  },
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  tituloBalanço: {
    marginHorizontal: applyDinamicWidth(40),
    marginTop: applyDinamicHeight(16),
    fontSize: applyDinamicWidth(18),
    fontWeight: "700",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
  tituloUltimas: {
    fontSize: applyDinamicWidth(18),
    fontWeight: "700",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    marginHorizontal: applyDinamicWidth(40),
    marginTop: applyDinamicHeight(25),
    marginBottom: applyDinamicHeight(10),
    flex: 0.87,
  },
  verMais: {
    color: colors.medium,
    fontSize: applyDinamicWidth(13),
    alignSelf: "center",
  },
});

export default TelaPréTransações;
