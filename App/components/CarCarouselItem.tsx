
import { Vehicle } from "@/backend/Server";
import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";


export default function CarCarouselItem({vehicle}: {vehicle: Vehicle}) {
    return (
        // Replace mock data with actual data when db ready
        <View style={styles.slide}>
            <Image source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFcp63ROWYAE4aU0.png&f=1&nofb=1&ipt=25161646c178644682cf0bcb2c879914af17bd8f164a9009209124dbbd9d2996" }} style={styles.image} />
            <Text style={styles.title}>{vehicle.make} {vehicle.model}</Text>
            <Text style={styles.text}>Distance Covered: 4000nmi  </Text>
            <Text style={styles.text}>Last Serviced: {vehicle.year}</Text>
            <Text style={styles.text}>Location: Some Address 123 Some City 123</Text>
        </View>
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