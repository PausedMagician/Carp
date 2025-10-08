import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { createBookingStyles } from '@/app/booking/BookingStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface DestinationInputProps {
    destination: string;
    onChangeDestination: (destination: string) => void;
    isLoading: boolean;
}

export default function DestinationInput({destination, onChangeDestination, isLoading}: DestinationInputProps) {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Destination</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Airport"
                placeholderTextColor={theme.colors.textSecondary}
                value={destination}
                onChangeText={onChangeDestination}
                editable={!isLoading}
            />
        </View>
    );
}