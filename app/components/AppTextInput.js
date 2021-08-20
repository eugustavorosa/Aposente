import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";
import applyDinamicWidth from "./valores/applyDinamicWidth";

function AppTextInput({
  aspectRatio,
  backgroundColor = colors.white,
  borderWidth = 1,
  borderColor = colors.dark,
  borderRadius = 15,
  autoCorrect,
  width = "95%",
  prefixo,
  maxLength,
  sufixo,
  padding = applyDinamicWidth(11),
  height,
  keyboardType = "number-pad",
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
  ...otherProps
}) {
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius,
          width,
          padding,
          borderWidth,
          height,
          backgroundColor,
          borderColor,
          aspectRatio,
        },
      ]}
    >
      <AppText style={styles.prefix}>{prefixo}</AppText>
      <TextInput
        value={value}
        maxLength={maxLength}
        style={styles.textInput}
        keyboardType={keyboardType}
        placeholderTextColor={colors.mediumLight}
        {...otherProps}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        onChangeText={onChangeText}
      />
      <AppText style={styles.sufixo}>{sufixo}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.dark,
    flexDirection: "row",
    alignItems: "center",
  },
  prefix: {
    fontSize: applyDinamicWidth(18),
    color: colors.mediumLight,
  },
  sufixo: {
    fontSize: applyDinamicWidth(18),
    color: colors.mediumLight,
  },
  textInput: {
    fontSize: applyDinamicWidth(18),
    flex: 1,
  },
});

export default AppTextInput;
