import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HomeStackParamList } from '@/types/Navigation';
import { useBooking } from '@/hooks/UseBooking';
import { useAuth } from '@/hooks/UseAuth';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useVehicleImage } from '@/hooks/useVehicleImage';

import VehicleCard from '@/components/booking/VehicleCard';
import DateRangeDisplay from '@/components/booking/DateRangeDisplay';
import UserInfoCard from '@/components/booking/UserInfoCard';
import PurposeInput from '@/components/booking/PurposeInput';
import DestinationInput from '@/components/booking/DestinationInput';
import ErrorCard from '@/components/booking/ErrorCard';
import BottomActionBar from '@/components/booking/BottomActionBar';

import { createBookingStyles } from './BookingStyles';
import { SlideToConfirmHandle } from '@/components/SlideToConfirm';

type BookingConfirmationRouteProp = RouteProp<HomeStackParamList, 'BookingConfirmation'>;
type BookingConfirmationNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BookingConfirmation'>;

export default function BookingConfirmationScreen() {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    const navigation = useNavigation<BookingConfirmationNavigationProp>();
    const route = useRoute<BookingConfirmationRouteProp>();
    const { vehicle, startDate, endDate } = route.params;

    const booking = useBooking();
    const auth = useAuth();
    const sliderRef = React.useRef<SlideToConfirmHandle | null>(null);

    const [purpose, setPurpose] = useState('');
    const [destination, setDestination] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { vehicleImage } = useVehicleImage(vehicle.id);

    const isValid = purpose.trim().length > 0;

    const handleConfirm = async () => {
        if (!isValid) {
            setError('Please enter a purpose for your booking');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            booking.setSelectedVehicle(vehicle);
            booking.setDateRange(new Date(startDate), new Date(endDate));

            const newBooking = await booking.createBooking(
                purpose.trim(),
                destination.trim()
            );

            navigation.navigate('BookingSuccess', { booking: newBooking });
            booking.clearBooking();
        } catch (err: any) {
            console.error('Booking error:', err);
            setError(err.message || 'Failed to create booking. Please try again.');
            setIsLoading(false);
            sliderRef.current?.reset();
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <View style={styles.contentWrapper}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={true}
                >
                    <VehicleCard vehicle={vehicle} vehicleImage={vehicleImage} />
                    <DateRangeDisplay startDate={startDate} endDate={endDate} />

                    {auth.user && <UserInfoCard user={auth.user} />}

                    <PurposeInput
                        purpose={purpose}
                        onChangePurpose={setPurpose}
                        isLoading={isLoading}
                    />

                    <DestinationInput
                        destination={destination}
                        onChangeDestination={setDestination}
                        isLoading={isLoading}
                    />

                    {error && <ErrorCard message={error} />}
                </ScrollView>
            </View>

            <BottomActionBar
                isLoading={isLoading}
                isValid={isValid}
                onConfirm={handleConfirm}
                sliderRef={sliderRef}
            />
        </SafeAreaView>
    );
}