import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WeekScreen from '../screens/WeekScreen';
import DayScreen from '../screens/DayScreen';
import MealScreen from '../screens/MealScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  Tabs: undefined;
  Day: { dayId: string };
  Meal: { dayId: string; mealId: string; title: string; description: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Semana" component={WeekScreen} />
      <Tab.Screen name="Compras" component={ShoppingListScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Day" component={DayScreen} options={{ title: 'Día' }} />
        <Stack.Screen name="Meal" component={MealScreen} options={{ title: 'Comida' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
