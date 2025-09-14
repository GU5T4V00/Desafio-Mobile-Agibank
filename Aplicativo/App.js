import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import AgenciasScreen from "./screens/AgenciasScreen";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#0A45D1",
          tabBarInactiveTintColor: "#94A3B8",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Início") iconName = "home-outline";
            else if (route.name === "Conta") iconName = "wallet-outline";
            else if (route.name === "Cartões") iconName = "card-outline";
            else if (route.name === "Agências") iconName = "map-outline"; // <-- LINHA ADICIONADA
            else if (route.name === "Perfil") iconName = "person-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Conta" component={HomeScreen} />
        <Tab.Screen name="Cartões" component={HomeScreen} />
        <Tab.Screen name="Agências" component={AgenciasScreen} />
        <Tab.Screen name="Perfil" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
