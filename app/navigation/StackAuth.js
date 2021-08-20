import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../config/colors";

import WelcomeScreen from "../screens/WelcomeScreen";
import RegistroScreen from "../screens/RegistroScreen";
import EmailRegister from "../screens/EmailRegister";
import LoginScreen from "../screens/LoginScreen";
import EmailLogin from "../screens/EmailLogin";

const Stack = createStackNavigator();

const StackAuth = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerShown: false,
      gestureEnabled: false,
    }}
  >
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        headerLeft: null,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="Registro"
      component={RegistroScreen}
      options={{
        headerLeft: null,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="EmailRegister" component={EmailRegister} />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerLeft: null,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="EmailLogin" component={EmailLogin} />
  </Stack.Navigator>
);

export default StackAuth;
