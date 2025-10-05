import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";
import { Booking, Vehicle } from "@/types/openapi";
import moment from "moment";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Theme } from "@/constants/theme";

export function ActiveBooking({ booking }: { booking: Booking | null }) {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const { width, height } = useWindowDimensions();
    const theme = useThemedStyles();
    const styles = createStyles(theme);

    useEffect(() => {
        if (!booking) return;
        //@ts-expect-error
        setVehicle(booking.vehicle);
    }, [booking]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your current bookings</Text>
            {vehicle && (
                <View style={[styles.card, { width: width * 0.9 }]}>
                    <View style={styles.leftSection}>
                        <Image
                            source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFcp63ROWYAE4aU0.png&f=1&nofb=1&ipt=25161646c178644682cf0bcb2c879914af17bd8f164a9009209124dbbd9d2996" }}
                            style={styles.vehicleImage}
                        />
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
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        alignSelf: 'center',
        color: theme.colors.text,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: theme.colors.secondary,
        borderRadius: theme.borderRadius.md,
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    vehicleImage: {
        width: '100%',
        height: 80,
        borderRadius: 8,
    },
    details: {
        marginLeft: 12,
        justifyContent: 'center',
        position: 'relative',
    },
    vehicleName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        flexWrap: 'wrap',
        color: theme.colors.text,
    },
    bookingDate: {
        fontSize: 14,
        color: theme.colors.textTertiary,
    },
    rightSection: {
        marginLeft: 16,
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