import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBookingStyles } from '@/app/booking/BookingStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { formatBookingDate, calculateBookingDuration } from '@/utils/bookingUtils';
import { ICONS } from '@/constants/icons';

interface DateRangeDisplayProps {
    startDate: string | Date;
    endDate: string | Date;
    showDuration?: boolean;
}

/**
 * Displays the booking date range with check-in and check-out dates
 */
export default function DateRangeDisplay({
                                             startDate,
                                             endDate,
                                             showDuration = true
                                         }: DateRangeDisplayProps) {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);
    const duration = calculateBookingDuration(startDate, endDate);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Booking Period</Text>
            <View style={styles.datesRow}>
                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Check-in</Text>
                    <Text style={styles.dateValue}>{formatBookingDate(startDate)}</Text>
                </View>

                <View style={styles.datesDivider}>
                    <Image
                        source={ICONS.arrowRight}
                        style={{ width: 20, height: 20 }}
                    />
                </View>

                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Check-out</Text>
                    <Text style={styles.dateValue}>{formatBookingDate(endDate)}</Text>
                </View>
            </View>

            {showDuration && (
                <View style={styles.durationBox}>
                    <Text style={styles.durationText}>
                        Duration: {duration} {duration === 1 ? 'day' : 'days'}
                    </Text>
                </View>
            )}
        </View>
    );
}