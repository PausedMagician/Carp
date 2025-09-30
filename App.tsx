import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, VehicleScreen } from './app/Screens';

const Tab = createBottomTabNavigator();

function Navigator() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Vehicles" component={VehicleScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // return <Navigation />;
  return <NavigationContainer><Navigator /></NavigationContainer>;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
