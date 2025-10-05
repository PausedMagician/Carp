import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActiveBooking } from '@/components/ActiveBooking';
import { MyCarousel } from '@/components/CarCarousel';
import { client } from '@/backend/Server';
import { theme } from '@/constants/theme';
import { HomeStackParamList } from '@/types/Navigation';
import { Booking, Vehicle } from '@/types/openapi';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Dashboard'>;

/**
 * HomeScreen - Vehicle Dashboard
 */
export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [booking, setBooking] = useState<Booking | null>(null);

    useEffect(() => {
        loadActiveBooking();
    }, []);

    /**
     * Load a user's active booking
     * ToDo: Filter by current user when auth is properly implemented
     */
    const loadActiveBooking = async () => {
        try {
            const c = await client;
            const response = await c.getAllBookings();
            const bookings = response.data;

            // Find first active booking (status = "Booked" or "Ongoing") <- VERY naive approach BRUH
            const activeBooking = bookings.find(
                (b: Booking) => b.booking_status === "Booked" || b.booking_status === "Ongoing"
            );

            if (activeBooking) {
                setBooking(activeBooking);
            }
        } catch (error) {
            console.error('Error loading active booking:', error);
        }
    };

    /**
     * Handle vehicle selection from the carousel
     */
    const handleVehiclePress = (vehicle: Vehicle) => {
        navigation.navigate('BookingDate', { vehicle });
    };

    return (
        <SafeAreaView style={localStyles.container}>
            <ActiveBooking booking={booking} />
            <MyCarousel onVehiclePress={handleVehiclePress} />
        </SafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
});