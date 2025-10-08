import { Alert } from 'react-native';

export const showBookingError = (message: string, onDismiss?: () => void) => {
    Alert.alert(
        'Booking Error',
        message,
        [{ text: 'OK', onPress: onDismiss }]
    );
};

export const showValidationError = (message: string) => {
    Alert.alert(
        'Invalid Selection',
        message,
        [{ text: 'OK' }]
    );
};

export const showDateUnavailableAlert = () => {
    Alert.alert(
        'Date Unavailable',
        'This date is already booked. Please select a different date.',
        [{ text: 'OK' }]
    );
};

export const showInvalidDateRangeAlert = () => {
    Alert.alert(
        'Invalid Date Range',
        'Your selected range includes unavailable dates. Please select a different range.',
        [{ text: 'OK' }]
    );
};

export const showDeselectDateAlert = (
    isStartDate: boolean,
    onConfirm: () => void
) => {
    Alert.alert(
        'Deselect Date',
        `Clear your ${isStartDate ? 'check-in' : 'check-out'} date?`,
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Clear',
                style: 'destructive',
                onPress: onConfirm
            }
        ]
    );
};