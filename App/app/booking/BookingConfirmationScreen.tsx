import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fromByteArray } from 'base64-js';

import { HomeStackParamList } from '@/types/Navigation';
import { useBooking } from '@/hooks/UseBooking';
import { useAuth } from '@/hooks/UseAuth';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { client } from '@/backend/Server';
import SlideToConfirm, { SlideToConfirmHandle } from '@/components/SlideToConfirm';
import { createBookingStyles } from './BookingStyles';

type BookingConfirmationRouteProp = RouteProp<HomeStackParamList, 'BookingConfirmation'>;
type BookingConfirmationNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BookingConfirmation'>;

const MAX_PURPOSE_LENGTH = 100;

export default function BookingConfirmationScreen() {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    const navigation = useNavigation<BookingConfirmationNavigationProp>();
    const route = useRoute<BookingConfirmationRouteProp>();
    const { vehicle, startDate, endDate } = route.params;

    const booking = useBooking();
    const auth = useAuth();
    const sliderRef = React.useRef<SlideToConfirmHandle>(null);

    const [purpose, setPurposeLocal] = useState('');
    const [destination, setDestinationLocal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [vehicleImage, setVehicleImage] = useState<{ uri: string } | null>(null);

    useEffect(() => {
        loadVehicleImage();
    }, [vehicle.id]);

    const loadVehicleImage = async () => {
        try {
            const c = await client;
            const response = await c.getVehicleImage(vehicle.id!, null, {
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
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? 1 : diffDays;
    };

    const isValid = purpose.trim().length > 0;

    const handleConfirm = async () => {
        if (!isValid) {
            setError('Please enter a purpose for your booking');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // for other components that might need them
            booking.setSelectedVehicle(vehicle);
            booking.setDateRange(new Date(startDate), new Date(endDate));

            const newBooking = await booking.createBooking(
                purpose.trim(),
                destination.trim()
            );

            navigation.navigate('BookingSuccess', { booking: newBooking });

            // Clear booking state after successful navigation
            booking.clearBooking();
        } catch (err: any) {
            console.error('Booking error:', err);
            setError(err.message || 'Failed to create booking. Please try again.');
            setIsLoading(false);

            sliderRef.current?.reset();
        }
    };

    const duration = calculateDuration();

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Vehicle</Text>
                    <View style={styles.vehicleRow}>
                        {vehicleImage && (
                            <Image source={vehicleImage} style={styles.vehicleImage} />
                        )}
                        <View style={styles.vehicleInfo}>
                            <Text style={styles.vehicleName}>
                                {vehicle.make} {vehicle.model}
                            </Text>
                            <Text style={styles.vehicleDetails}>
                                {vehicle.year} • {vehicle.type} • {vehicle.color}
                            </Text>
                            <Text style={styles.vehicleLicense}>
                                {vehicle.registration?.license}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Booking period</Text>
                    <View style={styles.datesRow}>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateLabel}>Check-in</Text>
                            <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
                        </View>

                        <View style={styles.datesDivider}>
                            <Image
                                source={require('@/assets/icons/arrow_right.png')}
                                style={{ width: 20, height: 20}}
                            />
                        </View>

                        <View style={styles.dateBox}>
                            <Text style={styles.dateLabel}>Check-out</Text>
                            <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
                        </View>
                    </View>

                    {/* ToDo: We need some spacing between the above and below elements */}

                    <View style={styles.durationBox}>
                        <Text style={styles.durationText}>
                            Duration: {duration} {duration === 1 ? 'day' : 'days'}
                        </Text>
                    </View>
                </View>

                {auth.user && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Booked by</Text>
                        <Text style={styles.userName}>
                            {auth.user.personal_details.first_name} {auth.user.personal_details.last_name}
                        </Text>
                        <Text style={styles.userEmail}>{auth.user.email}</Text>
                        <Text style={styles.userDepartment}>{auth.user.department}</Text>
                    </View>
                )}

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        Purpose <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Client meeting, Site visit, Delivery"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={purpose}
                        onChangeText={setPurposeLocal}
                        maxLength={MAX_PURPOSE_LENGTH}
                        multiline
                        numberOfLines={2}
                        editable={!isLoading}
                    />
                    <Text style={styles.charCount}>
                        {purpose.length}/{MAX_PURPOSE_LENGTH}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Destination</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Downtown Office, Airport"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={destination}
                        onChangeText={setDestinationLocal}
                        editable={!isLoading}
                    />
                </View>

                {error && (
                    <View style={styles.errorCard}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                <View style={styles.bottomPadding} />
            </ScrollView>

            <View style={styles.bottomBar}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={styles.loadingText}>Creating your booking...</Text>
                    </View>
                ) : (
                    <SlideToConfirm
                        ref={sliderRef}
                        onConfirm={handleConfirm}
                        disabled={!isValid}
                        theme={theme}
                    />
                )}

                {!isValid && (
                    <Text style={styles.validationHint}>
                        Please enter a purpose to continue
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
}