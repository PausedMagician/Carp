import { useThemedStyles } from "@/hooks/useThemedStyles";
import { AdminStackParamList } from "@/types/Navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, View, Text, TextInput, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAdminStyles } from "../AdminStyles";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import { useRef, useState } from "react";
import { client } from "@/backend/Server";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Vehicle, VehicleTransmission } from "@/types/openapi";
import FormInputText from "../components/FormInputText";
import FormInputSwitch from "../components/FormInputSwitch";
import FormInputPicker from "../components/FormInputPicker";

type AddVehicleNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'AddVehicle'>;

export default function AdminAddVehicleScreen() {
    const navigation = useNavigation<AddVehicleNavigationProp>();

    const [image, setImage] = useState<{ uri: string } | null>(null);

    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [variant, setVariant] = useState("");
    const [color, setColor] = useState("");
    const [type, setType] = useState("Car");
    const [year, setYear] = useState<number>(1970);
    const [license, setLicense] = useState("");
    const [serial, setSerial] = useState("");
    const [horsePower, setHorsePower] = useState("");
    const [topSpeed, setTopSpeed] = useState("");
    const [mileage, setMileage] = useState("");
    const [trailerHitch, setTrailerHitch] = useState(false);
    const [fuelType, setFuelType] = useState("Petrol");
    const [tyres, setTyres] = useState("Summer");
    const [transmissionType, setTransmissionType] = useState("Manual");
    const [transmissionDrive, setTransmissionDrive] = useState("FWD");





    const [saveButtonPressedAt, setSaveButtonPressedAt] = useState<number | null>(null);
    const [saveButtonText, setSaveButtonText] = useState("Add");

    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);

    const saveHandler = () => {
        setSaveButtonPressedAt(Date.now());
        setSaveButtonText("Are you sure?");

        setTimeout(() => {
            setSaveButtonPressedAt(null);
            setSaveButtonText("Add");
        }, 2000);

        if (saveButtonPressedAt && (Date.now() - saveButtonPressedAt) < 2000) {
            // Save vehicle
            console.log("Vehicle saved");
            setSaveButtonPressedAt(null);
            client.then(c => {
                const Transmission: VehicleTransmission = {
                    type: transmissionType,
                    drive: transmissionDrive
                };
                const partialVehicle: Vehicle = {
                    make,
                    model,
                    variant,
                    color,
                    type,
                    year: year,
                    registration: {
                        license,
                        serial
                    },
                    spec: {
                        horse_power: parseFloat(horsePower),
                        top_speed: parseFloat(topSpeed),
                        mileage: parseFloat(mileage),
                        trailer_hitch: trailerHitch,
                        fuel_type: fuelType,
                        tyres,
                        transmission: Transmission
                    }
                };
                c.createVehicle(null, partialVehicle).then(() => {
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
                        Vehicle details
                    </Text>
                    <FormInputText label="Make:" value={make} onChange={setMake} />
                    <FormInputText label="Model:" value={model} onChange={setModel} />
                    <FormInputText label="Variant:" value={variant} onChange={setVariant} />
                    <FormInputText label="Color:" value={color} onChange={setColor} />
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Type:</Text>
                        <Picker style={styles.formInput} selectedValue={type} onValueChange={setType}>
                            <Picker.Item label="Car" value="Car" />
                            <Picker.Item label="Van" value="Van" />
                        </Picker>
                    </View>
                    <FormInputText label="Year:" value={year.toString()} onChange={setYear} onBlur={() => setYear(parseInt(year.toString()) || 1970)} />
                    
                    <Text style={[styles.semiTitle, styles.bottomBorder]}>
                        Registration
                    </Text>

                    <FormInputText label="License:" value={license} onChange={text => setLicense(text.toUpperCase())} />
                    <FormInputText label="Serial:" value={serial} onChange={setSerial} />
                    
                    <Text style={[styles.semiTitle, styles.bottomBorder]}>
                        Specifications
                    </Text>

                    <FormInputText label="Horse Power:" value={horsePower} onChange={setHorsePower} onBlur={() => setHorsePower(parseFloat(horsePower).toString())} />
                    <FormInputText label="Mileage:" value={mileage} onChange={setMileage} onBlur={() => setMileage(parseFloat(mileage).toString())} />
                    <FormInputText label="Top Speed:" value={topSpeed} onChange={setTopSpeed} onBlur={() => setTopSpeed(parseFloat(topSpeed).toString())} />
                    <FormInputSwitch label="Trailer Hitch:" value={trailerHitch} onChange={setTrailerHitch} />
                    <FormInputPicker label="Fuel Type:" value={fuelType} onChange={setFuelType} data={[
                        { label: 'Petrol', value: 'Petrol' },
                        { label: 'Diesel', value: 'Diesel' },
                        { label: 'Electric', value: 'Electric' },
                        { label: 'Hybrid', value: 'Hybrid' },
                    ]} />
                    <FormInputPicker label="Tyres:" value={tyres} onChange={setTyres} data={[
                        { label: 'Summer', value: 'Summer' },
                        { label: 'Winter', value: 'Winter' },
                    ]} />

                    <Text style={[styles.semiTitle, styles.bottomBorder]}>
                        Transmission
                    </Text>
                    
                    <FormInputPicker label="Type:" value={transmissionType} onChange={setTransmissionType} data={[
                        { label: 'Manual', value: 'Manual' },
                        { label: 'Automatic', value: 'Automatic' },
                    ]} />
                    <FormInputPicker label="Drive:" value={transmissionDrive} onChange={setTransmissionDrive} data={[
                        { label: 'FWD (Front Wheel Drive)', value: 'FWD' },
                        { label: 'RWD (Rear Wheel Drive)', value: 'RWD' },
                        { label: 'AWD (All Wheel Drive)', value: 'AWD' },
                    ]} />
                    <View style={[styles.formGroup, { margin: 10, justifyContent: 'space-around' }]}>
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