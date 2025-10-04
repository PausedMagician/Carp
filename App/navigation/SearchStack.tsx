import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {SearchStackParamList} from '@/types/Navigation';

import VehiclesScreen from '@/app/vehicles/VehiclesScreen';
//import BookingDateScreen from '@/app/booking/BookingDateScreen';

const Stack = createNativeStackNavigator<SearchStackParamList>();

/**
 * Handles vehicle search and filtering (see Navigation Model):
 * SearchList -> BookingDate
 *
 * User searches/filters vehicles, then proceeds to booking flow
 */
export default function SearchStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="SearchList"
                component={VehiclesScreen}
                options={{
                    title: 'Search Vehicles',
                }}
            />

            {/*<Stack.Screen*/}
            {/*    name="BookingDate"*/}
            {/*    component={BookingDateScreen}*/}
            {/*    options={{*/}
            {/*        title: 'Select Dates',*/}
            {/*        headerShown: true,*/}
            {/*        headerBackTitle: 'Search',*/}
            {/*    }}*/}
            {/*/>*/}
        </Stack.Navigator>
    );
}