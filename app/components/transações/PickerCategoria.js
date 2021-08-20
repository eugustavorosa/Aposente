import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

import AppText from "../AppText";
import Icon from "../Icon";
import ListItemSeparator from "../ListItemSeparator";
import PickerItem from "./PickerItem";
import Tela from "../Tela";
import applyDinamicWidth from "../valores/applyDinamicWidth";
import applyDinamicHeight from "../valores/applyDinamicHeight";

function PickerCategoria({
  items,
  iconName,
  onSelectItem,
  placeholder,
  selectedItem,
  stylePlaceholder,
  width = "95%",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          <Icon name={iconName} />
          <AppText style={[styles.placeholder, stylePlaceholder]}>
            {selectedItem ? selectedItem.label : placeholder}
          </AppText>
        </View>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <Tela>
          <View style={{ flexDirection: "row" }}>
            <AppText style={styles.titulo}>Categorias:</AppText>
            <MaterialCommunityIcons
              name="close"
              color={colors.primary}
              style={{
                alignSelf: "center",
                marginLeft: applyDinamicWidth(250),
              }}
              size={applyDinamicWidth(34)}
              onPress={() => setModalVisible(false)}
            />
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
                name={item.name}
              />
            )}
            ItemSeparatorComponent={() => <ListItemSeparator height={1.3} />}
          />
        </Tela>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    paddingLeft: applyDinamicWidth(20),
    padding: applyDinamicWidth(5),
    alignContent: "center",
    marginTop: applyDinamicHeight(5),
    marginBottom: applyDinamicHeight(5),
  },
  placeholder: {
    alignSelf: "center",
    color: colors.dark,
    marginLeft: applyDinamicWidth(13),
  },
  titulo: {
    color: colors.dark,
    fontSize: applyDinamicWidth(20),
    paddingLeft: applyDinamicWidth(15),
    paddingTop: applyDinamicHeight(10),
    paddingBottom: applyDinamicHeight(15),
    fontWeight: "bold",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
  },
});

export default PickerCategoria;
