import { Booking, Car } from "@/backend/Server";
import { ListRenderItemInfo, Text, View, StyleSheet } from "react-native";


export default function CarListItem(entry: ListRenderItemInfo<{car: Car, bookings: Booking[], isAvailable: boolean}>) {
    return (
        <View style={[styles.container, !entry.item.isAvailable && styles.unavailableContainer]}>
            <View style={styles.header}>
                <Text style={styles.name}> {entry.item.car.make} </Text>
                <Text style={entry.item.isAvailable ? styles.price : styles.unavailableText}>
                     {entry.item.car.type}
                </Text>
            </View>

            <Text style={styles.model}> {entry.item.car.model} </Text>
            <Text style={styles.year}> {entry.item.car.year} </Text>

            <View style={styles.availablilityContainer}>
                <Text style={[
                    styles.availability,
                    entry.item.isAvailable ? styles.available : styles.unavailable
                ]}>
                    {entry.item.isAvailable ? 'Available' : 'Unavailable'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5
    },
    unavailableContainer: {
        opacity: 0.7,
        backgroundColor: '#f8f8f8'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#999999',
        flex: 1
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#999999'
    },
    unavailableText: {
        color: '#999999'
    },
    model: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 4,
    },
    year: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 8,
    },
    availablilityContainer: {
        alignItems: 'flex-start',
    },
    availability: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    available: {
        color: '#4caf50'
    },
    unavailable: {
        color: '#f44336'
    }
});
