import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";

import TelaInvestimentos from "../screens/TelaInvestimentos";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

const Stack = createStackNavigator();

const StackInvestimentos = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    }}
  >
    <Stack.Screen
      name="TelaInvestimentos"
      component={TelaInvestimentos}
      options={{
        title: "Investimentos",
        headerLeft: null,
        headerStyle: {
          backgroundColor: colors.primary,
          height: applyDinamicHeight(105),
        },
        headerTitleStyle: {
          fontWeight: "700",
          alignSelf: "center",
          fontSize: 14,
          marginBottom: Platform.OS === "android" ? 20 : 0,
        },
        headerTitleAllowFontScaling: false,
      }}
    />
  </Stack.Navigator>
);

export default StackInvestimentos;
