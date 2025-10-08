import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createBookingStyles } from '@/app/booking/BookingStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import SlideToConfirm, { SlideToConfirmHandle } from '@/components/SlideToConfirm';

interface BottomActionBarProps {
    isLoading: boolean;
    isValid: boolean;
    onConfirm: () => void;
    sliderRef: React.RefObject<SlideToConfirmHandle | null>;
}

export default function BottomActionBar({isLoading, isValid, onConfirm, sliderRef}: BottomActionBarProps) {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    return (
        <View style={styles.bottomBar}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Creating your booking...</Text>
                </View>
            ) : (
                <SlideToConfirm
                    ref={sliderRef}
                    onConfirm={onConfirm}
                    disabled={!isValid}
                    theme={theme}
                />
            )}

            {!isValid && !isLoading && (
                <Text style={styles.validationHint}>
                    Please enter a purpose to continue
                </Text>
            )}
        </View>
    );
}