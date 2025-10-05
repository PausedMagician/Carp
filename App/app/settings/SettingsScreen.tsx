import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, TouchableOpacity, ScrollView, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { createSettingsStyles } from "./SettingsStyles";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useAuth } from '@/hooks/UseAuth';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Booking } from "@/types/openapi";
import { client } from "@/backend/Server";

const Stack = createStackNavigator();

// Account card component
export function AccountCard() {
    const navigation = useNavigation<any>();
    const { darkMode } = useContext(ThemeContext);
    const theme = useThemedStyles();
    const styles = createSettingsStyles(theme);
    const { user } = useAuth();

    if (!user) {
        return (
            <View style={styles.accountCard}>
                <Text style={styles.accountName}>Not logged in</Text>
            </View>
        );
    }

    const fullName = `${user.personal_details.first_name} ${user.personal_details.last_name}`;

    return (
        <View style={styles.accountCard}>
            <View style={styles.accountAvatar}>
                <MaterialCommunityIcons
                    name="face-man-profile"
                    size={70}
                    color={theme.colors.text}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.accountName}>{fullName}</Text>
                <Text style={styles.accountEmail}>{user.email}</Text>
                <Text style={styles.accountEmail}>{user.username}</Text>
                <Text style={styles.accountRole}>{user.department}</Text>
            </View>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate("Account")}
            >
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
        </View>
    );
}

function GeneralSettings({ navigation }: any) {
    const theme = useThemedStyles();
    const styles = createSettingsStyles(theme);
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await (await client).getEmployeeBookingsById(user!.id);
        setBookings(res.data.reverse());
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    if (user) fetchBookings();
  }, [user]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AccountCard />

            <Text style={styles.sectionTitle}>General Settings</Text>

            {/* Dark Mode Toggle */}
            <View style={styles.darkModeRow}>
                <Text style={styles.rowText}>Dark Mode</Text>
                <Switch
                    value={darkMode}
                    onValueChange={setDarkMode}
                    trackColor={{ false: "#767577", true: theme.colors.primary }}
                    thumbColor={darkMode ? theme.colors.background : "#f4f3f4"}
                />
            </View>

            {/* Booking History */}
            <View style={styles.sectionCard}>
                <Text style={styles.sectionCardTitle}>Your Booking History</Text>
                {bookings.length === 0 ? (
                    <Text style={styles.rowText}>No bookings found</Text>
                ) : (
                    bookings.map((b) => (
                        <View key={b.id} style={styles.historyRow}>
                            <View style={styles.historyImageWrapper}>
                                <Image
                                    source={{
                                        uri: b.vehicle?.image || "https://static.vecteezy.com/system/resources/previews/004/999/433/large_2x/car-icon-car-icon-on-white-background-illustration-free-vector.jpg"
                                    }}
                                    style={styles.historyImage}
                                />
                            </View>
                            <View style={styles.historyDetails}>
                                <Text style={styles.historyCarName}>
                                    {b.vehicle ? `${b.vehicle.make} ${b.vehicle.model}` : "Unknown Vehicle"}
                                </Text>
                                <Text style={styles.historyBookedAt}>
                                    {b.start_date} → {b.end_date}
                                </Text>
                                <Text style={styles.historyBookedAt}>{b.purpose}</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>

            {/* Links */}
            <TouchableOpacity
                style={styles.rowLink}
                onPress={() => navigation.navigate("Account")}
            >
                <Text style={styles.rowLinkText}>Account Settings →</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.rowLink}
                onPress={() => navigation.navigate("Notifications")}
            >
                <Text style={styles.rowLinkText}>Notification Settings →</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.rowLink}
                onPress={() => navigation.navigate("Help")}
            >
                <Text style={styles.rowLinkText}>Help & Support →</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function AccountSettings() {
    const theme = useThemedStyles();
    const styles = createSettingsStyles(theme);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>Account Settings</Text>

            <TouchableOpacity style={styles.rowLink}>
                <Text style={styles.rowLinkText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowLink}>
                <Text style={styles.rowLinkText}>Privacy Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowLink}>
                <Text style={styles.rowLinkDangerText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function NotificationSettings() {
    const theme = useThemedStyles();
    const styles = createSettingsStyles(theme);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.sectionCard}>
                <Text style={styles.sectionCardTitle}>Notifications</Text>
                <View style={styles.row}>
                    <Text style={styles.rowText}>Email Notifications</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowText}>Push Notifications</Text>
                </View>
            </View>
        </ScrollView>
    );
}

function HelpSettings() {
    const theme = useThemedStyles();
    const styles = createSettingsStyles(theme);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>Help & Support</Text>
            <TouchableOpacity style={styles.rowLink}>
                <Text style={styles.rowLinkText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rowLink}>
                <Text style={styles.rowLinkText}>Contact Support</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default function SettingsScreen() {
    const theme = useThemedStyles();

    return (
        <>
            <StatusBar style="auto" />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: theme.colors.background },
                    headerTintColor: theme.colors.text,
                    headerTitleStyle: { fontWeight: "bold" },
                }}
            >
                <Stack.Screen name="Settings" component={GeneralSettings} />
                <Stack.Screen name="Account" component={AccountSettings} />
                <Stack.Screen name="Notifications" component={NotificationSettings} />
                <Stack.Screen name="Help" component={HelpSettings} />
            </Stack.Navigator>
        </>
    );
}