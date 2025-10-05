import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActiveBooking } from '@/components/ActiveBooking';
import { MyCarousel } from '@/components/CarCarousel';
import { client } from '@/backend/Server';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { Theme } from '@/constants/theme';
import { HomeStackParamList } from '@/types/Navigation';
import { Booking, Vehicle } from '@/types/openapi';
import { useAuth } from '@/hooks/UseAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Dashboard'>;

/**
 * HomeScreen - Vehicle Dashboard
 */
export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [booking, setBooking] = useState<Booking | null>(null);
    const theme = useThemedStyles();
    const styles = createStyles(theme);
    const auth = useAuth();

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
            const response = await c.getEmployeeCurrentBookingsById(auth.user!.id);
            const bookings = response.data;

            if (bookings.length > 0) {
                setBooking(bookings[0]);
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

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
});