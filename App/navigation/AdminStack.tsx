import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { AdminScreen } from "@/app/Screens";
import { AdminStackParamList } from '@/types/Navigation';
import AdminAllVehiclesScreen from '@/app/admin/allVehicles/AllVehiclesScreen';
import AdminEditVehicleScreen from '@/app/admin/editVehicle/EditVehicleScreen';
import AdminAddVehicleScreen from '@/app/admin/addVehicle/AddVehicleScreen';
import AdminAllEmployeesScreen from '@/app/admin/allEmployees/AllEmployeesScreen';
import AdminEditEmployeeScreen from '@/app/admin/editEmployee/EditEmployeeScreen';
import AdminAddEmployeeScreen from '@/app/admin/addEmployee/AddEmployeeScreen';

const Stack = createNativeStackNavigator<AdminStackParamList>();


export default function AdminStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={AdminScreen}
                options={{ title: 'Admin Dashboard' }}
            />
            <Stack.Screen
                name="AllVehicles"
                component={AdminAllVehiclesScreen}
                options={{
                    title: 'All Vehicles',
                    headerShown: true,
                    headerBackTitle: 'Back',
                }}
            />
            <Stack.Screen
                name="EditVehicle"
                component={AdminEditVehicleScreen}
                options={{
                    title: 'Edit Vehicle',
                    headerShown: true,
                    headerBackTitle: 'Back',
                }}
            />
            <Stack.Screen
                name="AddVehicle"
                component={AdminAddVehicleScreen}
                options={{
                    title: 'Add Vehicle',
                    headerShown: true,
                    headerBackTitle: 'Back',
                }}
            />
            <Stack.Screen
                name="AllEmployees"
                component={AdminAllEmployeesScreen}
                options={{
                    title: 'All Employees',
                    headerShown: true,
                    headerBackTitle: 'Back',
                }}
            />
            <Stack.Screen
                name="EditEmployee"
                component={AdminEditEmployeeScreen}
                options={{
                    title: 'Edit Employee',
                    headerShown: true,
                    headerBackTitle: 'Back',
                }}
            />
            <Stack.Screen
                name="AddEmployee"
                component={AdminAddEmployeeScreen}
                options={{
                    title: 'Add Employee',
                    headerShown: true,
                    headerBackTitle: 'Back',
                }}
            />
        </Stack.Navigator>
    );
}