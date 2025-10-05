import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, TouchableOpacity, ScrollView, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { settingsStyles } from "./SettingsStyles";
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
  const s = useThemedStyles(settingsStyles);
  const { user } = useAuth();

  if (!user) {
    return (
      <View style={s.accountCard}>
        <Text style={s.accountName}>Not logged in</Text>
      </View>
    );
  }

  const fullName = `${user.personal_details.first_name} ${user.personal_details.last_name}`;

  return (
    <View style={s.accountCard}>
      <View style={s.accountAvatar}>
        <MaterialCommunityIcons name="face-man-profile" size={70} color={darkMode ? "#fff" : "#000"} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.accountName}>{fullName}</Text>
        <Text style={s.accountEmail}>{user.email}</Text>
        <Text style={s.accountEmail}>{user.username}</Text>
        <Text style={s.accountRole}>{user.department}</Text>
      </View>
      <TouchableOpacity style={s.editButton} onPress={() => navigation.navigate("Account")}>
        <Text style={s.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

function GeneralSettings({ navigation }: any) {
  const s = useThemedStyles(settingsStyles);
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
    <ScrollView contentContainerStyle={s.container}>
      <AccountCard />

      <Text style={s.sectionTitle}>General Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={s.darkModeRow}>
        <Text style={s.rowText}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#767577", true: "#007AFF" }}
          thumbColor={darkMode ? "#fff" : "#f4f3f4"}
        />
      </View>

      {/* Booking History */}
      <View style={s.sectionCard}>
        <Text style={s.sectionCardTitle}>Your Booking History</Text>
        {bookings.map((b) => (
          <View key={b.id} style={s.historyRow}>
            <View style={s.historyImageWrapper}>
              <Image
                source={{ uri: b.vehicle?.image || "https://static.vecteezy.com/system/resources/previews/004/999/433/large_2x/car-icon-car-icon-on-white-background-illustration-free-vector.jpg" }}
                style={s.historyImage}
              />
            </View>
            <View style={s.historyDetails}>
              <Text style={s.historyCarName}>
                {b.vehicle ? `${b.vehicle.make} ${b.vehicle.model}` : "Unknown Vehicle"}
              </Text>
              <Text style={s.historyBookedAt}>
                {b.start_date} → {b.end_date}
              </Text>
              <Text style={s.historyBookedAt}>{b.purpose}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Links */}
      <TouchableOpacity style={s.rowLink} onPress={() => navigation.navigate("Account")}>
        <Text style={s.rowLinkText}>Account Settings →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.rowLink} onPress={() => navigation.navigate("Notifications")}>
        <Text style={s.rowLinkText}>Notification Settings →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.rowLink} onPress={() => navigation.navigate("Help")}>
        <Text style={s.rowLinkText}>Help & Support →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function AccountSettings() {
  const s = useThemedStyles(settingsStyles);
  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.sectionTitle}>Account Settings</Text>

      <TouchableOpacity style={s.rowLink}>
        <Text style={s.rowLinkText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.rowLink}>
        <Text style={s.rowLinkText}>Privacy Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.rowLink}>
        <Text style={s.rowLinkDangerText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function NotificationSettings() {
  const s = useThemedStyles(settingsStyles);
  return (
    <ScrollView contentContainerStyle={s.container}>
      <View style={s.sectionCard}>
        <Text style={s.sectionCardTitle}>Notifications</Text>
        <View style={s.row}>
          <Text>Email Notifications</Text>
        </View>
        <View style={s.row}>
          <Text>Push Notifications</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function HelpSettings() {
  const s = useThemedStyles(settingsStyles);
  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.sectionTitle}>Help & Support</Text>
      <TouchableOpacity style={s.rowLink}>
        <Text style={s.rowLinkText}>FAQ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.rowLink}>
        <Text style={s.rowLinkText}>Contact Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default function SettingsScreen() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: darkMode ? "#555" : "#fff" },
          headerTintColor: darkMode ? "#fff" : "#000",
          headerTitleStyle: { fontWeight: "bold" },
          }}>
        <Stack.Screen name="Settings" component={GeneralSettings} />
        <Stack.Screen name="Account" component={AccountSettings} />
        <Stack.Screen name="Notifications" component={NotificationSettings} />
        <Stack.Screen name="Help" component={HelpSettings} />
      </Stack.Navigator>
    </>
  );
}
