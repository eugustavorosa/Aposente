import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Switch,
} from "react-native";
import CurrencyInput from "react-native-currency-input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import colors from "../config/colors";

import AppPicker from "../components/AppPicker";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Tela from "../components/Tela";
import PickerCategoria from "../components/transações/PickerCategoria";
import ListItemSeparator from "../components/ListItemSeparator";
import OkButton from "../components/OkButton";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

function Despesa({ onPressCancelar, onSubmit, isEdit, transação }) {
  useEffect(() => {
    if (isEdit) {
      setDescrição(transação.title);
      setValorTransação(transação.valor);
      setDataTransação(transação.dataTransação);
      setCategory(transação.category);
    }
  }, [isEdit]);

  const [valorTransação, setValorTransação] = useState(0);
  const [descrição, setDescrição] = useState("");
  const [category, setCategory] = useState({
    label: "Outros",
    value: 16,
    name: "dots-horizontal",
  });
  const categories = [
    { label: "Alimentação", value: 1, name: "silverware-fork-knife" },
    { label: "Animais", value: 2, name: "dog-side" },
    { label: "Compras", value: 3, name: "shopping" },
    { label: "Dívidas", value: 4, name: "cash-remove" },
    { label: "Educação", value: 5, name: "school" },
    { label: "Entretenimento", value: 6, name: "youtube-tv" },
    { label: "Impostos", value: 7, name: "clipboard-text" },
    { label: "Lazer", value: 8, name: "baseball" },
    { label: "Moradia", value: 9, name: "home" },
    { label: "Pessoal", value: 10, name: "account" },
    { label: "Presentes", value: 11, name: "gift" },
    { label: "Restaurantes", value: 12, name: "food-variant" },
    { label: "Roupas", value: 13, name: "tshirt-crew" },
    { label: "Saúde", value: 14, name: "hospital" },
    { label: "Transporte", value: 15, name: "car" },
    { label: "Viagem", value: 16, name: "airplane-takeoff" },
    { label: "Água", value: 17, name: "water" },
    { label: "Luz", value: 18, name: "lightbulb" },
    { label: "Academia", value: 19, name: "weight-lifter" },
    { label: "Celular", value: 20, name: "cellphone-android" },
    { label: "Limpeza", value: 21, name: "broom" },
    { label: "Internet", value: 22, name: "wifi" },
    { label: "Outros", value: 23, name: "dots-horizontal" },
  ];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dataTransação, setDataTransação] = useState(new Date());
  const handleConfirm = (date) => {
    setDataTransação(date);
    setDatePickerVisibility(false);
  };
  const [isMensal, setIsMensal] = useState(false);
  const toggleSwitch = () => setIsMensal((previousState) => !previousState);

  const onPressDone = () => {
    if (isEdit) {
      onSubmit(descrição, valorTransação, category, dataTransação, isMensal);
    } else {
      onSubmit(descrição, valorTransação, category, dataTransação, isMensal);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Tela>
          <View style={styles.containerHead}>
            <TouchableOpacity onPress={onPressCancelar}>
              <AppText style={styles.cancelar}>Cancelar</AppText>
            </TouchableOpacity>
            <AppPicker label="Despesa" backgroundColor={colors.despesaDark} />
          </View>
          <AppText style={styles.tituloValor}>Valor da despesa</AppText>
          <CurrencyInput
            value={valorTransação}
            onChangeValue={setValorTransação}
            unit="R$ "
            delimiter="."
            separator=","
            precision={2}
            style={styles.valorInput}
            placeholder="R$ 0,00"
            placeholderTextColor={colors.white}
          />
        </Tela>
      </View>
      <View style={styles.container}>
        <Tela>
          <View style={styles.containerDetalhe}>
            <MaterialCommunityIcons
              name="lead-pencil"
              size={applyDinamicWidth(25)}
              color={colors.medium}
              style={styles.icon}
            />
            <AppTextInput
              value={descrição}
              width="70%"
              keyboardType="default"
              placeholder="Descrição"
              padding={applyDinamicWidth(10)}
              onChangeText={(text) => setDescrição(text)}
              borderWidth={0}
              height={applyDinamicHeight(50)}
            />
          </View>
          <ListItemSeparator height={applyDinamicHeight(1.5)} width="90%" />
          <TouchableOpacity
            style={styles.containerData}
            onPress={() => setDatePickerVisibility(true)}
          >
            <MaterialCommunityIcons
              name="calendar"
              size={applyDinamicWidth(25)}
              color={colors.medium}
              style={styles.iconData}
            />
            <AppText>{dayjs(dataTransação).format("DD/MM/YYYY")}</AppText>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onCancel={() => setDatePickerVisibility(false)}
            onConfirm={handleConfirm}
          />
          <ListItemSeparator height={applyDinamicHeight(1.5)} width="90%" />
          <PickerCategoria
            selectedItem={category}
            onSelectItem={(item) => setCategory(item)}
            items={categories}
            width="50%"
            placeholder="Salário"
            iconName={category.name}
          />
          <ListItemSeparator height={applyDinamicHeight(1.5)} width="90%" />
          <View style={styles.containerData}>
            <MaterialCommunityIcons
              name="repeat"
              size={applyDinamicWidth(25)}
              color={colors.medium}
              style={styles.iconData}
            />
            <AppText>Repetir Mensalmente?</AppText>
            <Switch
              trackColor={{ true: colors.despesa }}
              thumbColor={"#FFFFFF"}
              style={styles.switch}
              onValueChange={toggleSwitch}
              value={isMensal}
            />
          </View>
          <ListItemSeparator height={applyDinamicHeight(1.5)} width="90%" />
          <View style={styles.button}>
            <OkButton backgroundColor={colors.danger} onPress={onPressDone} />
          </View>
        </Tela>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "70%",
    alignSelf: "center",
    marginTop: applyDinamicHeight(50),
  },
  cancelar: {
    color: colors.white,
    padding: applyDinamicWidth(15),
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(15),
  },
  container: {
    backgroundColor: colors.white,
    flex: 4,
  },
  containerData: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: applyDinamicHeight(15),
  },
  containerDetalhe: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: applyDinamicHeight(5),
  },
  containerHead: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  header: {
    backgroundColor: colors.despesa,
    flex: 1.2,
  },
  icon: {
    paddingLeft: applyDinamicWidth(25),
    marginRight: applyDinamicWidth(10),
  },
  iconData: {
    paddingLeft: applyDinamicWidth(25),
    marginRight: applyDinamicWidth(23),
  },
  repetir: {
    flexDirection: "row",
  },
  switch: {
    marginLeft: applyDinamicWidth(100),
  },
  tituloValor: {
    color: colors.white,
    fontWeight: "300",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-light" : "Helvetica Neue",
    padding: applyDinamicWidth(5),
    marginLeft: applyDinamicWidth(5),
    fontSize: applyDinamicWidth(15),
  },
  valorInput: {
    color: colors.white,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica Neue",
    fontSize: applyDinamicWidth(32),
    marginLeft: applyDinamicWidth(20),
    marginBottom: applyDinamicHeight(20),
  },
});

export default Despesa;
