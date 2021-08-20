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

function LoginScreen({ navigation }) {
  return (
    <View style={styles.tela}>
      <Image
        style={styles.icon}
        source={require("../assets/iconSombreado.png")}
      />
      <AppText style={styles.titulo}>Bem vindo</AppText>
      <AppText style={styles.titulo1}>de volta!</AppText>
      <View style={{ marginTop: applyDinamicHeight(190) }}>
        <ButtonLoginIcon
          name="Continuar com E-mail"
          backgroundColor={colors.darkPurple}
          color={colors.white}
          icon="mail"
          onPress={() => navigation.navigate("EmailLogin")}
        />
      </View>
      {/* <View style={{ marginTop: 20 }}>
        <ButtonLoginIcon
          name="Continuar com Facebook"
          backgroundColor={colors.facebook}
          color={colors.white}
          icon="facebook-square"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <ButtonLoginIcon
          name="Continuar com Google"
          backgroundColor={colors.white}
          color={colors.dark}
          icon="google"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <ButtonLoginIcon
          name="Continuar com Apple"
          backgroundColor={colors.dark}
          color={colors.white}
          icon="apple1"
        />
      </View> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Registro");
        }}
      >
        <AppText style={styles.option}>Criar conta</AppText>
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
  titulo1: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 20,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
  option: {
    color: colors.white,
    alignSelf: "center",
    marginTop: applyDinamicHeight(40),
    fontWeight: "600",
  },
});

export default LoginScreen;
