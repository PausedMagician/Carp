import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {HomeStackParamList} from '@/types/Navigation';

import {HomeScreen, BookingDateScreen, BookingConfirmationScreen} from "@/app/Screens";
import BookingSuccessScreen from '@/app/booking/BookingSuccessScreen';
import {colors} from "@/constants/theme";

const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Standard booking flow (see Navigation Model):
 * Dashboard -> BookingDate -> BookingConfirmation -> BookingSuccess
 *
 * User selects a vehicle from the dashboard, then proceeds to date selection
 */
export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                presentation: 'card',
                contentStyle: {
                    backgroundColor: colors.light.background,
                },
                fullScreenGestureEnabled: false,
            }}
        >
            {/* Vehicle Dashboard */}
            <Stack.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{
                    title: 'Dashboard',
                }}
            />

            {/* Date Selection */}
            <Stack.Screen
                name="BookingDate"
                component={BookingDateScreen}
                options={{
                    title: 'Select Dates',
                    // Dates persist when navigating back via BookingContext
                }}
            />

            {/* Booking Confirmation */}
            <Stack.Screen
                name="BookingConfirmation"
                component={BookingConfirmationScreen}
                options={{
                    title: 'Confirm Booking',
                }}
            />

            {/* Success Screen */}
            <Stack.Screen
                name="BookingSuccess"
                component={BookingSuccessScreen}
                options={{
                    // No header, prevent back navigation after success
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
}