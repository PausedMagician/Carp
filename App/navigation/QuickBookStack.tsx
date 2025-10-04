import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { QuickBookStackParamList } from '@/types/Navigation';
import {VehiclesScreen} from "@/app/Screens";

//import DateSelectionScreen from '@/app/booking/DateSelectionScreen';
//import AvailableVehiclesScreen from '@/app/booking/AvailableVehiclesScreen';
//import BookingConfirmationScreen from '@/app/booking/BookingConfirmationScreen';
//import BookingSuccessScreen from '@/app/booking/BookingSuccessScreen';

const Stack = createNativeStackNavigator<QuickBookStackParamList>();

/**
 * Handles the date-first booking flow (see Navigation Model):
 * DateSelection -> AvailableVehicles -> BookingConfirmation -> BookingSuccess
 *
 * User selects dates first, then sees only available vehicles for those dates
 */
export default function QuickBookStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="DateSelection"
                component={VehiclesScreen} // Should be DateSelectionScreen
                options={{ title: 'Select Dates' }}
            />
            <Stack.Screen
                name="AvailableVehicles"
                component={VehiclesScreen} // Should be AvailableVehicleScreen
                options={{
                    title: 'Available Vehicles',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="BookingConfirmation"
                component={VehiclesScreen} // Should be BookingConfirmationScreen
                options={{
                    title: 'Confirm Booking',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="BookingSuccess"
                component={VehiclesScreen} // Should be BookingSuccessScreen
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
}