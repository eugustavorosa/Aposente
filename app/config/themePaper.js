import { configureFonts, DefaultTheme } from "react-native-paper";

import colors from "./colors";

const fontConfig = {
  ios: {
    regular: {
      fontFamily: "Helvetica Neue",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Helvetica Neue",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Helvetica Neue",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Helvetica Neue",
      fontWeight: "normal",
    },
  },
  android: {
    regular: {
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
    text: colors.white,
    placeholder: colors.medium,
  },
  fonts: configureFonts(fontConfig),
  roundness: 10,
};

export default theme;
