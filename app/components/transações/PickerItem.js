import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import AppText from "../AppText";
import Icon from "../Icon";

function PickerItem({ label, name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={name} />
      <AppText style={styles.legenda}>{label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  legenda: {
    marginLeft: 10,
  },
});

export default PickerItem;
