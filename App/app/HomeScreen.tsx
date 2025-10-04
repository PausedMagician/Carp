import { styles } from "@/constants/Stylings";
import { MyCarousel } from "@/components/CarCarousel";
import { View, Text } from "react-native";
import { ActiveBooking } from "@/components/ActiveBooking";
import { useEffect, useState } from "react";
import { Booking } from "@/types/openapi";
import { client } from "@/backend/Server";

export default function HomeScreen() {
    const [booking, setBooking] = useState<Booking | null>(null);

    useEffect(() => {
        client.then((c) => {
            c.getBookingById(5).then((response) => {
                setBooking(response.data);
            });
        });
    }, []);
    return (
        <View style={styles.container}>
            <ActiveBooking booking={booking} />
            <MyCarousel />
        </View>

    );
}