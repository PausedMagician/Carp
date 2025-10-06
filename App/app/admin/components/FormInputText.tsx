import { useThemedStyles } from "@/hooks/useThemedStyles";
import { createAdminStyles } from "../AdminStyles";
import { Text, TextInput, View } from "react-native";
import { useState } from "react";

interface FormInputTextProps {
    label: string;
    value: string | number | undefined;
    onChange: (value: any | string | number | undefined) => void;
    onBlur?: () => void;
}

export default function FormInputText({ label, value, onChange, onBlur }: FormInputTextProps) {
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
            <TextInput placeholder="..." style={[styles.formInput, changed && styles.formInputChanged]} value={value?.toString()} onChangeText={onChangeWrapper} onBlur={onBlur} />
        </View>
    );
}