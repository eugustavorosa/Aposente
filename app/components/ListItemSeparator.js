import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";

function ListItemSeparator({
  height = 0.5,
  width = "100%",
  backgroundColor = colors.light,
}) {
  return (
    <View style={[styles.separator, { height, width, backgroundColor }]} />
  );
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 0.5,
    backgroundColor: colors.light,
    alignSelf: "center",
  },
});

export default ListItemSeparator;
