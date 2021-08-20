import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FAB, Portal } from "react-native-paper";
import { addMonths } from "date-fns";

import colors from "../config/colors";
import * as firebase from "firebase";
import { useTransações } from "./context/contextProvider";

import Despesa from "../screens/Despesa";
import Receita from "../screens/Receita";
import Aporte from "../screens/Aporte";
import applyDinamicWidth from "./valores/applyDinamicWidth";
import applyDinamicHeight from "./valores/applyDinamicHeight";
import applyDinamicSize from "./valores/applyDinamicSize";

function FloatingActionButtonNovo(props) {
  ////////////////////////// user info

  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

  //////////////////////////// FAB THINGS

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  ///////////////////////////////////////

  const { transações, setTransações, showButton, setShowButton } =
    useTransações();
  const [modalVisibleDespesa, setModalVisibleDespesa] = useState(false);
  const [modalVisibleReceita, setModalVisibleReceita] = useState(false);
  const [modalVisibleAporte, setModalVisibleAporte] = useState(false);
  const navigation = useNavigation();

  ///////////////////////////////////////////// BACK END THINGS

  const cadeTransa = () => {
    if (user != null) {
      firebase
        .database()
        .ref("users/" + uid)
        .on("value", (snapshot) => {
          const transações = snapshot.val().transações;
          if (transações !== null) setTransações(JSON.parse(transações));
        });
    }
  };

  useEffect(() => {
    cadeTransa();
  }, []);

  const handleOnSubmitDespesaFirebase = (
    descrição,
    valorTransação,
    category,
    dataTransação,
    isMensal
  ) => {
    if (isMensal) {
      const transaçãoNova = {
        id: Date.now(),
        title: descrição,
        valor: valorTransação,
        dataTransação,
        nameIcon: category.name,
        category,
        tipoTransação: "despesa",
        isMensal: true,
      };

      const transação1 = {
        id: transaçãoNova.id + "+",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 1),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação2 = {
        id: transaçãoNova.id + "++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 2),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação3 = {
        id: transaçãoNova.id + "+++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 3),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação4 = {
        id: transaçãoNova.id + "++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 4),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação5 = {
        id: transaçãoNova.id + "+++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 5),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação6 = {
        id: transaçãoNova.id + "++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 6),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação7 = {
        id: transaçãoNova.id + "+++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 7),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação8 = {
        id: transaçãoNova.id + "++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 8),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação9 = {
        id: transaçãoNova.id + "+++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 9),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação10 = {
        id: transaçãoNova.id + "++++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 10),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação11 = {
        id: transaçãoNova.id + "+++++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 11),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const updatedTransações = [
        ...transações,
        transaçãoNova,
        transação1,
        transação2,
        transação3,
        transação4,
        transação5,
        transação6,
        transação7,
        transação8,
        transação9,
        transação10,
        transação11,
      ];

      setTransações(updatedTransações.flat(Infinity));
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(updatedTransações));
      navigation.navigate("TelaTransações");
      setModalVisibleDespesa(false);
    } else {
      const transaçãoNova = {
        id: Date.now(),
        title: descrição,
        valor: valorTransação,
        dataTransação,
        nameIcon: category.name,
        category,
        tipoTransação: "despesa",
      };
      const updatedTransações = [...transações, transaçãoNova];
      setTransações(updatedTransações);
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(updatedTransações));
      navigation.navigate("TelaTransações");
      setModalVisibleDespesa(false);
    }
  };

  const handleOnSubmitReceitaFirebase = (
    descrição,
    valorTransação,
    category,
    dataTransação,
    isMensal
  ) => {
    if (isMensal) {
      const transaçãoNova = {
        id: Date.now(),
        title: descrição,
        valor: valorTransação,
        dataTransação,
        nameIcon: category.name,
        category,
        tipoTransação: "receita",
        isMensal: true,
      };

      const transação1 = {
        id: transaçãoNova.id + "+",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 1),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação2 = {
        id: transaçãoNova.id + "++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 2),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação3 = {
        id: transaçãoNova.id + "+++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 3),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação4 = {
        id: transaçãoNova.id + "++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 4),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação5 = {
        id: transaçãoNova.id + "+++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 5),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação6 = {
        id: transaçãoNova.id + "++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 6),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação7 = {
        id: transaçãoNova.id + "+++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 7),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação8 = {
        id: transaçãoNova.id + "++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 8),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação9 = {
        id: transaçãoNova.id + "+++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 9),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação10 = {
        id: transaçãoNova.id + "++++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 10),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação11 = {
        id: transaçãoNova.id + "+++++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 11),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const updatedTransações = [
        ...transações,
        transaçãoNova,
        transação1,
        transação2,
        transação3,
        transação4,
        transação5,
        transação6,
        transação7,
        transação8,
        transação9,
        transação10,
        transação11,
      ];

      setTransações(updatedTransações.flat(Infinity));
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(updatedTransações));
      navigation.navigate("TelaTransações");
      setModalVisibleReceita(false);
    } else {
      const transaçãoNova = {
        id: Date.now(),
        title: descrição,
        valor: valorTransação,
        dataTransação,
        nameIcon: category.name,
        category,
        tipoTransação: "receita",
      };
      const updatedTransações = [...transações, transaçãoNova];
      setTransações(updatedTransações);
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(updatedTransações));
      navigation.navigate("TelaTransações");
      setModalVisibleReceita(false);
    }
  };

  const handleOnSubmitAporteFirebase = (
    descrição,
    valorTransação,
    category,
    dataTransação,
    isMensal
  ) => {
    if (isMensal) {
      const transaçãoNova = {
        id: Date.now(),
        title: descrição,
        valor: valorTransação,
        dataTransação,
        nameIcon: category.name,
        category,
        tipoTransação: "aporte",
        isMensal: true,
      };

      const transação1 = {
        id: transaçãoNova.id + "+",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 1),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação2 = {
        id: transaçãoNova.id + "++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 2),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação3 = {
        id: transaçãoNova.id + "+++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 3),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação4 = {
        id: transaçãoNova.id + "++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 4),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação5 = {
        id: transaçãoNova.id + "+++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 5),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação6 = {
        id: transaçãoNova.id + "++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 6),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação7 = {
        id: transaçãoNova.id + "+++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 7),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação8 = {
        id: transaçãoNova.id + "++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 8),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação9 = {
        id: transaçãoNova.id + "+++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 9),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação10 = {
        id: transaçãoNova.id + "++++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 10),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const transação11 = {
        id: transaçãoNova.id + "+++++++++++",
        title: transaçãoNova.title,
        valor: transaçãoNova.valor,
        dataTransação: addMonths(transaçãoNova.dataTransação, 11),
        nameIcon: transaçãoNova.nameIcon,
        category: transaçãoNova.category,
        tipoTransação: transaçãoNova.tipoTransação,
        isMensal: true,
      };
      const updatedTransações = [
        ...transações,
        transaçãoNova,
        transação1,
        transação2,
        transação3,
        transação4,
        transação5,
        transação6,
        transação7,
        transação8,
        transação9,
        transação10,
        transação11,
      ];

      setTransações(updatedTransações.flat(Infinity));
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(updatedTransações));
      navigation.navigate("TelaTransações");
      setModalVisibleAporte(false);
    } else {
      const transaçãoNova = {
        id: Date.now(),
        title: descrição,
        valor: valorTransação,
        dataTransação,
        nameIcon: category.name,
        category,
        tipoTransação: "aporte",
      };
      const updatedTransações = [...transações, transaçãoNova];
      setTransações(updatedTransações);
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(updatedTransações));
      navigation.navigate("TelaTransações");
      setModalVisibleAporte(false);
    }
  };

  /////////////////////////////////////////////////////////////////////////

  return showButton ? (
    <>
      <View style={styles.container}>
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? "plus-thick" : "plus"}
            actions={[
              {
                icon: "account-cash",
                onPress: () => setModalVisibleAporte(true),
                style: styles.fabInside,
                color: colors.primary,
              },
              {
                icon: "cash-plus",
                onPress: () => setModalVisibleReceita(true),
                style: styles.fabInside,
                color: colors.receita,
              },
              {
                icon: "cash-minus",
                onPress: () => setModalVisibleDespesa(true),
                style: styles.fabInside,
                color: colors.despesa,
              },
            ]}
            onStateChange={onStateChange}
            fabStyle={styles.fab}
            style={styles.group}
          />
        </Portal>
      </View>
      <Modal visible={modalVisibleAporte} animationType="slide">
        <Aporte
          onPressCancelar={() => setModalVisibleAporte(false)}
          onSubmit={handleOnSubmitAporteFirebase}
        />
      </Modal>
      <Modal visible={modalVisibleReceita} animationType="slide">
        <Receita
          onPressCancelar={() => setModalVisibleReceita(false)}
          onSubmit={handleOnSubmitReceitaFirebase}
        />
      </Modal>
      <Modal visible={modalVisibleDespesa} animationType="slide">
        <Despesa
          onPressCancelar={() => setModalVisibleDespesa(false)}
          onSubmit={handleOnSubmitDespesaFirebase}
        />
      </Modal>
    </>
  ) : null;
}

const styles = StyleSheet.create({
  actionButton: {
    marginRight: applyDinamicWidth(48),
  },
  actionButtonItem: {
    marginRight: applyDinamicWidth(90),
  },
  actionButtonIconAporte: {
    fontSize: applyDinamicWidth(20),
    height: applyDinamicHeight(22),
    color: colors.primary,
  },
  actionButtonIconDespesa: {
    fontSize: applyDinamicWidth(20),
    height: applyDinamicHeight(22),
    color: colors.despesa,
  },
  actionButtonIconReceita: {
    fontSize: applyDinamicWidth(20),
    height: applyDinamicHeight(22),
    color: colors.receita,
  },
  container: {
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
    width: applyDinamicWidth(70),
    bottom: 0,
  },
  group: {},
  fab: {
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderRadius: 25,
    bottom: applyDinamicSize(-15),
    right: applyDinamicWidth(-1),
    height: applyDinamicWidth(40),
    width: applyDinamicWidth(65),
    justifyContent: "center",
    alignItems: "center",
  },
  fabInside: {
    alignSelf: "center",
    marginRight: applyDinamicWidth(160),
    color: colors.dark,
  },
});

export default FloatingActionButtonNovo;
