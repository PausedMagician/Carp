import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { createBookingStyles } from '@/app/booking/BookingStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { BOOKING_CONSTANTS } from '@/constants/booking';

interface PurposeInputProps {
    purpose: string;
    onChangePurpose: (purpose: string) => void;
    isLoading: boolean;
}

export default function PurposeInput({purpose, onChangePurpose, isLoading}: PurposeInputProps) {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>
                Purpose <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Client meeting, Site visit, Delivery"
                placeholderTextColor={theme.colors.textSecondary}
                value={purpose}
                onChangeText={onChangePurpose}
                maxLength={BOOKING_CONSTANTS.MAX_PURPOSE_LENGTH}
                multiline
                numberOfLines={2}
                editable={!isLoading}
            />
            <Text style={styles.charCount}>
                {purpose.length}/{BOOKING_CONSTANTS.MAX_PURPOSE_LENGTH}
            </Text>
        </View>
    );
}