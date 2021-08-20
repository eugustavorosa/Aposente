import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";

import GastosMensaisInput from "../screens/GastosMensaisInput";
import GastosMensaisSelect from "../screens/GastosMensaisSelect";
import RendaMensal from "../screens/RendaMensal";
import SetupScreen from "../screens/SetupScreen";
import TelaSetupPlano from "../screens/TelaSetupPlano";
import TelaSetupPlanoFinal from "../screens/TelaSetupPlanoFinal";

const Stack = createStackNavigator();

const StackSetup = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerShown: false,
      gestureEnabled: false,
    }}
  >
    <Stack.Screen
      name="SetupScreen"
      component={SetupScreen}
      options={{
        headerLeft: null,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="RendaMensal"
      component={RendaMensal}
      options={{
        headerLeft: null,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="GastosMensaisSelect"
      component={GastosMensaisSelect}
      options={{
        headerLeft: null,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="GastosMensaisInput"
      component={GastosMensaisInput}
      options={{
        headerLeft: null,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="TelaPlanoInicial"
      component={TelaSetupPlano}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen name="TelaResultadoPlano" component={TelaSetupPlanoFinal} />
  </Stack.Navigator>
);

export default StackSetup;
