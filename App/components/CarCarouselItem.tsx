import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import moment from "moment";

import { fromByteArray } from 'base64-js';

import { client } from "@/backend/Server";
import { Vehicle } from "@/types/openapi";

import { theme } from "@/constants/theme";
import { useBooking } from "@/hooks/UseBooking";

interface CarCarouselItemProps {
    vehicle: Vehicle;
    onVehiclePress?: (vehicle: Vehicle) => void;
}

export default function CarCarouselItem({vehicle, onVehiclePress}: CarCarouselItemProps) {
    const [pressStart, setPressStart] = useState({ x: 0, y: 0, time: 0 });

    const bookingContext = useBooking();

    const handlePressIn = (event: any) => {
        setPressStart({
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY,
            time: Date.now(),
        });
    }
    const handlePressOut = (event: any) => {
        const moveX = Math.abs(event.nativeEvent.pageX - pressStart.x);
        const moveY = Math.abs(event.nativeEvent.pageY - pressStart.y);
        const duration = Date.now() - pressStart.time;

        if (moveX < 10 && moveY < 10 && duration < 200) {
            onVehiclePress?.(vehicle);
        }
    }

    const [image, setImage] = useState<{ uri: string } | null>(null);

    useEffect(() => {
        client.then(async (c) => {
            c.getVehicleImage(vehicle.id!, null, { responseType: 'arraybuffer' }).then(response => {
                //@ts-expect-error
                const base64String = fromByteArray(new Uint8Array(response.data));
                const imageUri = `data:image/png;base64,${base64String}`;
                setImage({ uri: imageUri });
            });
        });
    }, [vehicle.id]);

    return (
        <TouchableOpacity
            style={styles.slide}
            onPressIn={handlePressIn}
            onPress={handlePressOut}
            activeOpacity={0.95}
        >
            <Image source={image} style={styles.image} pointerEvents="none" />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{vehicle.make} {vehicle.model}</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.text}>Year: {vehicle.year}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.text}>Color: {vehicle.color}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.text}>Type: {vehicle.type}</Text>
                </View>

                <View style={styles.licenseBadge}>
                    <Text style={styles.licenseText}>
                        {vehicle.registration?.license}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    slide: {
        backgroundColor: theme.colors.secondary,
        borderRadius: theme.borderRadius.lg,
        height: '100%',
        width: 'auto',
        padding: theme.spacing.lg,
        ...theme.shadow.medium,
    },
    image: {
        flex: 1,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        backgroundColor: theme.colors.background,
    },
    detailsContainer: {
        gap: theme.spacing.xs,
    },
    title: {
        fontSize: theme.fontSize.xl,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textTertiary,
    },
    licenseBadge: {
        marginTop: theme.spacing.sm,
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignSelf: 'flex-start',
    },
    licenseText: {
        fontSize: theme.fontSize.sm,
        fontWeight: 'bold',
        color: theme.colors.background,
        letterSpacing: 1,
    },
});