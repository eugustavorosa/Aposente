import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as firebase from "firebase";
import { useTransações } from "../context/TransaçãoProvider";
import colors from "../config/colors";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AuthButton from "../components/auth/AuthButton";
import Loading from "../components/Loading";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";

function EmailLogin({ navigation }) {
  const { setShowButton } = useTransações();

  const [userEmail, setUserEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const [loading, setLoading] = useState(false);

  const onLoginSuccess = () => {
    setUserEmail("");
    setSenha("");
    setLoading(false);
    setErroEmail("");
    setErroSenha("");
    navigation.navigate("Casa");
    setShowButton(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.tela}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={35}
            color={colors.white}
            style={styles.back}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <Image
          style={styles.icon}
          source={require("../assets/iconSombreado.png")}
        />
        <AppText style={styles.titulo}>Entrar na conta</AppText>
        <View style={{ marginTop: applyDinamicHeight(100) }}>
          <AppText style={styles.subTitulo}>Seu email</AppText>
          <View style={{ alignSelf: "center" }}>
            <AppTextInput
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
              placeholder="equipe@aposente.app"
              keyboardType="email-address"
              borderRadius={10}
              width="80%"
              borderWidth={0}
              autoCorrect={false}
              aspectRatio={10 / 1.4}
            />
          </View>
          <AppText style={styles.error}>{erroEmail}</AppText>
        </View>
        <View style={{ marginTop: applyDinamicHeight(10) }}>
          <AppText style={styles.subTitulo}>Senha</AppText>
          <View style={{ alignSelf: "center" }}>
            <AppTextInput
              value={senha}
              onChangeText={(text) => setSenha(text)}
              placeholder="**********"
              keyboardType="default"
              borderRadius={10}
              width="80%"
              borderWidth={0}
              secureTextEntry={true}
              aspectRatio={10 / 1.4}
            />
          </View>
        </View>
        <AppText style={styles.error}>{erroSenha}</AppText>

        <View style={{ marginTop: applyDinamicHeight(60) }}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <AuthButton
                titulo="Entrar na conta"
                onPress={() => {
                  setErroEmail("");
                  setErroSenha("");
                  setLoading(true);
                  firebase
                    .auth()
                    .signInWithEmailAndPassword(
                      userEmail.toString().trim(),
                      senha
                    )
                    .then(onLoginSuccess)
                    .catch(function (error) {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      if (errorCode === "auth/wrong-password") {
                        alert("Senha incorreta.");
                        setLoading(false);
                        setErroSenha("Senha incorreta.");
                        return;
                      }
                      if (errorCode === "auth/invalid-email") {
                        alert("Email inválido.");
                        setLoading(false);
                        setErroEmail("Email inválido.");
                        return;
                      }
                      if (errorCode === "auth/user-not-found") {
                        alert("Email não registrado.");
                        setLoading(false);
                        setErroEmail("Email não registrado.");
                        return;
                      } else {
                        alert(errorMessage);
                        setErroEmail("Algo deu errado, tente novamente.");
                        setLoading(false);
                        return;
                      }
                      setLoading(false);
                    });
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  firebase
                    .auth()
                    .sendPasswordResetEmail(userEmail)
                    .then(function () {
                      // Email sent.
                      Alert.alert(
                        "O e-mail de recuperação foi enviado",
                        "Cheque o lixo eletrônico",
                        [
                          {
                            text: "OK",
                            onPress: () => {},
                          },
                        ],
                        { cancelable: false }
                      );
                    })
                    .catch(function (error) {
                      alert(error);
                    });
                }}
              >
                <AppText style={styles.recuperarSenha}>Recuperar senha</AppText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    marginTop: applyDinamicHeight(45),
    marginLeft: applyDinamicWidth(15),
  },
  error: {
    fontSize: 17,
    color: colors.white,
    marginLeft: applyDinamicWidth(45),
    marginTop: applyDinamicHeight(5),
    fontWeight: "200",
  },
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
    fontSize: applyDinamicWidth(20),
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    marginTop: 10,
  },
  subTitulo: {
    color: colors.white,
    marginLeft: "11%",
    marginBottom: 8,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(18),
  },
  recuperarSenha: {
    alignSelf: "center",
    marginTop: applyDinamicHeight(50),
    color: colors.white,
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(15),
  },
});

export default EmailLogin;
