import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import Home from "../screens/Home";
import StackInvestimentos from "./StackInvestimentos";
import FloatingActionButtonNovo from "../components/FloatingActionButtonNovo";
import StackTransações from "./StackTransações";
import StackConfigurações from "./StackConfigurações";

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      tabStyle: {},
      showLabel: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Investimentos"
      component={StackInvestimentos}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account-cash"
            size={size * 1.2}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="teste"
      component={teste}
      options={{
        tabBarButton: () => <FloatingActionButtonNovo />,
      }}
    />
    <Tab.Screen
      name="TelaTransações"
      component={StackTransações}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="exchange-alt" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Configurações"
      component={StackConfigurações}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="settings" size={size * 1.2} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const teste = () => {
  return null;
};

export default TabNavigator;
