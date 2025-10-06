import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActiveBooking } from '@/components/ActiveBooking';
import { MyCarousel } from '@/components/CarCarousel';
import { client } from '@/backend/Server';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { createHomeStyles } from './HomeStyles';
import { HomeStackParamList } from '@/types/Navigation';
import { Booking, Vehicle } from '@/types/openapi';
import { useAuth } from '@/hooks/UseAuth';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Dashboard'>;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [booking, setBooking] = useState<Booking | null>(null);
    const theme = useThemedStyles();
    const styles = createHomeStyles(theme);
    const auth = useAuth();

    useEffect(() => {
        loadActiveBooking();
    }, []);

    const loadActiveBooking = async () => {
        if (!auth.user) {
            console.log('No user logged in');
            return;
        }

        try {
            const c = await client;
            const response = await c.getEmployeeCurrentBookingsById(auth.user.id);
            const bookings = response.data;

            if (bookings.length > 0) {
                setBooking(bookings[0]);
            }
        } catch (error) {
            console.error('Error loading active booking:', error);
        }
    };

    const handleVehiclePress = (vehicle: Vehicle) => {
        navigation.navigate('BookingDate', { vehicle });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ActiveBooking booking={booking} />
            <MyCarousel onVehiclePress={handleVehiclePress} />
        </SafeAreaView>
    );
}