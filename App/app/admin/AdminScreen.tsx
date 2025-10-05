import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { createAdminStyles } from './AdminStyles';
import HorizontalSliderList from '@/components/HorizontalSliderList';
import { Employee, Vehicle } from '@/types/openapi';
import { client } from '@/backend/Server';
import { fromByteArray } from 'base64-js';
import { Image } from 'expo-image';
import { AdminStackParamList } from '@/types/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AdminScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'Dashboard'>;
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
    const [vehicles, setVehicles] = useState<{id: number, vehicle: Vehicle, image: { uri: string }}[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const navigation = useNavigation<AdminScreenNavigationProp>();

    useEffect(() => {
        const fetch = async () => {
            const c = await client;
            // Only the first 6. The horizontal scrolling on phones are discouraged, therefore the see more button that provides vertical.
            c.getVehicles().then(async (response) => {
                const finalVehicles: {id: number, vehicle: Vehicle, image: { uri: string }}[] = [];
                const vehicles = response.data.slice(0,6);
                for (const vehicle of vehicles) {
                    await c.getVehicleImage(vehicle.id!, null, { responseType: 'arraybuffer' }).then(response => {
                        //@ts-expect-error
                        const base64String = fromByteArray(new Uint8Array(response.data));
                        const imageUri = `data:image/png;base64,${base64String}`;
                        finalVehicles.push({id: vehicle.id!, vehicle, image: {uri: imageUri}});
                    });
                }
                setVehicles(finalVehicles);
            })
            c.getAllEmployees().then((response) => {
                setEmployees(response.data.slice(0, 6));
            })
        }

        fetch();
    }, []);

    const selectVehicle = (vehicle: Vehicle) => {
        navigation.navigate('EditVehicle', {vehicle});
    }

    const selectEmployee = (employee: Employee) => {
        navigation.navigate('EditEmployee', {employee});
    }

    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    {/* I kinda dig this, so keeping it. */}
                    <Text style={styles.title}>Admin Dashboard</Text>
                    <Text style={styles.subtitle}>
                        Manage users, vehicles, and booking history
                    </Text>
                    <HorizontalSliderList
                        title="Vehicles"
                        handleRedirect={() => navigation.navigate('AllVehicles')}
                        data={vehicles}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.card} onPress={() => selectVehicle(item.vehicle)}>
                                <Image source={item.image} style={styles.cardImage} />
                                <View style={styles.cardInfo}>
                                    <Text>{item.vehicle.make}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <HorizontalSliderList
                        title="Employees"
                        handleRedirect={() => navigation.navigate('AllEmployees')}
                        data={employees}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.card} onPress={() => selectEmployee(item)}>
                                <Image source={{uri: `https://placehold.co/256?text=${item.personal_details.first_name}+${item.personal_details.last_name}`}} style={styles.cardImage} />
                                <View style={styles.cardInfo}>
                                    <Text>{item.personal_details.first_name} {item.personal_details.last_name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}