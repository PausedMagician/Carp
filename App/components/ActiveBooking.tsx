import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Booking, Vehicle } from "@/types/openapi";
import { client } from "@/backend/Server";

export function ActiveBooking({ booking}: { booking: Booking | null }) {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        if (!booking) return;
        //@ts-expect-error
        setVehicle(booking.vehicle);
    }, [booking]);

    return (
        <View style={styles.container}>
            <Text>Active Booking</Text>
            {vehicle && (
                <>
                    <Text>Vehicle: {vehicle.make} {vehicle.model}</Text> 
                </>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
});