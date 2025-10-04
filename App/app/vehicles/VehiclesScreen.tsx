import {StatusBar} from "expo-status-bar";
import {useCallback, useEffect, useState} from "react";
import {View, Text, FlatList} from "react-native";

import { styles } from "@/constants/Stylings";
import { client } from "@/backend/Server";
import { Vehicle } from "@/types/openapi";
import { useBooking } from "@/hooks/UseBooking";
import CarListItem from "@/components/CarListItem";
// import { Car, getAll } from "@/types/Car";

interface VehicleWithAvailability {
    car: Vehicle;
    isAvailable: boolean;
}

export default function VehiclesScreen() {
    const [vehicles, setVehicles] = useState<VehicleWithAvailability[]>([]);

    // I imagine the useBooking() should be imported from BookingContext
    // @ts-ignore
    const {checkAvailability} = useBooking();

    useEffect(() => {
        loadVehicles();
    }, []);

    /**
     * ToDo: Load vehicles from backend and check their availability
     */
    const loadVehicles = useCallback(async () => {
        try {

            // ToDo: Fetch vehicles from backend


            // ToDo: Check availability for each vehicle
            // We could set a default as today and tomorrow as default date range
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            // Collection consisting of available vehicles, make a Promise?
            // @ts-ignore
            const vehiclesWithAvailability = await Promise.all(

            );

            //setVehicles(vehiclesWithAvailability);
        } catch (e) {
            console.error("Error loading vehicles:", e);
        }
    }, [checkAvailability]);

    // --- Old ---
    useEffect(() => {
        const map: { car: Vehicle, isAvailable: boolean }[] = [];
        client.then(c => c.getVehicles().then(vehicles => {
            vehicles.data.forEach(v => map.push({car: v, isAvailable: true})); // TODO: isAvailable
            setVehicles(map);
        })).catch(err => console.error(err));
    }, [])

    return (
        <View style={styles.container}>
            <Text>Meow</Text>
            {/* <Text>Cars: {cars.toString()}</Text> */}
            <FlatList
                data={vehicles}
                renderItem={CarListItem}
            />
            <StatusBar style="auto"/>
            {/* <Navigator /> */}
        </View>
    );
}