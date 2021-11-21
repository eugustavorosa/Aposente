import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Alert, Modal, View } from "react-native";
import { addMonths, isSameMonth, parseISO, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as firebase from "firebase";
import { useTransações } from "../components/context/contextProvider";
import colors from "../config/colors";

import sum from "../components/valores/sum";
import valor from "../components/valores/valor";

import ListItemSeparator from "../components/ListItemSeparator";
import MonthPicker from "../components/transações/MonthPicker";
import Transação from "../components/transações/Transação";
import Despesa from "./Despesa";
import Receita from "./Receita";
import Aporte from "./Aporte";
import HeaderTransações from "../navigation/HeaderTransações";
import AppText from "../components/AppText";
import ListItemDeleteAction from "../components/transações/ListItemDeleteAction";
import TransaçõesVazias from "../components/transações/TransaçõesVazias";
import applyDinamicWidth from "../components/valores/applyDinamicWidth";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";
import FiltroModal from "../components/transações/FiltroModal";
import TotalFiltro from "../components/transações/TotalFiltro";

function TelaTransações({ route, navigation }) {
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

  ///////////////////////////////////////

  const {
    transações,
    setTransações,
    setSeatchActive,
    receitaSelected,
    setReceitaSelected,
    despesaSelected,
    setDespesaSelected,
    aporteSelected,
    setAporteSelected,
    mensalSelected,
    setMensalSelected,
    unicoSelected,
    setUnicoSelected,
    categoryFilter,
    setCategoryFilter,
  } = useTransações();

  const [transaçãoAtual, setTransaçãoAtual] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date(), { locale: ptBR });
  const [modalVisibleDespesa, setModalVisibleDespesa] = useState(false);
  const [modalVisibleReceita, setModalVisibleReceita] = useState(false);
  const [modalVisibleAporte, setModalVisibleAporte] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [modalVisibleFiltro, setModalVisibleFiltro] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  //////////////////////// get from FIREBASE

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

  //////////////////////////////////////////
  //////////////////////////////////////////
  //////////////////////////////////////////

  const handleUpdateDespesa = (
    descrição,
    valorTransação,
    category,
    dataTransação
  ) => {
    if (transações !== null) {
      const transaçõesUpdated = transações.filter((n) => {
        if (n.id === transaçãoAtual.id) {
          n.title = descrição;
          n.valor = valorTransação;
          n.category = category;
          n.dataTransação = dataTransação;
          n.isUpdated = true;
          setTransaçãoAtual(n);
        }
        return n;
      });
      setTransações(transaçõesUpdated);
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(transaçõesUpdated));
      setModalVisibleDespesa(false);
    }
  };

  const handleUpdateReceita = (
    descrição,
    valorTransação,
    category,
    dataTransação
  ) => {
    if (transações !== null) {
      const transaçõesUpdated = transações.filter((n) => {
        if (n.id === transaçãoAtual.id) {
          n.title = descrição;
          n.valor = valorTransação;
          n.category = category;
          n.dataTransação = dataTransação;
          n.isUpdated = true;
          setTransaçãoAtual(n);
        }
        return n;
      });
      setTransações(transaçõesUpdated);
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(transaçõesUpdated));
      setModalVisibleReceita(false);
    }
  };

  const handleUpdateAporte = (
    descrição,
    valorTransação,
    category,
    dataTransação
  ) => {
    if (transações !== null) {
      const transaçõesUpdated = transações.filter((n) => {
        if (n.id === transaçãoAtual.id) {
          n.title = descrição;
          n.valor = valorTransação;
          n.category = category;
          n.dataTransação = dataTransação;
          n.isUpdated = true;
          setTransaçãoAtual(n);
        }
        return n;
      });
      setTransações(transaçõesUpdated);
      firebase
        .database()
        .ref("users/" + uid + "/transações")
        .set(JSON.stringify(transaçõesUpdated));
      setModalVisibleAporte(false);
    }
  };

  const displayAlert = (transação) => {
    Alert.alert(
      "Você tem certeza?",
      "Isso irá apagar sua transação permanentemente.",
      [
        {
          text: "Sim",
          onPress: () => handleDelete(transação),
        },
        {
          text: "Não",
        },
      ],
      { cancelable: false }
    );
  };

  const displayAlertMensal = (transação) => {
    Alert.alert(
      "Esta é uma transação mensal",
      "O que você quer fazer?",
      [
        {
          text: "Apagar somente esta",
          onPress: () => handleDelete(transação),
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Apagar esta e as próximas",
          onPress: () => handleDeleteMensal(transação),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (transação) => {
    const newTransações = transações.filter((m) => m.id !== transação.id);
    setTransações(newTransações);
    firebase
      .database()
      .ref("users/" + uid + "/transações")
      .set(JSON.stringify(newTransações));
  };

  const handleDeleteMensal = async (transação) => {
    const newTransações = transações
      .filter((m) => m.id !== transação.id)
      .filter((m) => m.id !== transação.id + "+")
      .filter((m) => m.id !== transação.id + "++")
      .filter((m) => m.id !== transação.id + "+++")
      .filter((m) => m.id !== transação.id + "++++")
      .filter((m) => m.id !== transação.id + "+++++")
      .filter((m) => m.id !== transação.id + "++++++")
      .filter((m) => m.id !== transação.id + "+++++++")
      .filter((m) => m.id !== transação.id + "++++++++")
      .filter((m) => m.id !== transação.id + "+++++++++")
      .filter((m) => m.id !== transação.id + "++++++++++")
      .filter((m) => m.id !== transação.id + "+++++++++++")
      .filter((m) => m.id !== transação.id + "++++++++++++");

    setTransações(newTransações);
    firebase
      .database()
      .ref("users/" + uid + "/transações")
      .set(JSON.stringify(newTransações));
  };

  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <HeaderTransações
          value={searchQuery}
          onChange={(text) => setSearchQuery(text)}
          onPressFilter={() => {
            setModalVisibleFiltro(true);
          }}
          onPressCancelar={() => {
            setSeatchActive(false);
            setSearchQuery("");
          }}
          onPressBack={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  function valor(item) {
    return item.valor;
  }

  ////////////////////////// teste CONST fora e IF dentro
  let filteredData = transações
    .sort(function (a, b) {
      return new Date(a.dataTransação) - new Date(b.dataTransação);
    })
    .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredData1 = filteredData.filter((item) => {
    if (receitaSelected) {
      return item.tipoTransação.includes("receita");
    } else {
      return filteredData;
    }
  });

  const filteredData2 = filteredData1.filter((item) => {
    if (despesaSelected) {
      return item.tipoTransação.includes("despesa");
    } else {
      return filteredData1;
    }
  });
  const filteredData3 = filteredData2.filter((item) => {
    if (aporteSelected) {
      return item.tipoTransação.includes("aporte");
    } else {
      return filteredData2;
    }
  });
  const filteredData4 = filteredData3.filter((item) => {
    if (mensalSelected) {
      return item.isMensal === true;
    } else {
      return filteredData3;
    }
  });
  const filteredData5 = filteredData4.filter((item) => {
    if (unicoSelected) {
      return item.isMensal != true;
    } else {
      return filteredData4;
    }
  });
  const filteredData6 = filteredData5.filter((item) => {
    if (categoryFilter.label != "Todas as categorias") {
      return item.category.label.includes(categoryFilter.label);
    } else {
      return filteredData5;
    }
  });

  // if (receitaSelected) {
  //   filteredData = transações
  //     .sort(function (a, b) {
  //       return new Date(a.dataTransação) - new Date(b.dataTransação);
  //     })
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
  //     .filter((item) =>
  //       item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter((item) => item.tipoTransação.includes("receita"));
  // }

  //////////////////////// filtro transações
  // let filteredData = transações
  //   .sort(function (a, b) {
  //     return new Date(a.dataTransação) - new Date(b.dataTransação);
  //   })
  //   .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
  //   .filter((item) =>
  //     item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // if (receitaSelected) {
  //   filteredData = transações
  //     .sort(function (a, b) {
  //       return new Date(a.dataTransação) - new Date(b.dataTransação);
  //     })
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
  //     .filter((item) =>
  //       item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter((item) => item.tipoTransação.includes("receita"));
  // }

  // if (despesaSelected) {
  //   filteredData = transações
  //     .sort(function (a, b) {
  //       return new Date(a.dataTransação) - new Date(b.dataTransação);
  //     })
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
  //     .filter((item) =>
  //       item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter((item) => item.tipoTransação.includes("despesa"));
  // }
  // if (aporteSelected) {
  //   filteredData = transações
  //     .sort(function (a, b) {
  //       return new Date(a.dataTransação) - new Date(b.dataTransação);
  //     })
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
  //     .filter((item) =>
  //       item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter((item) => item.tipoTransação.includes("aporte"));
  // }
  // if (mensalSelected) {
  //   filteredData = transações
  //     .sort(function (a, b) {
  //       return new Date(a.dataTransação) - new Date(b.dataTransação);
  //     })
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
  //     .filter((item) =>
  //       item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter((item) => item.isMensal === true);
  // }
  // if (unicoSelected) {
  //   filteredData = transações
  //     .sort(function (a, b) {
  //       return new Date(a.dataTransação) - new Date(b.dataTransação);
  //     })
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
  //     .filter((item) =>
  //       item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter((item) => item.isMensal != true);
  // }
  // if (categoryFilter.label != "Todas as categorias") {
  //   filteredData = transações
  //     .sort(function (a, b) {
  //       return new Date(a.dataTransação) - new Date(b.dataTransação);
  //     })
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), date))
  //     .filter((item) =>
  //       item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter((item) => item.category.label.includes(categoryFilter.label));
  // }

  /// filtro valores
  // let valorFiltrado = transações
  //   .filter((item) => isSameMonth(parseISO(item.dataTransação), new Date()))
  //   .map(valor)
  //   .reduce(sum, 0);
  // if (receitaSelected) {
  //   valorFiltrado = transações
  //     .filter((item) => item.tipoTransação.includes("receita"))
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), new Date()))
  //     .map(valor)
  //     .reduce(sum, 0);
  // }
  // if (despesaSelected) {
  //   valorFiltrado = transações
  //     .filter((item) => item.tipoTransação.includes("despesa"))
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), new Date()))
  //     .map(valor)
  //     .reduce(sum, 0);
  // }
  // if (aporteSelected) {
  //   valorFiltrado = transações
  //     .filter((item) => item.tipoTransação.includes("aporte"))
  //     .filter((item) => isSameMonth(parseISO(item.dataTransação), new Date()))
  //     .map(valor)
  //     .reduce(sum, 0);
  // }

  return (
    <>
      <View style={styles.tela}>
        <MonthPicker
          date={date}
          handlePrev={() => {
            const newDate = subMonths(date, 1);
            setDate(newDate);
          }}
          handleNext={() => {
            const newDate = addMonths(date, 1);
            setDate(newDate);
          }}
        />

        {(receitaSelected === true ||
          despesaSelected === true ||
          aporteSelected === true ||
          mensalSelected === true ||
          unicoSelected === true ||
          categoryFilter.label != "Todas as categorias") && (
          <View style={styles.avisoFiltro}>
            <AppText style={styles.avisoFiltroTexto}>
              Filtrando as transações
            </AppText>
            <MaterialCommunityIcons
              name="close"
              size={28}
              color={colors.darkPurple}
              style={styles.icon}
              onPress={() => {
                setCategoryFilter({
                  label: "Todas as categorias",
                  value: 1,
                  name: "plus",
                });
                setReceitaSelected(false);
                setDespesaSelected(false);
                setAporteSelected(false);
                setMensalSelected(false);
                setUnicoSelected(false);
              }}
            />
          </View>
        )}
        {JSON.stringify(
          transações.filter((item) =>
            isSameMonth(parseISO(item.dataTransação), date)
          )
        ) === JSON.stringify([]) && <TransaçõesVazias />}
        <FlatList
          data={filteredData6}
          keyExtractor={(transações) => transações.id.toString()}
          renderItem={({ item }) => (
            <Transação
              title={item.title}
              dataTransação={item.dataTransação}
              tipoTransação={item.tipoTransação}
              valor={item.valor}
              nameIcon={item.category.name}
              onPress={() => {
                setIsEdit(true);
                setTransaçãoAtual(item);

                {
                  item.tipoTransação === "despesa" &&
                    setModalVisibleDespesa(true);
                }
                {
                  item.tipoTransação === "receita" &&
                    setModalVisibleReceita(true);
                }
                {
                  item.tipoTransação === "aporte" &&
                    setModalVisibleAporte(true);
                }
              }}
              renderRightActions={() => (
                <ListItemDeleteAction
                  onPress={() => {
                    if (item.isMensal) {
                      displayAlertMensal(item);
                    } else {
                      displayAlert(item);
                    }
                  }}
                />
              )}
              isMensal={item.isMensal}
            />
          )}
          ItemSeparatorComponent={() => <ListItemSeparator height={2} />}
          refreshing={refreshing}
          onRefresh={cadeTransa}
        />
        <ListItemSeparator height={2} width="90%" />
        {(receitaSelected === true ||
          despesaSelected === true ||
          aporteSelected === true ||
          mensalSelected === true ||
          unicoSelected === true ||
          categoryFilter.label != "Todas as categorias") && (
          <TotalFiltro
            valorFiltrado={filteredData6.map(valor).reduce(sum, 0)}
          />
        )}
      </View>
      <Modal
        visible={modalVisibleFiltro}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <FiltroModal
          onPressCancel={() => {
            setModalVisibleFiltro(false);
            setCategoryFilter({
              label: "Todas as categorias",
              value: 1,
              name: "plus",
            });
            setReceitaSelected(false);
            setDespesaSelected(false);
            setAporteSelected(false);
          }}
          onPressFiltrar={() => {
            setModalVisibleFiltro(false);
          }}
        />
      </Modal>
      <Modal visible={modalVisibleDespesa} animationType="slide">
        <Despesa
          onPressCancelar={() => setModalVisibleDespesa(false)}
          onSubmit={handleUpdateDespesa}
          isEdit={isEdit}
          transação={transaçãoAtual}
        />
      </Modal>
      <Modal visible={modalVisibleReceita} animationType="slide">
        <Receita
          onPressCancelar={() => setModalVisibleReceita(false)}
          onSubmit={handleUpdateReceita}
          isEdit={isEdit}
          transação={transaçãoAtual}
        />
      </Modal>
      <Modal visible={modalVisibleAporte} animationType="slide">
        <Aporte
          onPressCancelar={() => setModalVisibleAporte(false)}
          onSubmit={handleUpdateAporte}
          isEdit={isEdit}
          transação={transaçãoAtual}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  avisoFiltro: {
    width: "100%",
    height: applyDinamicHeight(40),
    backgroundColor: colors.primaryLight,
    flexDirection: "row",
  },
  avisoFiltroTexto: {
    padding: 8,
    color: colors.darkPurple,
    marginLeft: applyDinamicWidth(8),
    fontWeight: "500",
    flex: 1,
  },
  icon: {
    alignSelf: "center",
    marginRight: applyDinamicWidth(10),
  },
  tela: {
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default TelaTransações;
