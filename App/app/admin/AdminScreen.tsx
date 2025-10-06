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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

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

    useFocusEffect(
        React.useCallback(() => {
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

            return () => {
                setVehicles([]);
                setEmployees([]);
            };
        }, [])
    );

    const selectVehicle = (vehicle: Vehicle, image?: { uri: string }) => {
        navigation.navigate('EditVehicle', { vehicle, image });
    };

    const selectEmployee = (employee: Employee, image?: { uri: string }) => {
        navigation.navigate('EditEmployee', { employee, image });
    };

    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator>
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
                        renderStart={() => (
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddVehicle')}>
                                <View style={styles.cardIconContainer}>
                                    <Feather name='plus' size={48} style={styles.cardIcon} />
                                </View>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardText}>Add new vehicle</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.card} onPress={() => selectVehicle(item.vehicle, item.image)}>
                                <Image source={item.image} style={styles.cardImage} />
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardText}>{item.vehicle.make}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <HorizontalSliderList
                        title="Employees"
                        handleRedirect={() => navigation.navigate('AllEmployees')}
                        data={employees}
                        renderStart={() => (
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddEmployee')}>
                                <View style={styles.cardIconContainer}>
                                    <Feather name='plus' size={48} style={styles.cardIcon} />
                                </View>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardText}>Add new employee</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.card} onPress={() => selectEmployee(item)}>
                                <Image source={{uri: `https://placehold.co/256?text=${item.personal_details.first_name}+${item.personal_details.last_name}`}} style={styles.cardImage} />
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardText}>{item.personal_details.first_name} {item.personal_details.last_name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}