import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Appbar } from "react-native-paper";

import { useTransações } from "../context/TransaçãoProvider";
import colors from "../config/colors";

import AppSearchBar from "../components/transações/AppSearchBar";
import AppText from "../components/AppText";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";

function HeaderTransações({
  value,
  onChange,
  onPressBack,
  onPressFilter,
  onPressCancelar,
}) {
  const { searchAtive, setSeatchActive } = useTransações();

  if (searchAtive) {
    return (
      <Appbar.Header>
        <AppSearchBar value={value} onChangeText={onChange} />
        <AppText
          style={{ color: colors.white }}
          allowFontScaling={false}
          onPress={onPressCancelar}
        >
          Cancelar
        </AppText>
      </Appbar.Header>
    );
  } else {
    return Platform.OS === "android" ? (
      <Appbar.Header>
        <Appbar.BackAction onPress={onPressBack} color={colors.white} />
        <Appbar.Content
          title="Todas transações"
          titleStyle={styles.title}
          allowFontScaling={false}
        />
        <Appbar.Action icon="magnify" onPress={() => setSeatchActive(true)} />
      </Appbar.Header>
    ) : (
      <Appbar.Header>
        <Appbar.BackAction onPress={onPressBack} color={colors.white} />
        <Appbar.Content
          title="Todas transações"
          titleStyle={styles.title}
          allowFontScaling={false}
        />
        <Appbar.Action icon="magnify" onPress={() => setSeatchActive(true)} />
        <Appbar.Action icon="filter" onPress={onPressFilter} />
      </Appbar.Header>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontWeight: "800",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft:
      Platform.OS === "android" ? applyDinamicWidth(0) : applyDinamicWidth(45),
    fontSize: applyDinamicWidth(16),
  },
});

export default HeaderTransações;
