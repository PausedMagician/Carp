import React from 'react';
import { View, Text, Image } from 'react-native';
import { Vehicle } from '@/types/openapi';
import { createBookingStyles } from '@/app/booking/BookingStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface VehicleCardProps {
    vehicle: Vehicle;
    vehicleImage: { uri: string } | null;
}

export default function VehicleCard({ vehicle, vehicleImage }: VehicleCardProps) {
    const theme = useThemedStyles();
    const styles = createBookingStyles(theme);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Vehicle</Text>
            <View style={styles.vehicleRow}>
                {vehicleImage && (
                    <Image source={vehicleImage} style={styles.vehicleImage} />
                )}
                <View style={styles.vehicleInfo}>
                    <Text style={styles.vehicleName}>
                        {vehicle.make} {vehicle.model}
                    </Text>
                    <Text style={styles.vehicleDetails}>
                        {vehicle.year} • {vehicle.type} • {vehicle.color}
                    </Text>
                    <Text style={styles.vehicleLicense}>
                        {vehicle.registration?.license}
                    </Text>
                </View>
            </View>
        </View>
    );
}