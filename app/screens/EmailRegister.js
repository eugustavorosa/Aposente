import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import * as firebase from "firebase";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AuthButton from "../components/auth/AuthButton";
import Loading from "../components/Loading";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

function EmailRegister({ navigation }) {
  var user = firebase.auth().currentUser;

  if (user != null) {
    email = user.email;
    uid = user.uid;
  }

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const [loading, setLoading] = useState(false);

  ///////////////////////////////////////////////////////////////////

  const mandarEmailNome = () => {
    firebase
      .database()
      .ref("users/" + uid)
      .set({
        userEmail: userEmail,
        userName: userName,
      });
  };

  ///////////////////////////////////////////////////////////////////

  const onLoginSuccess = () => {
    setUserEmail("");
    setSenha("");
    setLoading(false);
    setErroEmail("");
    setErroSenha("");
    mandarEmailNome(); ///// teste enviar nome e email
    navigation.navigate("Setup", {
      screen: "SetupScreen",
    });
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
            size={applyDinamicWidth(35)}
            color={colors.white}
            style={styles.back}
          />
        </TouchableOpacity>
        <Image
          style={styles.icon}
          source={require("../assets/iconSombreado.png")}
        />
        <AppText style={styles.titulo}>Criar conta</AppText>
        <View style={{ marginTop: applyDinamicHeight(60) }}>
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

        <View style={{ marginTop: applyDinamicHeight(10) }}>
          <AppText style={styles.subTitulo}>Como podemos te chamar?</AppText>
          <View style={{ alignSelf: "center" }}>
            <AppTextInput
              value={userName}
              onChangeText={(text) => setUserName(text)}
              placeholder="Nome"
              keyboardType="default"
              borderRadius={10}
              width="80%"
              borderWidth={0}
              aspectRatio={10 / 1.4}
            />
          </View>
        </View>

        <View style={{ marginTop: applyDinamicHeight(60) }}>
          {loading ? (
            <Loading />
          ) : (
            <AuthButton
              titulo="Criar conta"
              onPress={() => {
                setErroEmail("");
                setErroSenha("");
                setLoading(true);
                if (senha.length < 6) {
                  Alert.alert("A senha precisa ter no mínimo 6 caracteres.");
                  setErroSenha("A senha precisa ter no mínimo 6 caracteres.");
                  setLoading(false);
                  return;
                }

                firebase
                  .auth()
                  .createUserWithEmailAndPassword(
                    userEmail.toString().trim(),
                    senha
                  )
                  .then(onLoginSuccess)
                  .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == "auth/weak-password") {
                      alert("A senha é muito fraca.");
                      setLoading(false);
                      return;
                    }
                    if (errorCode == "auth/email-already-in-use") {
                      alert("Esse email já está em uso.");
                      setErroEmail("Esse email já está em uso.");
                      setLoading(false);
                      return;
                    }
                    if (errorCode == "auth/invalid-email") {
                      alert("Esse email é inválido.");
                      setErroEmail("Esse email é inválido.");
                      setLoading(false);
                      return;
                    } else {
                      alert(errorMessage);
                      setErroEmail("Algo deu errado, tente novamente.");
                      setLoading(false);
                    }
                    setLoading(false);
                  });
              }}
            />
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
    marginLeft: 45,
    marginTop: 5,
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
    marginTop: applyDinamicHeight(90),
  },
  titulo: {
    alignSelf: "center",
    color: colors.white,
    fontSize: applyDinamicWidth(20),
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    marginTop: applyDinamicHeight(10),
  },
  subTitulo: {
    color: colors.white,
    marginLeft: "11%",
    marginBottom: applyDinamicHeight(8),
    fontWeight: "600",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    fontSize: applyDinamicWidth(18),
  },
});

export default EmailRegister;
