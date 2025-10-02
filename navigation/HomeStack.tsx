import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/Booking';

import HomeScreen from '@/app/Home';
// import BookingDateScreen from '@/app/Screens/booking/BookingDateScreen';
// import BookingConfirmationScreen from '@/app/Screens/booking/BookingConfirmationScreen';
// import BookingSuccessScreen from '@/app/Screens/booking/BookingSuccessScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Home Stack Navigator
 * Handles the Vehicle Dashboard and booking flow (see Navigation Model) when the user selects a car
 */
export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Custom headers?
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{
                    title: 'Dashboard',
                }}
            />

            {/* ToDo: These should be uncommented when the respective screens have been made */}
            {/* <Stack.Screen
        name="BookingDate"
        component={BookingDateScreen}
        options={{
          title: 'Select Dates',
          headerShown: true,
          headerBackTitle: 'Back',
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
          gestureEnabled: false, // Prevent going back
        }}
      /> */}
        </Stack.Navigator>
    );
}