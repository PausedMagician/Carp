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

type AddEmployeeNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'AddEmployee'>;

export default function AdminAddEmployeeScreen() {
    const navigation = useNavigation<AddEmployeeNavigationProp>();

    const [image, setImage] = useState<{ uri: string } | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [department, setDepartment] = useState("");


    const [addButtonPressedAt, setAddButtonPressedAt] = useState<number | null>(null);
    const [saveButtonText, setSaveButtonText] = useState("Add");

    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);

    const addHandler = () => {
        setAddButtonPressedAt(Date.now());
            setSaveButtonText("Are you sure?");

            setTimeout(() => {
                setAddButtonPressedAt(null);
                setSaveButtonText("Save");
            }, 2000);
        if (addButtonPressedAt && (Date.now() - addButtonPressedAt) < 2000) {
            // Save
            client.then(c => {
                const employeeData: Employee = {
                    username,
                    password,
                    email,
                    department,
                    personal_details: {
                        first_name: firstName,
                        last_name: lastName,
                        birthday: birthday,
                    },
                };
                c.createEmployee(null, employeeData).then(() => {
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
                    <FormInputText label="Password" value={password} onChange={setPassword} />
                    <FormInputText label="Email" value={email} onChange={setEmail} />
                    <FormInputText label="Department" value={department} onChange={setDepartment} />
                    <FormInputSwitch label="Admin" value={isAdmin ? isAdmin : false} onChange={setIsAdmin} />

                    <View style={[styles.formGroup, { margin: 10, justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={addHandler}>
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