import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Provider as PaperProvider } from "react-native-paper";
import theme from "./app/config/themePaper";

import colors from "./app/config/colors";

import navigationTheme from "./app/navigation/navigationTheme";

import TransaçãoProvider from "./app/components/context/TransaçãoProvider";

import TabNavigator from "./app/navigation/TabNavigator";

import * as firebase from "firebase";

import SplashScreen from "./app/screens/SplashScreen";
import StackSetup from "./app/navigation/StackSetup";
import StackAuth from "./app/navigation/StackAuth";
import TelaSetupPlano from "./app/screens/TelaSetupPlano";
import TelaSetupPlanoFinal from "./app/screens/TelaSetupPlanoFinal";

const firebaseConfig = {
  apiKey: "AIzaSyBVLtNYw1RfMF_VN06BYYIGJ6vS7hG229U",
  authDomain: "aposente-69685.firebaseapp.com",
  databaseURL: "https://aposente-69685-default-rtdb.firebaseio.com",
  projectId: "aposente-69685",
  storageBucket: "aposente-69685.appspot.com",
  messagingSenderId: "894907566241",
  appId: "1:894907566241:web:a8221e3d7ec1d2135c88e0",
  measurementId: "G-XRDK5NRYVM",
};

///////// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Stack = createStackNavigator();

export default function App() {
  /////////////////////////// navigation tracking for analytics

  // Get the current screen from the navigation state
  function getActiveRouteName(navigationState) {
    if (!navigationState) return null;
    const route = navigationState.routes[navigationState.index];
    // Parse the nested navigators
    if (route.routes) return getActiveRouteName(route);
    return route.routeName;
  }

  ////////////////////////// user info

  const [planoFeito, setPlanoFeito] = useState(null);

  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;

    //////////////////// MANTER NO SETUP CASO NÃO TENHA FEITO O SETUP

    firebase
      .database()
      .ref("users/" + uid)
      .once("value")
      .then(function (snapshot) {
        var a = snapshot.child("plano").exists();
        setPlanoFeito(a);
      });
  }
  ///////////////////////////////////// auth change
  useMemo(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const [loggedIn, setLoggedIn] = useState(null);

  ///////////////////////////////////// STACKS

  const StackInicio = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerShown: false,
      }}
    >
      {loggedIn == null && (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
      )}
      {loggedIn == false && (
        <>
          <Stack.Screen
            name="Auth"
            component={StackAuth}
            options={{
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="Setup" component={StackSetup} />
          <Stack.Screen
            name="TelaPlanoInicial"
            component={TelaSetupPlano}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="TelaResultadoPlano"
            component={TelaSetupPlanoFinal}
          />
          <Stack.Screen
            name="Casa"
            component={TabNavigator}
            options={{
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
        </>
      )}
      {loggedIn == true && planoFeito == null && (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
      )}
      {loggedIn == true && planoFeito == true && (
        <>
          <Stack.Screen
            name="Casa"
            component={TabNavigator}
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
          <Stack.Screen
            name="TelaResultadoPlano"
            component={TelaSetupPlanoFinal}
          />
          <Stack.Screen
            name="Auth"
            component={StackAuth}
            options={{
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="Setup" component={StackSetup} />
        </>
      )}
      {loggedIn == true && planoFeito == false && (
        <>
          <Stack.Screen name="Setup" component={StackSetup} />
          <Stack.Screen
            name="Casa"
            component={TabNavigator}
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
          <Stack.Screen
            name="TelaResultadoPlano"
            component={TelaSetupPlanoFinal}
          />
          <Stack.Screen
            name="Auth"
            component={StackAuth}
            options={{
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );

  //////////////////////////////////////////////////////////

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navigationTheme}>
        <TransaçãoProvider>
          <StackInicio />
        </TransaçãoProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
