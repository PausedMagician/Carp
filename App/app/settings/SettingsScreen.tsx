import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, TouchableOpacity, ScrollView, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { settingsStyles } from "./SettingsStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useAuth } from '@/hooks/UseAuth';

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

  const bookingHistory = [
    {
      id: 1,
      carName: "Tesla Model 3",
      image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Specs-LR-AWD-Desktop-Metric.png",
      bookedAt: "2025-09-21 14:30",
    },
    {
      id: 2,
      carName: "BMW i4",
      image: "https://www.bmw.dk/content/dam/bmw/common/all-models/i-series/i4/onepager-new/bmw-i4-edrive-40-onepager-ms-sustainability.jpg",
      bookedAt: "2025-09-15 09:15",
    },
    {
      id: 3,
      carName: "Audi e-tron",
      image: "https://mediaservice.audi.com/media/fast/v3_x2SX2hbZRjGv_26tjPJaXZSm_aksWfk5ASZxCZpurZKdJmKMhwWW_ViF9nX5EtytuQknnxpC1P0RvBGwZvtcirDi7HKxAsHk8FQL4YgyLwQFfyDqOCEwWA6hOGpdy8vz_N7X3iei3-J0WEgOH7k4u3pf8b2rf-EENt9IUYOilE9DDZ6e4QQq0S8rmyp-ZN91Zp-SOmg5-fVts7Lzf58qVA6lP9_9fR6frWar76wWNzOl48W87LTiYvx0C9GhBh_XYjRd3dpYmJyGHT6MpDdhwM16Pf8gbepzAeLamGprBqLpUONlUah3FhpLjVVaakhlzfqy6qwIJfrK81yvZwIEWfFSEgX9_uter0ZntYL5YYanNK9_nZHjDWX-8FWQ-zdfY0Dr_LAxyTXSH5E8jKWgXWP1AVSl7EvYF_B_gr7BpmvydzB2YMTxXkSZx3nFjnIPU4uQBwmFhA7R9xmZofZ30j7pE-Qfou0xr2NWMT8lITJ1HmS86SaZA-S_Q53Cvcl3EtEokTOE8sTewxDM1HGPEbiJIlPmPoGy8f6EusWzhjZONka2XNkd3AfJfoM0TskP8C4jhnDrGFKzC9IDLE01mekn2fue-b-Zu5f7H3Y-7EPkPkT5wyOxrmKcw13L24C18J9DvdHjLMYvxPvsb9F6jQzQ1JXiH_L5D2m2iTfJHmN6aPMvIH9Cu5x3JdxryPGue8XIk8RGRC5S3SD6GmiPxAziH2IcQLjbYwbTBjEqySOYb1D6mdmt0jvMHcV-xEyd3EymIex1rFeIz2K8wexWSZuEr-JOYZ5BvN9zF9Jfh6m_J7yN70w3a7ydeWJsCda-tqTtbXeULerzcCry9oRWT_V70itBrktr6HbleJKqZBrK6_V1pViuVzIyU6_LStN2RmoXF12VSArazpsc61aK9UKhVDgh-3WXsivrPYG3u707K49N9BKBZ7fkn6royrFQq6rtGxILTdVMAhVldLkSPXF1f8AJjRpVEUDAAA.webp?wid=480",
      bookedAt: "2025-09-01 18:00",
    },
  ];

  return (
    <ScrollView contentContainerStyle={s.container}>
      <AccountCard />

      <Text style={s.sectionTitle}>General Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={s.darkModeRow}>
        <Text style={s.rowText}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={(value: boolean) => setDarkMode(value)}
          trackColor={{ false: "#767577", true: "#007AFF" }}
          thumbColor={darkMode ? "#fff" : "#f4f3f4"}
        />
      </View>

      {/* Booking History */}
      <View style={s.sectionCard}>
        <Text style={s.sectionCardTitle}>Booking History</Text>

        {bookingHistory.map((entry) => (
          <View key={entry.id} style={s.historyRow}>
            <View style={s.historyImageWrapper}>
              <Image source={{ uri: entry.image }} style={s.historyImage} />
            </View>
            <View style={s.historyDetails}>
              <Text style={s.historyCarName}>{entry.carName}</Text>
              <Text style={s.historyBookedAt}>{entry.bookedAt}</Text>
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
