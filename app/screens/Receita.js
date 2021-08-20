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

function Receita({ onPressCancelar, onSubmit, isEdit, transação }) {
  useEffect(() => {
    if (isEdit) {
      setDescrição(transação.title);
      setValorTransação(transação.valor);
      setDataTransação(transação.dataTransação);
      setCategory(transação.category);
      setIsMensal(transação.isMensal);
    }
  }, [isEdit]);

  const [valorTransação, setValorTransação] = useState(0);
  const [descrição, setDescrição] = useState("");
  const [category, setCategory] = useState({
    label: "Salário",
    value: 1,
    name: "briefcase",
  });
  const categories = [
    { label: "Salário", value: 1, name: "briefcase" },
    { label: "Presente", value: 2, name: "gift" },
    { label: "Investimentos", value: 3, name: "chart-line" },
    { label: "Outros", value: 4, name: "dots-horizontal" },
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
            <AppPicker label="Receita" backgroundColor="#013220" />
          </View>
          <AppText style={styles.tituloValor}>Valor da receita</AppText>
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
              trackColor={{ true: colors.receita }}
              style={styles.switch}
              thumbColor={"#FFFFFF"}
              onValueChange={toggleSwitch}
              value={isMensal}
            />
          </View>
          <ListItemSeparator height={applyDinamicHeight(1.5)} width="90%" />
          <View style={styles.button}>
            <OkButton backgroundColor={colors.receita} onPress={onPressDone} />
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
    backgroundColor: colors.receita,
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

export default Receita;
