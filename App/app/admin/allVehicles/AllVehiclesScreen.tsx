import { client } from "@/backend/Server";
import { Client as ClientDefinition } from '@/types/openapi'
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Vehicle } from "@/types/openapi";
import { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAdminStyles } from "../AdminStyles";
import { Image } from "expo-image";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "@/types/Navigation";
import { useNavigation } from "@react-navigation/native";

type AllVehiclesScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'Dashboard'>;

export default function AdminAllVehiclesScreen() {
    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);
    const navigation = useNavigation<AllVehiclesScreenNavigationProp>();
    const [vehicles, setVehicles] = useState<{[category: string]: Vehicle[]}>();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { width, height } = useWindowDimensions();
    const [columns, setColumns] = useState(Math.floor(width / (160 - theme.spacing.sm)));

    useEffect(() => {
        const fetchVehicles = async () => {
            console.log("fetching vehicles");
            const c = await client;

            // Get url for where images are
            setImageUrl(c.getUri() + 'images/vehicles/{id}');

            c.getVehicles().then(res => {
                const grouped = res.data.reduce((acc, vehicle) => {
                    const category = vehicle.type || "Unknown";
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(vehicle);
                    return acc;
                }, {} as {[category: string]: Vehicle[]});
                setVehicles(grouped);
            });
        };
        fetchVehicles();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {vehicles && Object.keys(vehicles).map(category => (
                    <View key={category}>
                        <Text style={[styles.semiTitle, styles.bottomBorder]}>{category}</Text>
                        <View key={category} style={[ styles.gridContainer, { flex: columns, paddingTop: theme.spacing.md } ]}>
                            {vehicles[category].map(vehicle => (
                                <TouchableOpacity key={vehicle.id} style={styles.card} onPress={() => {navigation.navigate('EditVehicle', { vehicle: vehicle })}}>
                                    <Image source={{uri: imageUrl?.replace('{id}', vehicle.id!.toString()) || `https://placehold.co/256`}} style={styles.cardImage} />
                                    <View style={styles.cardInfo}>
                                        <Text style={styles.cardText}>{vehicle.model}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}