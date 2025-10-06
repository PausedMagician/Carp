import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fromByteArray } from 'base64-js';

import { HomeStackParamList } from '@/types/Navigation';
import { useBooking } from '@/hooks/UseBooking';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { client } from '@/backend/Server';
import { createBookingStyles } from '@/app/booking/BookingStyles';

type BookingSuccessRouteProp = RouteProp<HomeStackParamList, 'BookingSuccess'>;
type BookingSuccessNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BookingSuccess'>;

export default function BookingSuccessScreen() {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    const navigation = useNavigation<BookingSuccessNavigationProp>();
    const route = useRoute<BookingSuccessRouteProp>();
    const { booking } = route.params;

    const bookingContext = useBooking();

    const [vehicleImage, setVehicleImage] = useState<{ uri: string } | null>(null);

    useEffect(() => {
        loadVehicleImage();
    }, [booking.vehicle?.id]);

    const loadVehicleImage = async () => {
        if (!booking.vehicle?.id) return;

        try {
            const c = await client;
            const response = await c.getVehicleImage(booking.vehicle.id, null, {
                responseType: 'arraybuffer'
            });

            const base64String = fromByteArray(new Uint8Array(response.data as any));
            const imageUri = `data:image/png;base64,${base64String}`;
            setVehicleImage({ uri: imageUri });
        } catch (err) {
            console.error('Error loading vehicle image:', err);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const calculateDuration = () => {
        const start = new Date(booking.start_date);
        const end = new Date(booking.end_date);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? 1 : diffDays;
    };

    const handleBackToDashboard = () => {
        bookingContext.clearBooking();
        navigation.navigate('Dashboard');
    };

    const handleBookAnother = () => {
        bookingContext.clearBooking();
        navigation.navigate('Dashboard');
    };

    const duration = calculateDuration();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <ScrollView style={styles.scrollView}>
                {/* Success icon */}
                <View style={styles.successHeader}>
                    <View style={styles.successIconContainer}>
                        <View style={styles.successIcon}>
                            <Image
                                source={require('@/assets/icons/check.png')}
                                style={{ width: 48, height: 48}}
                            />
                        </View>
                    </View>
                    <Text style={styles.successTitle}>Booking Confirmed!</Text>
                    <Text style={styles.successSubtitle}>
                        Your vehicle has been successfully reserved
                    </Text>
                </View>

                {/* Booking Reference */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Booking Reference</Text>
                    <View style={styles.referenceContainer}>
                        <Text style={styles.referenceNumber}>#{booking.id}</Text>
                    </View>
                    <Text style={styles.referenceNote}>
                        Mhmmm
                    </Text>
                </View>

                {/* Vehicle Information */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Vehicle</Text>
                    <View style={styles.vehicleRow}>
                        {vehicleImage && (
                            <Image source={vehicleImage} style={styles.vehicleImage} />
                        )}
                        <View style={styles.vehicleInfo}>
                            <Text style={styles.vehicleName}>
                                {booking.vehicle?.make} {booking.vehicle?.model}
                            </Text>
                            <Text style={styles.vehicleDetails}>
                                {booking.vehicle?.year} • {booking.vehicle?.type} • {booking.vehicle?.color}
                            </Text>
                            <Text style={styles.vehicleLicense}>
                                {booking.vehicle?.registration?.license}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Booking Period */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Booking Period</Text>
                    <View style={styles.datesRow}>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateLabel}>Check-in</Text>
                            <Text style={styles.dateValue}>{formatDate(booking.start_date)}</Text>
                        </View>

                        <View style={styles.datesDivider}>
                            <Image
                                source={require('@/assets/icons/arrow_right.png')}
                                style={{ width: 20, height: 20}}
                            />
                        </View>

                        <View style={styles.dateBox}>
                            <Text style={styles.dateLabel}>Check-out</Text>
                            <Text style={styles.dateValue}>{formatDate(booking.end_date)}</Text>
                        </View>
                    </View>

                    <View style={styles.durationBox}>
                        <Text style={styles.durationText}>
                            Duration: {duration} {duration === 1 ? 'day' : 'days'}
                        </Text>
                    </View>
                </View>

                {/* Booking Details */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Details</Text>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Purpose</Text>
                        <Text style={styles.detailValue}>{booking.purpose}</Text>
                    </View>

                    {booking.destination && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Destination</Text>
                            <Text style={styles.detailValue}>{booking.destination}</Text>
                        </View>
                    )}

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Status</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusBadgeText}>{booking.booking_status}</Text>
                        </View>
                    </View>
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

            {/* Action Buttons */}
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