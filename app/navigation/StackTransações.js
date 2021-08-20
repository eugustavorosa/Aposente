import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";

import TelaTransações from "../screens/TelaTransações";
import TelaPréTransações from "../screens/TelaPréTransações";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

const Stack = createStackNavigator();

const StackTransaçõesTeste = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    }}
  >
    <Stack.Screen
      name="TelaPréTransações"
      component={TelaPréTransações}
      options={{
        title: "Transações",
        headerStyle: {
          backgroundColor: colors.primary,
          height: applyDinamicHeight(105),
        },

        headerLeft: null,
        gestureEnabled: false,
        headerTitleStyle: {
          fontWeight: "700",
          alignSelf: "center",
          fontSize: 14,
          marginBottom: Platform.OS === "android" ? 20 : 0,
        },
        headerTitleAllowFontScaling: false,
      }}
    />
    <Stack.Screen
      name="TelaTransações"
      component={TelaTransações}
      options={{
        title: "Todas as transações",
        headerTitleAllowFontScaling: false,
      }}
    />
  </Stack.Navigator>
);

export default StackTransaçõesTeste;
