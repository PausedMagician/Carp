import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { client } from "@/backend/Server";
import type { Vehicle } from "@/types/openapi";
import { useBooking } from "@/hooks/UseBooking";
import CarListItem from "@/components/CarListItem";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { createVehiclesStyles } from "./VehiclesStyles";
import type { SearchStackParamList } from "@/types/Navigation";

interface VehicleWithAvailability {
    car: Vehicle;
    isAvailable: boolean;
}

type VehiclesScreenNavigationProp = NativeStackNavigationProp<SearchStackParamList, 'SearchList'>;

export default function VehiclesScreen() {
    const [vehicles, setVehicles] = useState<VehicleWithAvailability[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { checkAvailability } = useBooking();
    const navigation = useNavigation<VehiclesScreenNavigationProp>();
    const theme = useThemedStyles();
    const styles = createVehiclesStyles(theme);

    useEffect(() => {
        loadVehicles();
    }, []);

    /**
     * Load vehicles and check their availability
     * Uses today and tomorrow as default date range when checking availability
     */
    const loadVehicles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch vehicles
            const apiClient = await client;
            const response = await apiClient.getVehicles();
            const fetchedVehicles = response.data;

            // Check availability for each vehicle
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const vehiclesWithAvailability = await Promise.all(
                fetchedVehicles.map(async (vehicle) => {
                    const isAvailable = await checkAvailability(
                        vehicle.id!,
                        today,
                        tomorrow
                    );
                    return {
                        car: vehicle,
                        isAvailable,
                    };
                })
            );

            setVehicles(vehiclesWithAvailability);
        } catch (err) {
            console.error("Error loading vehicles:", err);
            setError("Failed to load vehicles. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [checkAvailability]);

    const handleVehiclePress = (vehicle: Vehicle) => {
        // ToDo: Navigate to booking flow
    };

    // Loading state
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Loading vehicles...</Text>
                </View>
                <StatusBar style="auto" />
            </View>
        );
    }

    // Error state
    if (error) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>{error}</Text>
                </View>
                <StatusBar style="auto" />
            </View>
        );
    }

    // Empty state
    if (vehicles.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        No vehicles available at the moment.
                    </Text>
                </View>
                <StatusBar style="auto" />
            </View>
        );
    }

    // Main content
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Available Vehicles</Text>
                <Text style={styles.subtitle}>
                    Browse and book vehicles for your needs
                </Text>
            </View>

            <FlatList
                data={vehicles}
                renderItem={CarListItem}
                keyExtractor={(item) => item.car.id!.toString()}
                contentContainerStyle={styles.listContent}
            />

            <StatusBar style="auto" />
        </View>
    );
}