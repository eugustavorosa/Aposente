import React from "react";
import { View, StyleSheet, Image } from "react-native";

import colors from "../config/colors";

import ButtonLogin from "../components/auth/ButtonLogin";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.tela}>
      <Image
        style={styles.icon}
        source={require("../assets/iconSombreado.png")}
      />
      <View style={{ marginTop: applyDinamicHeight(220) }}>
        <ButtonLogin
          name="Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <View style={{ marginTop: "5%" }}>
        <ButtonLogin
          name="Começar"
          backgroundColor={colors.darkPurple}
          color={colors.white}
          onPress={() => navigation.navigate("Registro")}
        />
      </View>
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
    marginTop: "20%",
  },
});

export default WelcomeScreen;
