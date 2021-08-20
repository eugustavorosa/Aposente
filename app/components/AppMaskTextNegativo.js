import React from "react";
import { StyleSheet, Platform } from "react-native";
import { TextMask } from "react-native-masked-text";

import colors from "../config/colors";

function AppMaskTextNegativo({
  children,
  style,
  precision = 0,
  unit = "R$ ",
  value,
  ...otherProps
}) {
  return (
    <TextMask
      style={[styles.appText, style]}
      {...otherProps}
      value={value}
      type="money"
      options={{
        precision: precision,
        separator: ",",
        delimiter: ".",
        unit: unit,
        suffixUnit: "",
      }}
      allowFontScaling={false}
    />
  );
}

const styles = StyleSheet.create({
  appText: {
    color: colors.dark,
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "HelveticaNeue-Bold",
  },
});
export default AppMaskTextNegativo;
