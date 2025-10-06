import { useThemedStyles } from "@/hooks/useThemedStyles";
import { createAdminStyles } from "../AdminStyles";
import { Text, TextInput, View } from "react-native";

interface FormInputTextProps {
    label: string;
    value: string | number | undefined;
    onChange: (value: any | string | number | undefined) => void;
    onBlur?: () => void;
}

export default function FormInputText({ label, value, onChange, onBlur }: FormInputTextProps) {
    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);

    return (
        <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{label}</Text>
            <TextInput style={styles.formInput} value={value?.toString()} onChangeText={onChange} onBlur={onBlur} />
        </View>
    );
}