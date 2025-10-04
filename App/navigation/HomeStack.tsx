import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {HomeStackParamList} from '@/types/Navigation';

import HomeScreen from '@/app/HomeScreen';
//import BookingDateScreen from '@/app/booking/BookingDateScreen';
//import BookingConfirmationScreen from '@/app/booking/BookingConfirmationScreen';
//import BookingSuccessScreen from '@/app/booking/BookingSuccessScreen';

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
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{ title: 'Vehicle Dashboard' }}
            />
            {/*<Stack.Screen*/}
            {/*    name="BookingDate"*/}
            {/*    component={BookingDateScreen}*/}
            {/*    options={{*/}
            {/*        title: 'Select Dates',*/}
            {/*        headerShown: true,*/}
            {/*        headerBackTitle: 'Back',*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Stack.Screen*/}
            {/*    name="BookingConfirmation"*/}
            {/*    component={BookingConfirmationScreen}*/}
            {/*    options={{*/}
            {/*        title: 'Confirm Booking',*/}
            {/*        headerShown: true,*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Stack.Screen*/}
            {/*    name="BookingSuccess"*/}
            {/*    component={BookingSuccessScreen}*/}
            {/*    options={{*/}
            {/*        headerShown: false,*/}
            {/*        gestureEnabled: false,*/}
            {/*    }}*/}
            {/*/>*/}
        </Stack.Navigator>
    );
}