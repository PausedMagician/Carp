import React from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StatusBar } from "expo-status-bar";

import { settingsStyles as s } from "./SettingsStyles";


const Stack = createStackNavigator();

// Account card component
function AccountCard() {
  return (
    <View style={s.accountCard}>
        <View style={s.accountAvatar}>
        <MaterialCommunityIcons name="face-man-profile" size={60} color="black" />
        </View>
     <View style={{ flex: 1 }}>
        <Text style={s.accountName}>Sig Mason</Text>
        <Text style={s.accountEmail}>Sigmason@company.com</Text>
        <Text style={s.accountRole}>Fleet Manager</Text>
      </View>
      <TouchableOpacity style={s.editButton}>
        <Text style={s.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>

  );
}

function GeneralSettings({ navigation }: any) {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView contentContainerStyle={s.container}>
      <AccountCard />

      <Text style={s.sectionTitle}>General Settings</Text>

      <TouchableOpacity style={s.rowLink} onPress={() => navigation.navigate("Account")}>
        <Text style={s.rowLinkText}>Account Settings →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.rowLink} onPress={() => navigation.navigate("Notifications")}>
        <Text style={s.rowLinkText}>Notification Settings →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.rowLink} onPress={() => navigation.navigate("Help")}>
        <Text style={s.rowLinkText}>Help & Support →</Text>
      </TouchableOpacity>

      
      <View style={s.darkModeRow}>
        <Text style={s.rowText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </ScrollView>
  );
}

function AccountSettings() {
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
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(false);

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
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={GeneralSettings} />
        <Stack.Screen name="Account" component={AccountSettings} />
        <Stack.Screen name="Notifications" component={NotificationSettings} />
        <Stack.Screen name="Help" component={HelpSettings} />
      </Stack.Navigator>
    </>
  );
}
