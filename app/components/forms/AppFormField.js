import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({
  aspectRatio,
  name,
  width,
  prefixo,
  maxLength,
  sufixo,
  ...otherProps
}) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        prefixo={prefixo}
        sufixo={sufixo}
        maxLength={maxLength}
        width={width}
        aspectRatio={aspectRatio}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppFormField;
