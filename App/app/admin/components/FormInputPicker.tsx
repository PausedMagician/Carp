import { useThemedStyles } from "@/hooks/useThemedStyles";
import { createAdminStyles } from "../AdminStyles";
import { Text, View } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";


interface FormInputPickerProps {
    label: string;
    value: string;
    data?: { label: string; value: string }[];
    onChange: (value: string) => void;
    onBlur?: () => void;
}

export default function FormInputPicker({ label, value, onChange, onBlur, data }: FormInputPickerProps) {
    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);

    const [originalValue] = useState(value);
    const [changed, setChanged] = useState(false);

    const onChangeWrapper = (newValue: string) => {
        setChanged(newValue !== originalValue);
        onChange(newValue);
    }

    return (
        <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{label}</Text>
            <Picker style={[styles.formInput, changed && styles.formInputChanged]} selectedValue={value} onValueChange={onChangeWrapper} onBlur={onBlur}>
                {data?.map((item, index) => (
                    <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
}