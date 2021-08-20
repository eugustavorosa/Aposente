import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function AppSearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="magnify"
        size={applyDinamicWidth(24)}
        color={colors.white}
        style={styles.icon}
      />
      <TextInput
        placeholder="Pesquisar"
        placeholderTextColor={colors.white}
        defaultValue={value}
        onChangeText={onChangeText}
        style={{
          fontSize: applyDinamicWidth(18),
          color: colors.white,
          flex: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    height: "60%",
    backgroundColor: colors.darkPurple,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    paddingRight: 15,
    paddingLeft: 15,
  },
});

export default AppSearchBar;
