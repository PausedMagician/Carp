import { useThemedStyles } from "@/hooks/useThemedStyles";
import { useState } from "react";
import { createAdminStyles } from "../AdminStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AdminStackParamList } from "@/types/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import FormInputText from "../components/FormInputText";
import FormInputDate from "../components/FormInputDate";
import FormInputSwitch from "../components/FormInputSwitch";
import { Employee } from "@/types/openapi";
import { client } from "@/backend/Server";

type EditEmployeeRouteProp = RouteProp<AdminStackParamList, 'EditEmployee'>
type EditEmployeeNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'EditEmployee'>;

export default function AdminEditEmployeeScreen() {
    const route = useRoute<EditEmployeeRouteProp>();
    const { employee, image } = route.params;
    const navigation = useNavigation<EditEmployeeNavigationProp>();


    const [firstName, setFirstName] = useState(employee.personal_details.first_name);
    const [lastName, setLastName] = useState(employee.personal_details.last_name);
    const [birthday, setBirthday] = useState(employee.personal_details.birthday);
    const [username, setUsername] = useState(employee.username);
    const [email, setEmail] = useState(employee.email);
    const [isAdmin, setIsAdmin] = useState(employee.isAdmin);
    const [department, setDepartment] = useState(employee.department);


    const [deleteButtonPressedAt, setDeleteButtonPressedAt] = useState<number | null>(null);
    const [saveButtonPressedAt, setSaveButtonPressedAt] = useState<number | null>(null);
    const [saveButtonText, setSaveButtonText] = useState("Save");
    const [deleteButtonText, setDeleteButtonText] = useState("Delete");

    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);


    const deleteHandler = () => {
        setDeleteButtonPressedAt(Date.now());
        setDeleteButtonText("Are you sure?");

        setTimeout(() => {
            setDeleteButtonPressedAt(null);
            setDeleteButtonText("Delete");
        }, 2000);

        if (deleteButtonPressedAt && (Date.now() - deleteButtonPressedAt) < 2000) {
            // Delete
            setDeleteButtonPressedAt(null);
        }
    }

    const saveHandler = () => {
        setSaveButtonPressedAt(Date.now());
            setSaveButtonText("Are you sure?");

            setTimeout(() => {
                setSaveButtonPressedAt(null);
                setSaveButtonText("Save");
            }, 2000);
        if (saveButtonPressedAt && (Date.now() - saveButtonPressedAt) < 2000) {
            // Save
            client.then(c => {
                const employeeData: Employee = {
                    ...employee,
                    username: username || employee.username,
                    email: email || employee.email,
                    department: department || employee.department,
                    personal_details: {
                        ...employee.personal_details,
                        first_name: firstName || employee.personal_details.first_name,
                        last_name: lastName || employee.personal_details.last_name,
                        birthday: birthday || employee.personal_details.birthday,
                    },
                    isAdmin: isAdmin || false,
                };
                c.updateEmployee(employee.id!, employeeData).then(() => {
                    navigation.goBack();
                });
            });
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formImageContainer}>
                {/* Image Goes Here */}
                {image ? 
                    <Image style={styles.formImage} source={image} /> :
                    <Image style={styles.formImage} source={{uri: 'https://placehold.co/600x400'}} />
                }
            </View>
            <View style={styles.formInputs}>
                <ScrollView showsVerticalScrollIndicator style={styles.formScroll} contentContainerStyle={styles.formContainer}>
                    {/* All inputs */}
                    <Text style={[styles.semiTitle, styles.bottomBorder]}>
                        Personal details
                    </Text>
                    <FormInputText label="First Name" value={firstName} onChange={setFirstName} />
                    <FormInputText label="Last Name" value={lastName} onChange={setLastName} />
                    <FormInputDate label="Birthday" value={birthday} onChange={setBirthday} />

                    <Text style={[styles.semiTitle, styles.bottomBorder]}>
                        Account details
                    </Text>

                    <FormInputText label="Username" value={username} onChange={setUsername} />
                    <FormInputText label="Email" value={email} onChange={setEmail} />
                    <FormInputText label="Department" value={department} onChange={setDepartment} />
                    <FormInputSwitch label="Admin" value={isAdmin ? isAdmin : false} onChange={setIsAdmin} />

                    <View style={[styles.formGroup, { margin: 10, justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={deleteHandler}>
                            <Text style={styles.buttonText}>
                                {deleteButtonText}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={saveHandler}>
                            <Text style={styles.buttonText}>
                                {saveButtonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}