import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, VehicleScreen, LoginScreen } from './app/Screens';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/UseAuth';

const Tab = createBottomTabNavigator();

function Navigator() {
    const auth = useAuth();

    if (auth.user == null) {
        return (
            <Tab.Navigator initialRouteName="Login">
                <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    />
            </Tab.Navigator>
        );
    }

	return (
		<Tab.Navigator initialRouteName="Home">
			<Tab.Screen
				name="Vehicles"
				component={VehicleScreen}
			/>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
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

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
