import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { useAuth } from './hooks/UseAuth';

import LoginScreen from './app/login/LoginScreen';

import HomeStack from './navigation/HomeStack';
import QuickBookStack from './navigation/QuickBookStack';
import SearchStack from './navigation/SearchStack';
import SettingsStack from './navigation/SettingsStack';
import AdminScreen from './app/admin/AdminScreen';

import { theme } from './constants/theme';

import { appStyles as styles } from './AppStyles';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

/**
 * Shown after login
 *
 * Tabs: Home | Search | Quick Book | Settings | Admin (if admin)
 */
function MainTabs() {
    // ToDo
    const auth = useAuth();

    // hardcoded to false :)
    const isAdmin = false;

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            source={require('./assets/icons/navigation/fish.png')}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Search"
                component={SearchStack}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            source={require('./assets/icons/navigation/search_fill.png')}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="QuickBook"
                component={QuickBookStack}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => <QuickBookButton />,
                }}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsStack}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            source={require('./assets/icons/navigation/settings_fill.png')}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            {/* Kinda ugly */}
            {isAdmin && (
                <Tab.Screen
                    name="Admin"
                    component={AdminScreen}
                    options={{
                        tabBarLabel: 'Admin',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                source={require('./assets/icons/navigation/admin_fill.png')}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />
            )}
        </Tab.Navigator>
    );
}

/**
 * Shows LoginScreen if not authenticated, MainTabs if authenticated
 */
function RootNavigator() {
    const auth = useAuth();

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {auth.user == null ? (
                <RootStack.Screen name="Login" component={LoginScreen} />
            ) : (
                <RootStack.Screen name="MainTabs" component={MainTabs} />
            )}
        </RootStack.Navigator>
    );
}

// export redundant?
export default function App() {
    return (
        <AuthProvider>
            <BookingProvider>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </BookingProvider>
        </AuthProvider>
    );
}


interface TabIconProps {
    source: any;
    color: string;
    focused: boolean;
}

function TabIcon({ source, color, focused }: TabIconProps) {
    return (
        <Image
            source={source}
            style={[
                styles.tabIcon,
                { tintColor: color },
                focused && styles.tabIconFocused,
            ]}
            resizeMode="contain"
        />
    );
}

function QuickBookButton() {
    return (
        <View style={styles.quickBookContainer}>
            <View style={styles.quickBookButton}>
                <View style={styles.quickBookPlus}>
                    <View style={styles.plusHorizontal} />
                    <View style={styles.plusVertical} />
                </View>
            </View>
        </View>
    );
}