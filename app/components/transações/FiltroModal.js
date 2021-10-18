import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import applyDinamicWidth from "../valores/applyDinamicWidth";
import AppText from "../AppText";
import CardFiltro from "./CardFiltro";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import ListItemSeparator from "../ListItemSeparator";
import PickerCategoria from "./PickerCategoria";

const FiltroModal = () => {
  const onPressCancel = () => {};
  const onPressFiltrar = () => {};

  //////// teste só pra funfar o front end

  const [receitaSelected, setReceitaSelected] = useState(false);
  const [despesaSelected, setDespesaSelected] = useState(false);
  const [aporteSelected, setAporteSelected] = useState(false);
  const [mensalSelected, setMensalSelected] = useState(false);
  const [unicoSelected, setUnicoSelected] = useState(false);

  return (
    <ScrollView style={styles.tela}>
      <MaterialCommunityIcons
        name="close"
        size={applyDinamicWidth(30)}
        color={colors.white}
        style={styles.icon}
        onPress={onPressCancel}
      />
      <AppText style={styles.titulo}>Tipo</AppText>
      <View
        style={{ flexDirection: "row", marginLeft: "3%", marginBottom: "10%" }}
      >
        <CardFiltro
          name="Receita"
          styleContainer={[
            receitaSelected
              ? styles.containerCardFiltroSelected
              : styles.containerCardFiltro,
          ]}
          styleTipo={[receitaSelected ? styles.tipoSelected : styles.tipo]}
          onPress={() => setReceitaSelected((previousState) => !previousState)}
          styleTipo={[receitaSelected ? styles.tipoSelected : styles.tipo]}
        />
        <CardFiltro
          name="Despesa"
          styleContainer={[
            despesaSelected
              ? styles.containerCardFiltroSelected
              : styles.containerCardFiltro,
          ]}
          styleTipo={[despesaSelected ? styles.tipoSelected : styles.tipo]}
          onPress={() => setDespesaSelected((previousState) => !previousState)}
          styleTipo={[despesaSelected ? styles.tipoSelected : styles.tipo]}
        />
        <CardFiltro
          name="Aporte"
          styleContainer={[
            aporteSelected
              ? styles.containerCardFiltroSelected
              : styles.containerCardFiltro,
          ]}
          styleTipo={[aporteSelected ? styles.tipoSelected : styles.tipo]}
          onPress={() => setAporteSelected((previousState) => !previousState)}
          styleTipo={[aporteSelected ? styles.tipoSelected : styles.tipo]}
        />
      </View>
      <ListItemSeparator
        backgroundColor={colors.white}
        height={0.5}
        width="90%"
      />
      <AppText style={styles.titulo}>Recorrência</AppText>
      <View
        style={{ flexDirection: "row", marginLeft: "3%", marginBottom: "10%" }}
      >
        <CardFiltro
          name="Mensal"
          styleContainer={[
            mensalSelected
              ? styles.containerCardFiltroSelected
              : styles.containerCardFiltro,
          ]}
          styleTipo={[mensalSelected ? styles.tipoSelected : styles.tipo]}
          onPress={() => setMensalSelected((previousState) => !previousState)}
          styleTipo={[mensalSelected ? styles.tipoSelected : styles.tipo]}
        />
        <CardFiltro
          name="Único"
          styleContainer={[
            unicoSelected
              ? styles.containerCardFiltroSelected
              : styles.containerCardFiltro,
          ]}
          styleTipo={[unicoSelected ? styles.tipoSelected : styles.tipo]}
          onPress={() => setUnicoSelected((previousState) => !previousState)}
          styleTipo={[unicoSelected ? styles.tipoSelected : styles.tipo]}
        />
      </View>
      <ListItemSeparator
        backgroundColor={colors.white}
        height={0.5}
        width="90%"
      />
      <AppText style={styles.titulo}>Categoria</AppText>
      <View style={{ marginBottom: "10%" }}>
        <PickerCategoria
          iconName={"plus"}
          placeholder="Todas as categorias"
          stylePlaceholder={{
            color: colors.white,
            fontSize: applyDinamicWidth(19),
            fontFamily:
              Platform.OS === "android"
                ? "sans-serif-medium"
                : "Helvetica Neue",
          }}
        />
      </View>
      <ListItemSeparator
        backgroundColor={colors.white}
        height={0.5}
        width="90%"
      />
      <TouchableOpacity onPress={onPressFiltrar}>
        <AppText style={styles.done}>Filtrar</AppText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressCancel}>
        <AppText style={styles.cancel}>Cancelar</AppText>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerCardFiltro: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
    marginHorizontal: applyDinamicWidth(10),
    marginVertical: applyDinamicHeight(15),
  },
  containerCardFiltroSelected: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
    marginHorizontal: applyDinamicWidth(10),
    marginVertical: applyDinamicHeight(15),
    backgroundColor: colors.white,
  },
  tipo: {
    color: colors.white,
    paddingHorizontal: applyDinamicWidth(10),
    paddingVertical: applyDinamicHeight(5),
    fontSize: applyDinamicWidth(15),
  },
  tipoSelected: {
    color: colors.primary,
    paddingHorizontal: applyDinamicWidth(10),
    paddingVertical: applyDinamicHeight(5),
    fontSize: applyDinamicWidth(15),
  },
  tela: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: colors.primary,
  },
  titulo: {
    color: colors.white,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(20),
    padding: "1.5%",
    marginLeft: "3%",
    marginTop: "5%",
  },
  icon: {
    alignSelf: "flex-start",
    padding: "1.5%",
    marginLeft: "1.5%",
  },
  done: {
    alignSelf: "center",
    marginTop: "13%",
    color: colors.white,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(20),
  },
  cancel: {
    alignSelf: "center",
    marginTop: "10%",
    color: colors.white,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(15),
  },
});

export default FiltroModal;
