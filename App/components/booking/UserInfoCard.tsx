import React from 'react';
import { View, Text } from 'react-native';
import { Employee } from '@/types/openapi';
import { createBookingStyles } from '@/app/booking/BookingStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface UserInfoCardProps {
    user: Employee;
}

export default function UserInfoCard({ user }: UserInfoCardProps) {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Booked by</Text>
            <Text style={styles.userName}>
                {user.personal_details.first_name} {user.personal_details.last_name}
            </Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userDepartment}>{user.department}</Text>
        </View>
    );
}