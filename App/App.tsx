import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { ThemeProvider } from './app/settings/ThemeProvider';

import { useAuth } from './hooks/UseAuth';
import { useThemedStyles } from './hooks/useThemedStyles';

import LoginScreen from './app/login/LoginScreen';
import SettingsScreen from './app/settings/SettingsScreen';
import AdminScreen from "./app/admin/AdminScreen";

import HomeStack from './navigation/HomeStack';
import QuickBookStack from './navigation/QuickBookStack';
import SearchStack from './navigation/SearchStack';
import SettingsStack from './navigation/SettingsStack';

import { createAppStyles } from './AppStyles';
import AdminStack from './navigation/AdminStack';
import {colors} from "@/constants/theme";

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

// ToDo: We need to integrate with the browser's API to make the back/forward buttons work

interface TabIconProps {
    source: any;
    color: string;
    focused: boolean;
    // So we can override the size of icons
    width?: number;
    height?: number;
}

function TabIcon({ source, color, focused, width, height }: TabIconProps) {
    const theme = useThemedStyles();
    const styles = createAppStyles(theme);

    return (
        <Image
            source={source}
            style={[
                styles.tabIcon,
                width && { width },
                height && { height },
                { tintColor: color },
                focused && styles.tabIconFocused,
            ]}
            resizeMode="contain"
        />
    );
}

/**
 * Shown after login
 *
 * Tabs: Home | Search | Quick Book | Settings | Admin (if admin)
 */
function MainTabs() {
    const theme = useThemedStyles();
    const styles = createAppStyles(theme);

    // hardcoded to false :)
    const isAdmin = useAuth().user?.isAdmin ?? false;
    console.log(isAdmin);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                sceneStyle: {
                    backgroundColor: colors.light.background,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, focused}) => (
                        <TabIcon
                            source={require('./assets/fish.png')}
                            color={color}
                            focused={focused}
                            width={40}
                            height={40}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Search"
                component={SearchStack}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            source={require('./assets/icons/navigation/search.png')}
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
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            source={require('./assets/icons/navigation/quick-book.png')}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsStack}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            source={require('./assets/icons/navigation/settings_fill.png')}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            {isAdmin && (
                <Tab.Screen
                    name="Admin"
                    component={AdminStack}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                source={require('./assets/icons/navigation/admin.png')}
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
                <RootStack.Screen
                    key="guest"
                    name="Login"
                    component={LoginScreen} />
            ) : (
                <RootStack.Screen
                    key="user"
                    name="MainTabs"
                    component={MainTabs} />
            )}
        </RootStack.Navigator>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <BookingProvider>
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                </BookingProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}