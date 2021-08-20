import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import colors from "../../config/colors";

import AppText from "../AppText";
import ListItemSeparator from "../ListItemSeparator";
import applyDinamicHeight from "../valores/applyDinamicHeight";
import applyDinamicWidth from "../valores/applyDinamicWidth";

function MonthPicker({ date, handlePrev, handleNext }) {
  return (
    <View style={{ backgroundColor: colors.white }}>
      <View style={styles.monthPicker}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
          color="black"
          onPress={handlePrev}
        />
        <View
          style={{
            backgroundColor: colors.mediumMaisLightAinda,
            paddingVertical: applyDinamicHeight(10),
            paddingHorizontal: applyDinamicWidth(40),
            borderRadius: 20,
          }}
        >
          <AppText style={styles.month}>
            {format(date, "MMMM yyyy", { locale: ptBR })}
          </AppText>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="black"
          onPress={handleNext}
        />
      </View>
      <ListItemSeparator height={1.5} />
    </View>
  );
}

const styles = StyleSheet.create({
  monthPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: applyDinamicWidth(15),
    paddingVertical: applyDinamicWidth(15),
  },
  month: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontFamily:
      Platform.OS === "android" ? "sans-serif-medium" : "Helvetica Neue",
    color: colors.dark,
  },
});

export default MonthPicker;
