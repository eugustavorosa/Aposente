import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";

import TelaConfigurações from "../screens/TelaConfigurações";
import applyDinamicHeight from "../components/valores/applyDinamicHeight";

const Stack = createStackNavigator();

const StackConfiguraçõesTeste = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    }}
  >
    <Stack.Screen
      name="TelaConfigurações"
      component={TelaConfigurações}
      options={{
        title: "Configurações",
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
        headerBackAllowFontScaling: false,
        headerTitleAllowFontScaling: false,
      }}
    />
  </Stack.Navigator>
);

export default StackConfiguraçõesTeste;
