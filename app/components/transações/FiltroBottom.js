import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTransações } from "../context/TransaçãoProvider";

import colors from "../../config/colors";

import AppText from "../AppText";
import PickerCategoria from "./PickerCategoria";
import OkButton from "../OkButton";
import CardFiltro from "./CardFiltro";
import applyDinamicWidth from "../valores/applyDinamicWidth";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicSize from "../valores/applyDinamicSize";

function FiltroBottom({ bottomSheetRef, onPressCancel, onPressDone }) {
  const {
    receitaSelected,
    setReceitaSelected,
    despesaSelected,
    setDespesaSelected,
    aporteSelected,
    setAporteSelected,
    categoryFilter,
    setCategoryFilter,
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
    <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={["50%"]}>
      <ScrollView style={styles.contentContainer}>
        <MaterialCommunityIcons
          name="close"
          size={applyDinamicWidth(35)}
          color={colors.white}
          style={styles.icon}
          onPress={onPressCancel}
        />
        <View style={{ top: -20 }}>
          <AppText style={styles.title}>Tipo</AppText>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              marginLeft: applyDinamicWidth(10),
            }}
          >
            <CardFiltro
              name="Receita"
              styleContainer={[
                receitaSelected
                  ? styles.containerCardFiltroSelected
                  : styles.containerCardFiltro,
              ]}
              styleTipo={[receitaSelected ? styles.tipoSelected : styles.tipo]}
              onPress={() =>
                setReceitaSelected((previousState) => !previousState)
              }
            />
            <CardFiltro
              name="Despesa"
              style={styles.cardFiltro}
              styleContainer={[
                despesaSelected
                  ? styles.containerCardFiltroSelected
                  : styles.containerCardFiltro,
              ]}
              styleTipo={[despesaSelected ? styles.tipoSelected : styles.tipo]}
              onPress={() =>
                setDespesaSelected((previousState) => !previousState)
              }
            />
            <CardFiltro
              name="Aporte"
              style={styles.cardFiltro}
              styleContainer={[
                aporteSelected
                  ? styles.containerCardFiltroSelected
                  : styles.containerCardFiltro,
              ]}
              styleTipo={[aporteSelected ? styles.tipoSelected : styles.tipo]}
              onPress={() =>
                setAporteSelected((previousState) => !previousState)
              }
            />
          </View>
          <AppText style={styles.title2}>Categoria</AppText>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              marginLeft: applyDinamicWidth(20),
              marginTop: applyDinamicHeight(15),
              marginBottom: applyDinamicHeight(10),
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <PickerCategoria
                selectedItem={categoryFilter}
                onSelectItem={(item) => setCategoryFilter(item)}
                items={categories}
                placeholder="Todas as categorias"
                iconName={categoryFilter ? categoryFilter.name : "plus"}
                stylePlaceholder={{
                  color: colors.white,
                  fontSize: applyDinamicWidth(20),
                  fontWeight: "500",
                }}
              />
            </View>
          </View>
          <OkButton
            onPress={onPressDone}
            backgroundColor={colors.white}
            checkColor={colors.primary}
            checkSize={applyDinamicWidth(20)}
          />
        </View>
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  categoriaCard: {
    padding: 10,
  },
  icon: {
    alignSelf: "flex-end",
    padding: applyDinamicWidth(10),
    marginLeft: applyDinamicWidth(10),
  },
  selectedCategory: {
    color: colors.white,
    alignSelf: "center",
    fontSize: 20,
  },
  title: {
    alignSelf: "flex-start",
    color: colors.white,
    fontSize: applyDinamicHeight(20),
    fontWeight: "500",
    paddingHorizontal: applyDinamicWidth(20),
  },
  title2: {
    alignSelf: "flex-start",
    color: colors.white,
    fontSize: applyDinamicHeight(20),
    fontWeight: "500",
    paddingHorizontal: applyDinamicWidth(20),
    marginTop: applyDinamicHeight(15),
  },
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
    fontSize: applyDinamicHeight(15),
  },
  tipoSelected: {
    color: colors.primary,
    paddingHorizontal: applyDinamicWidth(10),
    paddingVertical: applyDinamicHeight(5),
    fontSize: applyDinamicHeight(15),
  },
});

export default FiltroBottom;
