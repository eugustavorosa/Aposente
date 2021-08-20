import React from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as StoreReview from "expo-store-review";

import * as firebase from "firebase";
import { useTransações } from "../components/context/TransaçãoProvider";
import colors from "../config/colors";

import AppText from "../components/AppText";
import ContainerConfiguração from "../components/configurações/ContainerConfiguração";
import ListItemSeparator from "../components/ListItemSeparator";
import ContainerConfigEmail from "../components/configurações/ContainerConfigEmail";

function TelaConfigurações({ navigation }) {
  /////////////////////////////////////////////////// TESTE MENSALMENTE

  const { setShowButton, transações, setTransações } = useTransações();

  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

  async function sendEmailAsync() {
    let result;
    Platform.OS === "android"
      ? (result = await MailComposer.composeAsync({
          recipients: ["equipe@aposente.app"],
          subject: "Feedback Usuário (Android)",
          body: "",
        }))
      : (result = await MailComposer.composeAsync({
          recipients: ["equipe@aposente.app"],
          subject: "Feedback Usuário (iPhone)",
          body: "",
        }));
  }

  const onRate = async () => {
    if (await StoreReview.hasAction()) {
      // you can call StoreReview.requestReview()
      StoreReview.requestReview();
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Tô controlando meus gastos e projetando meu futuro com o Aposente! Dá uma olhada | https://www.instagram.com/aposenteapp/",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.tela}>
      <AppText style={styles.titulo}>Geral</AppText>
      <ContainerConfiguração
        titulo="Mudar meu plano de aposentadoria"
        onPress={() => {
          navigation.navigate("TelaPlanoInicial", { isEdit: true });
          setShowButton(false);
        }}
      />
      <ListItemSeparator
        height={0.5}
        backgroundColor={colors.mediumMaisLightAinda}
      />
      <ContainerConfiguração
        titulo="Deixe seu Feedback"
        onPress={sendEmailAsync}
      />
      <ListItemSeparator
        height={0.5}
        backgroundColor={colors.mediumMaisLightAinda}
      />
      <ContainerConfiguração titulo="Avalie" onPress={onRate} />
      <ListItemSeparator
        height={0.5}
        backgroundColor={colors.mediumMaisLightAinda}
      />
      <ContainerConfiguração titulo="Indique" onPress={onShare} />
      <AppText style={styles.titulo}>Conta</AppText>
      <ContainerConfigEmail email={email} />
      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut();
          navigation.navigate("Auth");
          setShowButton(false);
        }}
      >
        <AppText style={styles.sair}>Sair</AppText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  tela: {
    backgroundColor: colors.backgroundCard,
  },
  titulo: {
    color: colors.dark,
    fontSize: 19,
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  sair: {
    alignSelf: "center",
    marginTop: 25,
    fontSize: 20,
    color: colors.danger,
  },
});

export default TelaConfigurações;
