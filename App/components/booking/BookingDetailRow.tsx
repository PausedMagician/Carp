import React from 'react';
import { View, Text } from 'react-native';
import { createBookingStyles } from '@/app/booking/BookingStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface BookingDetailRowProps {
    label: string;
    value: string | React.ReactNode;
}

/**
 * A single row displaying a booking detail
 */
export default function BookingDetailRow({ label, value }: BookingDetailRowProps) {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            {typeof value === 'string' ? (
                <Text style={styles.detailValue}>{value}</Text>
            ) : (
                value
            )}
        </View>
    );
}