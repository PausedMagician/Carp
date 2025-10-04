import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { useAuth } from './hooks/UseAuth';

import LoginScreen from './app/login/LoginScreen';
import HomeScreen from './app/HomeScreen';
import VehiclesScreen from './app/vehicles/VehiclesScreen';
import ProfileScreen from './app/profile/ProfileScreen';

import { theme } from './constants/theme';

const Tab = createBottomTabNavigator();

function Navigator() {
    const auth = useAuth();

    // If not logged in, show login screen
    if (auth.user == null) {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Login" component={LoginScreen} />
            </Tab.Navigator>
        );
    }

    // If logged in, show main tabs
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Vehicles" component={VehiclesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
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