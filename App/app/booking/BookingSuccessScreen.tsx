import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HomeStackParamList } from '@/types/Navigation';
import { useBooking } from '@/hooks/UseBooking';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useVehicleImage } from '@/hooks/useVehicleImage';

import VehicleCard from '@/components/booking/VehicleCard';
import DateRangeDisplay from '@/components/booking/DateRangeDisplay';
import BookingDetailRow from '@/components/booking/BookingDetailRow';

import { createBookingStyles } from '@/app/booking/BookingStyles';
import { ICONS } from '@/constants/icons';
import { Vehicle } from '@/types/openapi';

type BookingSuccessRouteProp = RouteProp<HomeStackParamList, 'BookingSuccess'>;
type BookingSuccessNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BookingSuccess'>;

export default function BookingSuccessScreen() {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    const navigation = useNavigation<BookingSuccessNavigationProp>();
    const route = useRoute<BookingSuccessRouteProp>();
    const { booking } = route.params;

    const bookingContext = useBooking();
    const { vehicleImage } = useVehicleImage(booking.vehicle?.id);

    const handleBackToDashboard = () => {
        bookingContext.clearBooking();
        navigation.navigate('Dashboard');
    };

    const handleBookAnother = () => {
        bookingContext.clearBooking();
        navigation.navigate('Dashboard');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <ScrollView style={styles.scrollView}>
                {/* Success header */}
                <View style={styles.successHeader}>
                    <View style={styles.successIconContainer}>
                        <View style={styles.successIcon}>
                            <Image
                                source={ICONS.check}
                                style={{ width: 48, height: 48 }}
                            />
                        </View>
                    </View>
                    <Text style={styles.successTitle}>Booking Confirmed!</Text>
                    <Text style={styles.successSubtitle}>
                        Your vehicle has been successfully reserved
                    </Text>
                </View>

                {/* Booking reference */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Booking Reference</Text>
                    <View style={styles.referenceContainer}>
                        <Text style={styles.referenceNumber}>#{booking.id}</Text>
                    </View>
                    <Text style={styles.referenceNote}>
                        Save this reference number for your records
                    </Text>
                </View>

                {/* Vehicle information */}
                {booking.vehicle && (
                    <VehicleCard
                        vehicle={booking.vehicle as Vehicle}
                        vehicleImage={vehicleImage}
                    />
                )}

                {/* Booking period */}
                <DateRangeDisplay
                    startDate={booking.start_date}
                    endDate={booking.end_date}
                    showDuration={true}
                />

                {/* Booking details */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Details</Text>

                    <BookingDetailRow label="Purpose" value={booking.purpose} />

                    {booking.destination && (
                        <BookingDetailRow label="Destination" value={booking.destination} />
                    )}

                    <BookingDetailRow
                        label="Status"
                        value={
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusBadgeText}>{booking.booking_status}</Text>
                            </View>
                        }
                    />
                </View>

                {/* Next steps */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Next Steps</Text>
                    <Text style={styles.nextStepsText}>
                        • Check your email for booking confirmation{'\n'}
                        • Pick up the vehicle on your check-in date{'\n'}
                        • Inspect the vehicle before departing
                    </Text>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Action buttons */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleBackToDashboard}
                >
                    <Text style={styles.primaryButtonText}>Back to Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={handleBookAnother}
                >
                    <Text style={styles.secondaryButtonText}>Book Another Vehicle</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}