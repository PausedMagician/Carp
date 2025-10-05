import { useThemedStyles } from "@/hooks/useThemedStyles";
import { AdminStackParamList } from "@/types/Navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, View, Text, TextInput, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAdminStyles } from "../AdminStyles";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

type EditVehicleRouteProp = RouteProp<AdminStackParamList, 'EditVehicle'>
export default function AdminEditVehicleScreen() {
    const route = useRoute<EditVehicleRouteProp>();
    const { vehicle } = route.params;
    
    const [trailerHitch, setTrailerHitch] = useState(vehicle.spec?.trailer_hitch || false);

    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formImageContainer}>
                {/* Image Goes Here */}
                <Image style={styles.formImage} source={{uri: 'https://placehold.co/600x400'}} />
            </View>
            <View style={styles.formInputs}>
                <ScrollView showsVerticalScrollIndicator style={styles.formScroll} contentContainerStyle={styles.formContainer}>
                    {/* All inputs */}
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Make:</Text>
                        <TextInput style={styles.formInput} value={vehicle.make} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Model:</Text>
                        <TextInput style={styles.formInput} value={vehicle.model} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Variant:</Text>
                        <TextInput style={styles.formInput} value={vehicle.variant} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Color:</Text>
                        <TextInput style={styles.formInput} value={vehicle.color} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Type:</Text>
                        <Picker style={styles.formInput} selectedValue={vehicle.type}>
                            <Picker.Item label="Car" value="Car" />
                            <Picker.Item label="Van" value="Van" />
                        </Picker>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Year:</Text>
                        <TextInput style={styles.formInput} value={vehicle.year.toString()} />
                    </View>
                    <Text style={styles.semiTitle}>
                        Registration
                    </Text>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>License:</Text>
                        <TextInput style={styles.formInput} value={vehicle.registration?.license} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Serial:</Text>
                        <TextInput style={styles.formInput} value={vehicle.registration?.serial} />
                    </View>
                    <Text style={styles.semiTitle}>
                        Specifications
                    </Text>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Horse Power:</Text>
                        <TextInput style={styles.formInput} value={vehicle.spec?.horse_power.toString()} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Top Speed:</Text>
                        <TextInput style={styles.formInput} value={vehicle.spec?.top_speed.toString()} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Trailer Hitch:</Text>
                        <Switch value={trailerHitch} onValueChange={setTrailerHitch} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Fuel Type:</Text>
                        <Picker style={styles.formInput} selectedValue={vehicle.spec?.fuel_type}>
                            <Picker.Item label="Petrol" value="Petrol" />
                            <Picker.Item label="Diesel" value="Diesel" />
                            <Picker.Item label="Electric" value="Electric" />
                            <Picker.Item label="Hybrid" value="Hybrid" />
                        </Picker>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Tyres:</Text>
                        <Picker style={styles.formInput} selectedValue={vehicle.spec?.tyres}>
                            <Picker.Item label="Summer" value="Summer" />
                            <Picker.Item label="Winter" value="Winter" />
                        </Picker>
                    </View>
                    <Text style={styles.semiTitle}>
                        Transmission
                    </Text>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Type:</Text>
                        <Picker style={styles.formInput} selectedValue={vehicle.spec?.transmission.type}>
                            <Picker.Item label="Manual" value="Manual" />
                            <Picker.Item label="Automatic" value="Automatic" />
                        </Picker>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Drive:</Text>
                        <Picker style={styles.formInput} selectedValue={vehicle.spec?.transmission.drive}>
                            <Picker.Item label="FWD (Front Wheel Drive)" value="FWD" />
                            <Picker.Item label="RWD (Rear Wheel Drive)" value="RWD" />
                            <Picker.Item label="AWD (All Wheel Drive)" value="AWD" />
                        </Picker>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>
                                Delete
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}