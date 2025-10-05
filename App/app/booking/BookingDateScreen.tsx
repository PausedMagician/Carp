import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {SafeAreaView} from "react-native-safe-area-context";
import { Calendar, DateData } from 'react-native-calendars';

import { Booking } from '@/types/openapi';
import { client } from '@/backend/Server';

import { useBooking } from '@/hooks/UseBooking';
import { HomeStackParamList } from '@/types/Navigation';

import { theme } from '@/constants/theme';
import { bookingStyles as styles } from "@/app/booking/BookingStyles";

type BookingDateScreenRouteProp = RouteProp<HomeStackParamList, 'BookingDate'>;
type BookingDateScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BookingDate'>;

type EditMode = 'none' | 'start' | 'end';

// ToDo: Implement an image for the vehicle somewhere here
export default function BookingDateScreen() {
    const navigation = useNavigation<BookingDateScreenNavigationProp>();
    const route = useRoute<BookingDateScreenRouteProp>();
    const { vehicle } = route.params;

    const { setSelectedVehicle, setDateRange, startDate, endDate } = useBooking();

    const [markedDates, setMarkedDates] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState<Date | null>(null);
    const [editMode, setEditMode] = useState<EditMode>('none');

    useEffect(() => {
        setSelectedVehicle(vehicle);
        loadUnavailableDates();
    }, [vehicle]);

    const loadUnavailableDates = async () => {
        try {
            setIsLoading(true);
            const apiClient = await client;
            const response = await apiClient.getAllBookings();
            const bookings = response.data;

            const vehicleBookings = bookings.filter(
                (booking: Booking) =>
                    booking.vehicle?.id === vehicle.id &&
                    booking.booking_status !== 'Cancelled'
            );

            const marked: any = {};
            vehicleBookings.forEach((booking: Booking) => {
                const start = new Date(booking.start_date);
                const end = new Date(booking.end_date);

                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    const dateString = d.toISOString().split('T')[0];
                    marked[dateString] = {
                        disabled: true,
                        disableTouchEvent: true,
                        color: theme.colors.textSecondary,
                        textColor: theme.colors.textMuted,
                    };
                }
            });

            setMarkedDates(marked);
        } catch (error) {
            console.error('Error loading unavailable dates:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearDates = () => {
        setDateRange(null as any, null as any);
        setEditMode('none');
        setIsSelecting(false);
        setSelectionStart(null);

        const marked = { ...markedDates };
        Object.keys(marked).forEach(key => {
            if (!marked[key].disabled) {
                delete marked[key];
            }
        });
        setMarkedDates(marked);
    };

    const handleEditDate = (mode: 'start' | 'end') => {
        setEditMode(mode);
    };

    const onDayLongPress = useCallback((day: DateData) => {
        const selectedDate = new Date(day.dateString);

        if (markedDates[day.dateString]?.disabled) {
            return;
        }

        setIsSelecting(true);
        setSelectionStart(selectedDate);
        setEditMode('none');
        setDateRange(selectedDate, selectedDate);
        updateMarkedDates(selectedDate, selectedDate);
    }, [markedDates]);

    const onDayPress = useCallback((day: DateData) => {
        const selectedDate = new Date(day.dateString);
        const dateString = day.dateString;

        if (markedDates[dateString]?.disabled) {
            return;
        }

        // Check if tapping selected date
        const isStartDate = startDate && dateString === startDate.toISOString().split('T')[0];
        const isEndDate = endDate && dateString === endDate.toISOString().split('T')[0];

        if (isStartDate || isEndDate) {
            Alert.alert(
                'Deselect Date',
                `Clear your ${isStartDate ? 'check-in' : 'check-out'} date?`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Clear',
                        style: 'destructive',
                        onPress: () => {
                            if (isStartDate && isEndDate) {
                                handleClearDates();
                            } else if (isStartDate) {
                                setDateRange(null as any, endDate!);
                                updateMarkedDates(endDate!, endDate!);
                            } else {
                                setDateRange(startDate!, null as any);
                                updateMarkedDates(startDate!, startDate!);
                            }
                            setEditMode('none');
                        }
                    }
                ]
            );
            return;
        }

        // Range selection mode
        if (isSelecting && selectionStart) {
            if (selectedDate < selectionStart) {
                setDateRange(selectedDate, selectionStart);
                updateMarkedDates(selectedDate, selectionStart);
            } else {
                setDateRange(selectionStart, selectedDate);
                updateMarkedDates(selectionStart, selectedDate);
            }
            setIsSelecting(false);
            setSelectionStart(null);
            return;
        }

        // Edit mode
        if (editMode === 'start') {
            if (endDate && selectedDate > endDate) {
                Alert.alert('Invalid Date', 'Check-in cannot be after check-out');
                return;
            }
            setDateRange(selectedDate, endDate || selectedDate);
            updateMarkedDates(selectedDate, endDate || selectedDate);
            setEditMode('none');
            return;
        }

        if (editMode === 'end') {
            if (startDate && selectedDate < startDate) {
                Alert.alert('Invalid Date', 'Check-out cannot be before check-in');
                return;
            }
            setDateRange(startDate!, selectedDate);
            updateMarkedDates(startDate!, selectedDate);
            setEditMode('none');
            return;
        }

        // Normal selection
        if (!startDate || (startDate && endDate)) {
            setDateRange(selectedDate, selectedDate);
            updateMarkedDates(selectedDate, selectedDate);
        } else if (startDate && !endDate) {
            if (selectedDate < startDate) {
                setDateRange(selectedDate, startDate);
                updateMarkedDates(selectedDate, startDate);
            } else {
                setDateRange(startDate, selectedDate);
                updateMarkedDates(startDate, selectedDate);
            }
        }
    }, [isSelecting, selectionStart, startDate, endDate, markedDates, editMode]);

    const updateMarkedDates = (start: Date, end: Date) => {
        const marked = { ...markedDates };

        Object.keys(marked).forEach(key => {
            if (!marked[key].disabled) {
                delete marked[key];
            }
        });

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateString = d.toISOString().split('T')[0];

            if (!marked[dateString]?.disabled) {
                marked[dateString] = {
                    selected: true,
                    color: theme.colors.primary,
                    textColor: theme.colors.background,
                    startingDay: d.getTime() === start.getTime(),
                    endingDay: d.getTime() === end.getTime(),
                };
            }
        }

        setMarkedDates(marked);
    };

    const handleContinue = () => {
        if (startDate && endDate) {
            navigation.navigate('BookingConfirmation', {
                vehicle,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            });
        }
    };

    const canContinue = startDate && endDate;
    const hasSelection = startDate || endDate;

    // Most of these instructions are never shown due to the current logic
    const getInstructions = () => {
        if (editMode === 'start') return 'Tap a date to set your new check-in';
        if (editMode === 'end') return 'Tap a date to set your new check-out';
        if (isSelecting) return 'Tap another date to complete your selection';
        if (!startDate) return 'Tap a date to begin, or long press then tap to select a range'; // This is the only one that is ever shown
        if (!endDate) return 'Tap another date to set your check-out';
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView style={styles.scrollView}>
                {/* Vehicle Info Card */}
                <View style={styles.vehicleCard}>
                    <View style={styles.vehicleInfo}>
                        <Text style={styles.vehicleName}>
                            {vehicle.make} {vehicle.model}
                        </Text>
                        <Text style={styles.vehicleDetails}>
                            {vehicle.year} • {vehicle.type} • {vehicle.color}
                        </Text>
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => setShowSpecModal(true)}
                        >
                            <Text style={styles.actionButtonText}>Specification</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => setShowServiceModal(true)}
                        >
                            <Text style={styles.actionButtonText}>Service Info</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* The idea here is to prevents the layout from shifting by always occupying the same space */}
                <View style={styles.dynamicCard}>
                    {hasSelection ? (
                        <View>
                            <View style={styles.selectionHeader}>
                                <Text style={styles.cardTitle}>Selected Dates</Text>
                                <TouchableOpacity onPress={handleClearDates}>
                                    <Text style={styles.clearLink}>Clear</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Since it is an English app, I think we should stick to MM/DD format */}
                            <View style={styles.datesRow}>
                                <TouchableOpacity
                                    style={styles.dateBox}
                                    onPress={() => handleEditDate('start')}
                                >
                                    <Text style={styles.dateBoxLabel}>Check-in</Text>
                                    <Text style={styles.dateBoxValue}>
                                        {startDate ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '--'}
                                    </Text>
                                </TouchableOpacity>

                                <View style={styles.datesDivider}>
                                    <Text style={styles.dividerText}>></Text> {/* ToDo: Replace with icon */}
                                </View>

                                <TouchableOpacity
                                    style={styles.dateBox}
                                    onPress={() => handleEditDate('end')}
                                >
                                    <Text style={styles.dateBoxLabel}>Check-out</Text>
                                    <Text style={styles.dateBoxValue}>
                                        {endDate ? endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '--'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        // Instructions (shown when no selection)
                        <View>
                            <Text style={styles.cardTitle}>Select Dates</Text>
                            <Text style={styles.instructionsText}>{getInstructions()}</Text>
                        </View>
                    )}
                </View>

                {(isSelecting || editMode !== 'none') && (
                    <View style={styles.statusBanner}>
                        <Text style={styles.statusText}>
                            {editMode !== 'none'
                                ? `${editMode === 'start' ? 'Editing check-in' : 'Editing check-out'}`
                                : 'Choose an start/end date to complete your selection'
                            }
                        </Text>
                    </View>
                )}

                {/* Calendar */}
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={styles.loadingText}>Loading availability...</Text>
                    </View>
                ) : (
                    <View style={styles.calendarShadowWrapper}>
                        <View style={styles.calendarWrapper}>
                            <Calendar
                                theme={{
                                    calendarBackground: theme.colors.background,
                                    selectedDayBackgroundColor: theme.colors.primary,
                                    selectedDayTextColor: theme.colors.background,
                                    todayTextColor: theme.colors.primary,
                                    dayTextColor: theme.colors.text,
                                    textDisabledColor: theme.colors.textSecondary,
                                    monthTextColor: theme.colors.text,
                                    textMonthFontWeight: 'bold',
                                    arrowColor: theme.colors.primary,
                                }}
                                markedDates={markedDates}
                                onDayPress={onDayPress}
                                onDayLongPress={onDayLongPress}
                                markingType="period"
                                minDate={new Date().toISOString().split('T')[0]}
                            />
                        </View>
                    </View>
                )}

                <View style={styles.bottomPadding} />
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
                    onPress={handleContinue}
                    disabled={!canContinue}
                >
                    <Text style={styles.continueButtonText}>
                        {canContinue ? 'Continue to Booking' : 'Select dates to continue'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/*/!* ToDo: Implement Specification as a separate page or keep modal? *!/*/}

            {/*/!* ToDo: Implement Service Info as a separate page or keep modal? *!/*/}

        </SafeAreaView>
    );
}