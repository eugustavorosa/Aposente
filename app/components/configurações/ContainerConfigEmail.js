import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../config/colors";

import AppText from "../AppText";

function ContainerConfigEmail({ email, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AppText style={styles.titulo}>E-mail</AppText>
      <AppText style={styles.email}>{email}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titulo: {
    alignSelf: "center",
    width: "30%",
    marginLeft: 20,
    fontSize: 15,
    color: colors.dark,
    fontWeight: "400",
  },
  email: {
    alignSelf: "center",
    marginRight: 20,
    fontSize: 15,
    color: colors.medium,
    fontWeight: "400",
  },
});

export default ContainerConfigEmail;
