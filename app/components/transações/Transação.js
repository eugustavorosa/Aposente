import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ptBR } from "date-fns/locale";
import { format, parseISO } from "date-fns";

import AppText from "../AppText";
import Icon from "../Icon";
import colors from "../../config/colors";
import AppMaskText from "../AppMaskText";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function Transação({
  title,
  tipoTransação,
  valor,
  nameIcon,
  backgroundColorIcon,
  sizeIcon,
  iconColor,
  onPress,
  renderRightActions,
  dataTransação,
  fontSize = applyDinamicWidth(16),
  isMensal,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        underlayColor={colors.primary}
        activeOpacity={0.1}
        onPress={onPress}
        style={{ backgroundColor: colors.white }}
      >
        <View style={styles.container}>
          <Icon
            name={nameIcon}
            backgroundColor={backgroundColorIcon}
            size={sizeIcon}
            iconColor={iconColor}
          />
          <View style={styles.detailsContainer}>
            <AppText style={[styles.title, { fontSize }]} numberOfLines={1}>
              {title}
            </AppText>
            <View style={{ flexDirection: "row" }}>
              <AppText style={styles.subTitle} numberOfLines={1}>
                {format(parseISO(dataTransação), "d", { locale: ptBR })} de{" "}
                {format(parseISO(dataTransação), "MMMM", { locale: ptBR })}
              </AppText>
              {isMensal && (
                <MaterialCommunityIcons
                  name="repeat"
                  size={13}
                  color={colors.medium}
                  style={{
                    alignSelf: "center",
                    marginLeft: applyDinamicWidth(4),
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.containerValor}>
            {tipoTransação === "despesa" && (
              <AppMaskText value={valor} style={styles.despesa} />
            )}
            {tipoTransação === "receita" && (
              <AppMaskText value={valor} style={styles.receita} />
            )}
            {tipoTransação === "aporte" && (
              <AppMaskText value={valor} style={styles.aporte} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: applyDinamicWidth(15),
  },
  containerValor: {
    flex: 0.5,
    flexShrink: 1,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: applyDinamicWidth(10),
    justifyContent: "center",
  },
  subTitle: {
    color: colors.medium,
    fontSize: applyDinamicWidth(12),
  },
  title: {
    fontWeight: "400",
  },
  despesa: {
    alignSelf: "flex-end",
    fontSize: applyDinamicWidth(13),
    color: colors.despesa,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica Neue",
  },
  receita: {
    alignSelf: "flex-end",
    fontSize: applyDinamicWidth(13),
    color: colors.receita,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica Neue",
  },
  aporte: {
    alignSelf: "flex-end",
    fontSize: applyDinamicWidth(13),
    color: colors.primary,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica Neue",
  },
});

export default Transação;
