import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { createAdminStyles } from './AdminStyles';

/**
 * Only accessible to admins
 * Provides functionality for managing the fleet
 *
 * ToDo:
 * - User management
 * - Vehicle management
 * - Company-wide booking history
 */
export default function AdminScreen() {
    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Admin Dashboard</Text>
                <Text style={styles.subtitle}>
                    Manage users, vehicles, and booking history
                </Text>
            </View>
        </ScrollView>
    );
}