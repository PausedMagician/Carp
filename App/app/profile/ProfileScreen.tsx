import { styles } from "@/constants/Stylings";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

export default function ProfileScreen() {

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* <Navigator /> */}
    </View>

  );
}