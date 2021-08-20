import React from "react";
import { StyleSheet, Image } from "react-native";

import colors from "../config/colors";

import applyDinamicHeight from "../components/valores/applyDinamicHeight";
import Loading from "../components/Loading";
import Tela from "../components/Tela";

function SplashScreen(props) {
  return (
    <Tela backgroundColor={colors.primary}>
      <Image
        style={styles.icon}
        source={require("../assets/iconSombreado.png")}
        width={applyDinamicHeight(90)}
        height={applyDinamicHeight(90)}
      />
      <Loading style={{ bottom: applyDinamicHeight(190) }} />
    </Tela>
  );
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    alignSelf: "center",
    marginTop: applyDinamicHeight(280),
  },
});

export default SplashScreen;
