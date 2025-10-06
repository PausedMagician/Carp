import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {SafeAreaView} from "react-native-safe-area-context";
import { Calendar, DateData } from 'react-native-calendars';

import { Booking } from '@/types/openapi';
import { client } from '@/backend/Server';

import { useBooking } from '@/hooks/UseBooking';
import { HomeStackParamList } from '@/types/Navigation';

import { useThemedStyles } from '@/hooks/useThemedStyles';
import { createBookingStyles } from './BookingStyles';

type BookingDateScreenRouteProp = RouteProp<HomeStackParamList, 'BookingDate'>;
type BookingDateScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'BookingDate'>;

type EditMode = 'none' | 'start' | 'end';

// ToDo: Implement an image for the vehicle somewhere here
export default function BookingDateScreen() {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

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

    /**
     * Load unavailable dates from existing bookings for this vehicle
     */
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
                        marked: true,
                        dotColor: theme.colors.accent,
                        textColor: theme.colors.textSecondary,
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

    /**
     * Check if a date range contains any unavailable dates
     */
    const hasUnavailableDatesInRange = (start: Date, end: Date): boolean => {
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateString = d.toISOString().split('T')[0];
            if (markedDates[dateString]?.disabled) {
                return true;
            }
        }
        return false;
    };

    /**
     * Clear all selected dates
     */
    const clearDates = () => {
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

    /**
     * Enter edit mode for changing start or end date
     */
    const handleEditDate = (mode: 'start' | 'end') => {
        setEditMode(mode);
    };

    /**
     * Long-press for date selection
     *
     * Behavior:
     * - No dates selected: Start new range selection
     * - Start date exists: Set as start or end based on position
     */
    const onDayLongPress = useCallback((day: DateData) => {
        const selectedDate = new Date(day.dateString);

        if (markedDates[day.dateString]?.disabled) {
            Alert.alert(
                'Date Unavailable',
                'This date is already booked. Please select a different date.',
                [{ text: 'OK' }]
            );
            return;
        }

        // If no dates selected, start new selection
        if (!startDate) {
            setIsSelecting(true);
            setSelectionStart(selectedDate);
            setEditMode('none');
            setDateRange(selectedDate, selectedDate);
            updateMarkedDates(selectedDate, selectedDate);
            return;
        }

        if (startDate && !endDate) {
            // Only start date exists
            let newStart: Date;
            let newEnd: Date;

            if (selectedDate < startDate) {
                newStart = selectedDate;
                newEnd = startDate;
            } else {
                newStart = startDate;
                newEnd = selectedDate;
            }

            // Validate range
            if (hasUnavailableDatesInRange(newStart, newEnd)) {
                Alert.alert(
                    'Invalid Date Range',
                    'Your selected range includes unavailable dates. Please select a different range.',
                    [{ text: 'OK' }]
                );
                return;
            }

            setDateRange(newStart, newEnd);
            updateMarkedDates(newStart, newEnd);
        } else if (startDate && endDate) {
            // Both dates exist so we adjust the closer endpoint
            const distToStart = Math.abs(selectedDate.getTime() - startDate.getTime());
            const distToEnd = Math.abs(selectedDate.getTime() - endDate.getTime());

            let newStart: Date;
            let newEnd: Date;

            if (selectedDate < startDate) {
                newStart = selectedDate;
                newEnd = endDate;
            } else if (selectedDate > endDate) {
                newStart = startDate;
                newEnd = selectedDate;
            } else {
                if (distToStart < distToEnd) {
                    newStart = selectedDate;
                    newEnd = endDate;
                } else {
                    newStart = startDate;
                    newEnd = selectedDate;
                }
            }

            // Validate range
            if (hasUnavailableDatesInRange(newStart, newEnd)) {
                Alert.alert(
                    'Invalid Date Range',
                    'Your selected range includes unavailable dates. Please select a different range.',
                    [{ text: 'OK' }]
                );
                return;
            }

            setDateRange(newStart, newEnd);
            updateMarkedDates(newStart, newEnd);
        }

        setIsSelecting(false);
        setSelectionStart(null);
        setEditMode('none');
    }, [markedDates, startDate, endDate]);

    /**
     * Press for date selection
     */
    const onDayPress = useCallback((day: DateData) => {
        const selectedDate = new Date(day.dateString);
        const dateString = day.dateString;

        if (markedDates[dateString]?.disabled) {
            Alert.alert(
                'Date Unavailable',
                'This date is already booked. Please select a different date.',
                [{ text: 'OK' }]
            );
            return;
        }

        // Check if tapping selected date
        const isStartDate = startDate && dateString === startDate.toISOString().split('T')[0];
        const isEndDate = endDate && dateString === endDate.toISOString().split('T')[0];

        // The alert should only appear if tapping an already selected date
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
                                clearDates();
                            } else if (isStartDate) {
                                if (endDate) {
                                    setDateRange(null as any, endDate);
                                    updateMarkedDates(endDate, endDate);
                                } else {
                                    clearDates();
                                }
                            } else {
                                if (startDate) {
                                    setDateRange(startDate, null as any);
                                    updateMarkedDates(startDate, startDate);
                                } else {
                                    clearDates();
                                }
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
            let newStart: Date;
            let newEnd: Date;

            if (selectedDate < selectionStart) {
                newStart = selectedDate;
                newEnd = selectionStart;
            } else {
                newStart = selectionStart;
                newEnd = selectedDate;
            }

            // Validate range
            if (hasUnavailableDatesInRange(newStart, newEnd)) {
                Alert.alert(
                    'Invalid Date Range',
                    'Your selected range includes unavailable dates. Please select a different range.',
                    [{ text: 'OK' }]
                );
                setIsSelecting(false);
                setSelectionStart(null);
                return;
            }

            setDateRange(newStart, newEnd);
            updateMarkedDates(newStart, newEnd);
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

            const newEnd = endDate || selectedDate;

            // Validate range
            if (hasUnavailableDatesInRange(selectedDate, newEnd)) {
                Alert.alert(
                    'Invalid Date Range',
                    'Your selected range includes unavailable dates. Please select a different range.',
                    [{ text: 'OK' }]
                );
                return;
            }

            setDateRange(selectedDate, newEnd);
            updateMarkedDates(selectedDate, newEnd);
            setEditMode('none');
            return;
        }

        if (editMode === 'end') {
            if (startDate && selectedDate < startDate) {
                Alert.alert('Invalid Date', 'Check-out cannot be before check-in');
                return;
            }

            // Validate range
            if (hasUnavailableDatesInRange(startDate!, selectedDate)) {
                Alert.alert(
                    'Invalid Date Range',
                    'Your selected range includes unavailable dates. Please select a different range.',
                    [{ text: 'OK' }]
                );
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
            let newStart: Date;
            let newEnd: Date;

            if (selectedDate < startDate) {
                newStart = selectedDate;
                newEnd = startDate;
            } else {
                newStart = startDate;
                newEnd = selectedDate;
            }

            // Validate range
            if (hasUnavailableDatesInRange(newStart, newEnd)) {
                Alert.alert(
                    'Invalid Date Range',
                    'Your selected range includes unavailable dates. Please select a different range.',
                    [{ text: 'OK' }]
                );
                return;
            }

            setDateRange(newStart, newEnd);
            updateMarkedDates(newStart, newEnd);
        }
    }, [isSelecting, selectionStart, startDate, endDate, markedDates, editMode]);

    /**
     * Update calendar markings with selected date range
     */
    const updateMarkedDates = (start: Date, end: Date) => {
        const marked = { ...markedDates };

        // Clear previous selections
        Object.keys(marked).forEach(key => {
            if (!marked[key].disabled) {
                delete marked[key];
            }
        });

        // Mark selected range
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateString = d.toISOString().split('T')[0];

            if (!marked[dateString]?.disabled) {
                const isStart = d.getTime() === start.getTime();
                const isEnd = d.getTime() === end.getTime();

                marked[dateString] = {
                    selected: true,
                    color: theme.colors.primary,
                    textColor: theme.colors.background,
                    startingDay: isStart,
                    endingDay: isEnd,
                    // Hack to customize the check-in and check-out dates
                    ...(isStart || isEnd ? {
                        customTextStyle: {
                            color: theme.colors.background,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }
                    } : {}),
                };
            }
        }

        setMarkedDates(marked);
    };

    /**
     * Navigate to booking confirmation
     */
    const handleContinue = () => {
        if (startDate && endDate) {
            // Final validation before navigation
            if (hasUnavailableDatesInRange(startDate, endDate)) {
                Alert.alert(
                    'Invalid Booking',
                    'Your selected dates include unavailable dates. Please select a different range.',
                    [{ text: 'OK' }]
                );
                return;
            }

            navigation.navigate('BookingConfirmation', {
                vehicle,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            });
        }
    };

    const canContinue = startDate && endDate;
    const hasSelection = startDate || endDate;

    /**
     * Based on current state
     */
    const getInstructions = () => {
        if (editMode === 'start') return 'Tap a date to set your new check-in';
        if (editMode === 'end') return 'Tap a date to set your new check-out';
        if (isSelecting) return 'Tap another date to complete your selection';
        if (!startDate) return 'Tap a date to begin, or long press then tap to select a range';
        if (!endDate) return 'Tap another date to set your check-out';
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView style={styles.scrollView}>
                {/* Vehicle info card */}
                <View style={styles.vehicleCard}>
                    <View style={styles.vehicleInfo}>
                        <Text style={styles.vehicleName}>
                            {vehicle.make} {vehicle.model}
                        </Text>
                        <Text style={styles.vehicleDetails}>
                            {vehicle.year} • {vehicle.type} • {vehicle.color}
                        </Text>
                    </View>

                    {/*/!* ToDo: Implement Specification as a separate page or keep modal? *!/*/}

                    {/*/!* ToDo: Implement Service Info as a separate page or keep modal? *!/*/}

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

                {/* Date selection card */}
                <View style={styles.dynamicCard}>
                    {hasSelection ? (
                        <View>
                            <View style={styles.selectionHeader}>
                                <Text style={styles.cardTitle}>Selected Dates</Text>
                                <TouchableOpacity onPress={clearDates}>
                                    <Text style={styles.clearLink}>Clear</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.datesRow}>
                                <TouchableOpacity
                                    style={styles.dateBox}
                                    onPress={() => handleEditDate('start')}
                                >
                                    <Text style={styles.dateBoxLabel}>Check-in</Text>
                                    <Text style={styles.dateBoxValue}>
                                        {startDate ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                                    </Text>
                                </TouchableOpacity>

                                <View style={styles.datesDivider}>
                                    <Image
                                        source={require('@/assets/icons/arrow_right.png')}
                                        style={{ width: 20, height: 20}}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={styles.dateBox}
                                    onPress={() => handleEditDate('end')}
                                >
                                    <Text style={styles.dateBoxLabel}>Check-out</Text>
                                    <Text style={styles.dateBoxValue}>
                                        {endDate ? endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.cardTitle}>Select Dates</Text>
                            <Text style={styles.instructionsText}>{getInstructions()}</Text>
                        </View>
                    )}
                </View>

                {/* Status */}
                {(isSelecting || editMode !== 'none') && (
                    <View style={styles.statusBanner}>
                        <Text style={styles.statusText}>
                            {editMode !== 'none'
                                ? `${editMode === 'start' ? 'Editing check-in' : 'Editing check-out'}`
                                : 'Choose an end date to complete your selection'
                            }
                        </Text>
                    </View>
                )}

                {/* Calendar legend */}
                <View style={styles.calendarLegend}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: theme.colors.accent }]} />
                        <Text style={styles.legendText}>Unavailable</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBar, { backgroundColor: theme.colors.primary }]} />
                        <Text style={styles.legendText}>Your selection</Text>
                    </View>
                </View>

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

            {/* Bottom bar */}
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
        </SafeAreaView>
    );
}