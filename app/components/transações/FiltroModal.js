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
import { useTransações } from "../context/contextProvider";

const FiltroModal = ({ onPressCancel, onPressFiltrar }) => {
  //////// teste só pra funfar o front end

  const {
    receitaSelected,
    setReceitaSelected,
    despesaSelected,
    setDespesaSelected,
    aporteSelected,
    setAporteSelected,
    categoryFilter,
    setCategoryFilter,
    mensalSelected,
    setMensalSelected,
    unicoSelected,
    setUnicoSelected,
  } = useTransações();

  const categories = [
    { label: "Todas as categorias", value: 1, name: "plus" },
    { label: "Salário", value: 2, name: "briefcase" },
    { label: "Presente", value: 3, name: "gift" },
    { label: "Investimentos", value: 4, name: "chart-line" },
    { label: "Alimentação", value: 5, name: "silverware-fork-knife" },
    { label: "Animais", value: 6, name: "dog-side" },
    { label: "Compras", value: 7, name: "shopping" },
    { label: "Dívidas", value: 8, name: "cash-remove" },
    { label: "Educação", value: 9, name: "school" },
    { label: "Entretenimento", value: 10, name: "youtube-tv" },
    { label: "Impostos", value: 11, name: "clipboard-text" },
    { label: "Lazer", value: 12, name: "baseball" },
    { label: "Moradia", value: 13, name: "home" },
    { label: "Pessoal", value: 14, name: "account" },
    { label: "Presentes", value: 15, name: "gift" },
    { label: "Restaurantes", value: 16, name: "food-variant" },
    { label: "Roupas", value: 17, name: "tshirt-crew" },
    { label: "Saúde", value: 18, name: "hospital" },
    { label: "Transporte", value: 19, name: "car" },
    { label: "Viagem", value: 20, name: "airplane-takeoff" },
    { label: "Outros", value: 21, name: "dots-horizontal" },
  ];

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
          onPress={() => {
            setDespesaSelected(false);
            setAporteSelected(false);
            setReceitaSelected((previousState) => !previousState);
          }}
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
          onPress={() => {
            setReceitaSelected(false);
            setAporteSelected(false);
            setDespesaSelected((previousState) => !previousState);
          }}
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
          onPress={() => {
            setReceitaSelected(false);
            setDespesaSelected(false);
            setAporteSelected((previousState) => !previousState);
          }}
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
          onPress={() => {
            setUnicoSelected(false);
            setMensalSelected((previousState) => !previousState);
          }}
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
          onPress={() => {
            setMensalSelected(false);
            setUnicoSelected((previousState) => !previousState);
          }}
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
          iconName={categoryFilter ? categoryFilter.name : "plus"}
          placeholder="Todas as categorias"
          stylePlaceholder={{
            color: colors.white,
            fontSize: applyDinamicWidth(19),
            fontFamily:
              Platform.OS === "android"
                ? "sans-serif-medium"
                : "Helvetica Neue",
          }}
          selectedItem={categoryFilter}
          onSelectItem={(item) => setCategoryFilter(item)}
          items={categories}
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
    marginTop: "3%",
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
