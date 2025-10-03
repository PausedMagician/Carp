import { styles } from "@/constants/Stylings";
import { MyCarousel } from "@/components/CarCarousel";
import { View, Text } from "react-native";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
        <MyCarousel />
    </View>

  );
}