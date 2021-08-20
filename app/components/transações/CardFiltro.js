import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../config/colors";

import AppText from "../AppText";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function CardFiltro({ name, styleContainer, styleTipo, onPress }) {
  return (
    <TouchableOpacity style={styleContainer} onPress={onPress}>
      <AppText style={styleTipo}>{name}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCardFiltro: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
    marginHorizontal: applyDinamicWidth(10),
    marginVertical: applyDinamicHeight(15),
  },
  tipo: {
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default CardFiltro;
