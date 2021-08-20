import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

import colors from "../config/colors";

function AppText({ children, style, numberOfLines, ...otherProps }) {
  return (
    <Text
      style={[styles.appText, style]}
      {...otherProps}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  appText: {
    color: colors.dark,
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "sans-serif" : "Helvetica Neue",
  },
});
export default AppText;
