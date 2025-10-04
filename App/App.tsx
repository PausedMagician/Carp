import { Button, StyleSheet, Text, View } from 'react-native';

import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, VehicleScreen, LoginScreen, SettingsScreen } from './app/Screens';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/UseAuth';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext } from "@/contexts/ThemeContext";
import { settingsStyles } from '@/app/settings/SettingsStyles';
import { useThemedStyles } from './hooks/useThemedStyles';
import { ThemeProvider } from './app/settings/ThemeProvider';

const Tab = createBottomTabNavigator();

function Navigator() {
	const { darkMode } = useContext(ThemeContext);
	const s = useThemedStyles(settingsStyles);
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
		<Tab.Navigator initialRouteName="Home" screenOptions={{
				tabBarStyle: { backgroundColor: darkMode ? "#333" : "#fff" },
          		headerStyle: { backgroundColor: darkMode ? "#555" : "#fff" },
          		headerTintColor: darkMode ? "#fff" : "#000",
          		headerTitleStyle: { fontWeight: "bold" },
          	}}>
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
				headerShown: false, // Stack in settings handles headers itself
				tabBarIcon: ({ size, color }) => (
				<Feather name="settings" size={20} color={s.rowText.color}  />
				),
			}}
			/>

		</Tab.Navigator>
	);
}

export default function App() {
	return (
        <AuthProvider>
			<ThemeProvider>
				<NavigationContainer>
					<Navigator />
				</NavigationContainer>
			</ThemeProvider>
        </AuthProvider>
	);
}