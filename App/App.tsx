import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, VehicleScreen, LoginScreen, SettingsScreen } from './app/Screens';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/UseAuth';
import Feather from '@expo/vector-icons/Feather';

const Tab = createBottomTabNavigator();

function Navigator() {
    const auth = useAuth();

    if (auth.user == null) {
        return (
            <Tab.Navigator key="guest" initialRouteName="Login">
                <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    />
            </Tab.Navigator>
        );
    }

	return (
		<Tab.Navigator key="user" initialRouteName="Home">
			<Tab.Screen
				name="Vehicles"
				component={VehicleScreen}
			/>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
			/>
			<Tab.Screen
			name="Settings"
			component={SettingsScreen}
			options={{
				headerShown: false, // your stack handles headers
				tabBarIcon: ({ size }) => (
				<Feather name="settings" size={20} />
				),
			}}
			/>

		</Tab.Navigator>
	);
}

export default function App() {
	return (
        <AuthProvider>
            <NavigationContainer>
                <Navigator />
            </NavigationContainer>
        </AuthProvider>
	);
}