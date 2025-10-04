import { useBooking } from "@/hooks/UseBooking";
import { Vehicle } from "@/types/openapi";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import moment from "moment";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


export default function CarCarouselItem({vehicle}: {vehicle: Vehicle}) {
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
            bookingContext.setSelectedVehicle(vehicle);
            const fromTime = moment().startOf('day');
            const toTime = moment().startOf('day').add(1, 'day');
            bookingContext.setDateRange(fromTime.toDate(), toTime.toDate());
            alert(`Selected ${vehicle.make} ${vehicle.model} for booking.\nFrom: ${fromTime.format('YYYY-MM-DD')}\nTo: ${toTime.format('YYYY-MM-DD')}`);
        }
    }

    const [assets, error] = useAssets([require("../assets/images/cars/1.png"), require("../assets/images/cars/2.png")])

    return (
        // Replace mock data with actual data when db ready
        <TouchableOpacity
            style={styles.slide}
            onPressIn={handlePressIn}
            onPress={handlePressOut}
            activeOpacity={1}
        >
            {/* <Image source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFcp63ROWYAE4aU0.png&f=1&nofb=1&ipt=25161646c178644682cf0bcb2c879914af17bd8f164a9009209124dbbd9d2996" }} style={styles.image} 
            pointerEvents="none"/> */}
            {assets && (<Image source={assets[vehicle.id! % 2]} style={styles.image} pointerEvents="none" />)}
            <Text style={styles.title}>{vehicle.make} {vehicle.model}</Text>
            <Text style={styles.text}>Distance Covered: 300 nmi  </Text>
            <Text style={styles.text}>Last Serviced: {vehicle.year}</Text>
            <Text style={styles.text}>Location: Some Address 123 Some City 123</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    slide: {
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        height: '100%',
        width: 'auto',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        flex: 1,
        borderRadius: 5,
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
});