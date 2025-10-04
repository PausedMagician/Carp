import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {SettingsStackParamList} from '@/types/Navigation';

import ProfileScreen from '@/app/profile/ProfileScreen';
import {VehicleScreen} from "@/app/Screens";
//import SettingsMainScreen from '@/app/settings/SettingsMainScreen';
//import RentingHistoryScreen from '@/app/profile/RentingHistoryScreen';
//import FAQScreen from '@/app/settings/FAQScreen';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

/**
 * Navigation Model:
 * Profile accessed from Settings
 * RentingHistory accessed from Profile
 */

export default function SettingsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                animation: 'slide_from_right',
            }}
        >

            <Stack.Screen
                name="SettingsMain"
                component={ProfileScreen}
                options={{
                    title: 'Settings',
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                }}
            />

            <Stack.Screen
                name="RentingHistory"
                component={VehicleScreen} // Should be RentingHistoryScreen
                options={{
                    title: 'Renting History',
                }}
            />

            <Stack.Screen
                name="FAQ"
                component={VehicleScreen} // Should be FAQScreen
                options={{
                    title: 'FAQ',
                }}
            />
        </Stack.Navigator>
    );
}