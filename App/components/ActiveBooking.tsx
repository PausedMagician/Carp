import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import moment from "moment";
import { Image } from "expo-image";

import { fromByteArray } from 'base64-js';

import { theme } from "@/constants/theme";

import { client } from "@/backend/Server";
import { Booking, Vehicle } from "@/types/openapi";

export function ActiveBooking({ booking}: { booking: Booking | null }) {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const {width, height} = useWindowDimensions();
    const [image, setImage] = useState<{ uri: string } | null>(null);

    useEffect(() => {
        if (!booking) return;
        //@ts-expect-error
        setVehicle(booking.vehicle);
    }, [booking]);

    useEffect(() => {
            client.then(async (c) => {
                c.getVehicleImage(vehicle!.id!, null, { responseType: 'arraybuffer' }).then(response => {
                    //@ts-expect-error
                    const base64String = fromByteArray(new Uint8Array(response.data));
                    const imageUri = `data:image/png;base64,${base64String}`;
                    setImage({ uri: imageUri });
                });
            });
        }, [vehicle]);
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your current bookings</Text>
            {vehicle && (
                <View style={[styles.card, { width: width * 0.9 }]}>
                    <View style={styles.leftSection}>
                        <Image source={image} style={styles.vehicleImage} />
                        <Text style={styles.vehicleName}>
                            {vehicle.make} {vehicle.model}
                        </Text>
                    </View>
                    <View style={styles.rightSection}>
                        <Text style={styles.bookingDate}>
                            Booking Date: {moment(booking?.start_date).format('YYYY-MM-DD')} to {moment(booking?.end_date).format('YYYY-MM-DD')}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 3,
        padding: theme.spacing.md,
    },
    title: {
        fontSize: theme.fontSize.lg,
        fontWeight: 'bold',
        marginBottom: theme.spacing.lg,
        alignSelf: 'center',
        color: theme.colors.text,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: theme.colors.secondary,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        shadowColor: theme.shadow.small.shadowColor,
        shadowOffset: theme.shadow.small.shadowOffset,
        shadowOpacity: theme.shadow.small.shadowOpacity,
        shadowRadius: theme.shadow.small.shadowRadius,
    },
    vehicleImage: {
        width: '100%',
        height: 80,
        borderRadius: theme.borderRadius.md,
    },
    details: {
        marginLeft: theme.spacing.md,
        justifyContent: 'center',
        position: 'relative',
    },
    vehicleName: {
        fontSize: theme.fontSize.md,
        fontWeight: '600',
        marginBottom: theme.spacing.xs,
        flexWrap: 'wrap',
        color: theme.colors.text,
    },
    bookingDate: {
        fontSize: 14,
        color: theme.colors.textTertiary,
    },
    rightSection: {
        marginLeft: theme.spacing.md,
        justifyContent: 'center',
        flex: 1,
        flexShrink: 1,
    },
    leftSection: {
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
    },
});