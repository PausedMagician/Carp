import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { createProfileStyles } from "@/app/profile/ProfileStyles";

export default function ProfileScreen() {
    const theme = useThemedStyles();
    const styles = createProfileStyles(theme);

    return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* <Navigator /> */}
    </View>

    );
}