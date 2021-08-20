import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  addMonths,
  getMonth,
  isSameMonth,
  isWithinInterval,
  parseISO,
} from "date-fns";
import subMonths from "date-fns/subMonths";

import * as firebase from "firebase";
import { useTransações } from "../components/context/contextProvider";
import colors from "../config/colors";

import CardPatrimônio from "../components/investimentos/CardPatrimônio";
import sum from "../components/valores/sum";
import Tela from "../components/Tela";
import Aporte from "./Aporte";
import SelectedTitle from "../components/investimentos/SelectedTitle";
import UnSelectedItem from "../components/investimentos/UnSelectedItem";
import CardPlanodeAposentadoria from "../components/investimentos/CardPlanodeAposentadoria";
import AppText from "../components/AppText";
import ListItemSeparator from "../components/ListItemSeparator";
import Transação from "../components/transações/Transação";
import CardProgressoHome from "../components/home/CardProgressoHome";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

function TelaInvestimentos({ navigation }) {
  const {
    transações,
    setTransações,
    aporteMensal,
    mesesContribuição,
    taxaJurosAnual,
    rendaPassiva,
    investimentoInicial,
    patrimonio,
    patrimonioFinal,
    setShowButton,
  } = useTransações();

  const [progressoSelected, setProgressoSelected] = useState(true);
  const [modalVisibleAporte, setModalVisibleAporte] = useState(false);

  const mesesReferenciaAporte = [
    1,
    getMonth(new Date()) > 6
      ? getMonth(new Date()) - 5
      : getMonth(new Date()) + 1,
    getMonth(new Date()) + 1,
    360,
  ];
  const mesesReferenciaDivisao = [1, 6, 12, mesesContribuição];
  const preReferencia = ["para este ", "para o ", "para o ", "no seu "];
  const referencia = ["mês", "semestre", "ano", "plano de aposentadoria"];
  const [assignee, setAssignee] = useState(1);
  const handleAssigneeOnClick = () => {
    setAssignee((prev) => (prev + 1) % 4);
  };

  function valor(item) {
    return item.valor;
  }
  const valorTotalAporteMensal = transações
    .filter((item) => item.tipoTransação.includes("aporte"))
    .filter((item) => isSameMonth(parseISO(item.dataTransação), new Date()))
    .map(valor)
    .reduce(sum, 0);

  const valorTotalAporte = transações
    .filter((item) => item.tipoTransação.includes("aporte"))
    .filter((item) => parseISO(item.dataTransação))
    .map(valor)
    .reduce(sum, 0);

  const valorTotalAporteReferencia = transações
    .filter((item) => item.tipoTransação.includes("aporte"))
    .filter((item) =>
      isWithinInterval(parseISO(item.dataTransação), {
        start: subMonths(new Date(), mesesReferenciaAporte[assignee]),
        end: new Date(),
      })
    )
    .map(valor)
    .reduce(sum, 0);

  const handleOnSubmitAporteFirebase = (
    descrição,
    valorTransação,
    category,
    dataTransação,
    isMensal
  ) => {
    if (isMensal) {
      const transaçãoNova = {
        id: Date.now(),
        title: descrição,
        valor: valorTransação,
        dataTransação,
        nameIcon: category.name,
        category,
        tipoTransação: "aporte",
        isMensal: true,
      };

      const transação1 = {
        id: transaçãoNova.id + "+",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 1),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação2 = {
        id: transaçãoNova.id + "++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 2),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação3 = {
        id: transaçãoNova.id + "+++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 3),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação4 = {
        id: transaçãoNova.id + "++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 4),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação5 = {
        id: transaçãoNova.id + "+++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 5),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação6 = {
        id: transaçãoNova.id + "++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 6),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação7 = {
        id: transaçãoNova.id + "+++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 7),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação8 = {
        id: transaçãoNova.id + "++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 8),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação9 = {
        id: transaçãoNova.id + "+++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 9),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação10 = {
        id: transaçãoNova.id + "++++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 10),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação11 = {
        id: transaçãoNova.id + "+++++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 11),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const updatedTransações = [
        ...transações,
        transaçãoNova,
        transação1,
        transação2,
        transação3,
        transação4,
        transação5,
        transação6,
        transação7,
        transação8,
        transação9,
        transação10,
        transação11,
      ];

      setTransações(updatedTransações.flat(Infinity));
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(updatedTransações));
      navigation.navigate("TelaTransações");
      setModalVisibleAporte(false);
    } else {
      const transaçãoNova = {
        id: Date.now(),
        title: descrição,
        valor: valorTransação,
        dataTransação,
        nameIcon: category.name,
        category,
        tipoTransação: "aporte",
      };
      const updatedTransações = [...transações, transaçãoNova];
      setTransações(updatedTransações);
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(updatedTransações));
      navigation.navigate("TelaTransações");
      setModalVisibleAporte(false);
    }
  };

  let dataUltimosAportes = transações
    .sort(function (a, b) {
      return new Date(a.dataTransação) - new Date(b.dataTransação);
    })
    .filter((item) =>
      isWithinInterval(parseISO(item.dataTransação), {
        start: subMonths(new Date(), 12),
        end: new Date(),
      })
    )
    .filter((item) => item.tipoTransação.includes("aporte"))
    .slice(0, 3);

  if (
    JSON.stringify(
      transações.filter((item) => item.tipoTransação.includes("aporte"))
    ) === JSON.stringify([])
  ) {
    dataUltimosAportes = [
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
    <>
      <Tela backgroundColor={colors.light}>
        <CardPatrimônio
          patrimonio={patrimonio}
          icon={[valorTotalAporteMensal >= aporteMensal ? "check" : "plus"]}
          onPressAporte={() => setModalVisibleAporte(true)}
          investimentoInicial={investimentoInicial}
          valorAportes={valorTotalAporte}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "5%",
          }}
        >
          {progressoSelected ? (
            <>
              <SelectedTitle name="Progresso" />
              <UnSelectedItem
                name="Plano de aposentadoria"
                onPressUnselected={() => setProgressoSelected(false)}
              />
            </>
          ) : (
            <>
              <UnSelectedItem
                name="Progresso"
                onPressUnselected={() => setProgressoSelected(true)}
              />
              <SelectedTitle name="Plano de aposentadoria" />
            </>
          )}
        </View>
        {progressoSelected ? (
          <CardProgressoHome />
        ) : (
          <CardPlanodeAposentadoria
            valorMensal={rendaPassiva}
            aporte={aporteMensal}
            anos={mesesContribuição / 12}
            juros={taxaJurosAnual}
            onPressChange={() => {
              navigation.navigate("TelaPlanoInicial", { isEdit: true });
              setShowButton(false);
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AppText style={styles.ultimosAportes}>Últimos aportes</AppText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TelaTransações", {
                screen: "TelaTransações",
              });
            }}
            style={styles.button}
          >
            <AppText style={styles.verMais}>Ver todos</AppText>
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
            data={dataUltimosAportes}
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
            ItemSeparatorComponent={() => <ListItemSeparator height={1.2} />}
          />
        </View>
      </Tela>
      <Modal visible={modalVisibleAporte} animationType="slide">
        <Aporte
          onPressCancelar={() => setModalVisibleAporte(false)}
          onSubmit={handleOnSubmitAporteFirebase}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  ultimosAportes: {
    fontSize: applyDinamicWidth(18),
    fontWeight: "700",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    flex: 0.85,
    marginHorizontal: applyDinamicWidth(40),
    marginTop: applyDinamicHeight(25),
    marginBottom: applyDinamicHeight(10),
  },
  verMais: {
    color: colors.medium,
    fontSize: applyDinamicWidth(13),
    alignSelf: "center",
  },
  button: {
    backgroundColor: colors.mediumMaisLightAinda,
    alignSelf: "center",
    padding: applyDinamicHeight(9),
    top: applyDinamicHeight(9),
    marginBottom: applyDinamicHeight(5),
    borderRadius: 15,
  },
});

export default TelaInvestimentos;
