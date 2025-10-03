import { styles } from "@/App";
import { MyCarousel } from "@/components/CarCarousel";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
        <MyCarousel />
    </View>

  );
}