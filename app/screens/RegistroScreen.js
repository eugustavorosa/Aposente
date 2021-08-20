import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import colors from "../config/colors";

import AppText from "../components/AppText";
import ButtonLoginIcon from "../components/auth/ButtonLoginIcon";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

function RegistroScreen({ navigation }) {
  return (
    <View style={styles.tela}>
      <Image
        style={styles.icon}
        source={require("../assets/iconSombreado.png")}
      />
      <AppText style={styles.titulo}>Bem vindo!</AppText>
      <View style={{ marginTop: applyDinamicHeight(210) }}>
        <ButtonLoginIcon
          name="Registrar com E-mail"
          backgroundColor={colors.darkPurple}
          color={colors.white}
          icon="mail"
          onPress={() => navigation.navigate("EmailRegister")}
        />
      </View>
      {/* <View style={{ marginTop: 20 }}>
        <ButtonLoginIcon
          name="Registrar com Google"
          backgroundColor={colors.white}
          color={colors.dark}
          icon="google"
          onPress={() => {}}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <ButtonLoginIcon
          name="Registrar com Facebook"
          backgroundColor={colors.facebook}
          color={colors.white}
          icon="facebook-square"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <ButtonLoginIcon
          name="Registrar com Apple"
          backgroundColor={colors.dark}
          color={colors.white}
          icon="apple1"
        />
      </View> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <AppText style={styles.option}>Já tenho uma conta</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  icon: {
    width: applyDinamicHeight(90),
    height: applyDinamicHeight(90),
    alignSelf: "center",
    marginTop: applyDinamicHeight(100),
  },
  titulo: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 20,
    fontWeight: "600",
    marginTop: applyDinamicHeight(10),
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
  option: {
    color: colors.white,
    alignSelf: "center",
    marginTop: applyDinamicHeight(40),
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
});

export default RegistroScreen;
