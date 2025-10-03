import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { QuickBookStackParamList } from '@/types/Navigation';

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

// ToDo: Create the respective Screens!
/*
export function QuickBookStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="DateSelection"
                component={DateSelectionScreen}
                options={{ title: 'Select Dates' }}
            />
            <Stack.Screen
                name="AvailableVehicles"
                component={AvailableVehiclesScreen}
                options={{
                    title: 'Available Vehicles',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="BookingConfirmation"
                component={BookingConfirmationScreen}
                options={{
                    title: 'Confirm Booking',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="BookingSuccess"
                component={BookingSuccessScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
}
*/