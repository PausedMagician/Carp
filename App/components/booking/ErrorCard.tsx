import React from 'react';
import { View, Text } from 'react-native';
import { createBookingStyles } from '@/app/booking/BookingStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface ErrorCardProps {
    message: string;
}

export default function ErrorCard({ message }: ErrorCardProps) {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    return (
        <View style={styles.errorCard}>
            <Text style={styles.errorText}>{message}</Text>
        </View>
    );
}