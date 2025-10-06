import { useThemedStyles } from "@/hooks/useThemedStyles";
import { createAdminStyles } from "../AdminStyles";
import { Switch, Text, View } from "react-native";
import { useState } from "react";

interface FormInputSwitchProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function FormInputSwitch({ label, value, onChange }: FormInputSwitchProps) {
    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);

    const [originalValue] = useState(value);
    const [changed, setChanged] = useState(false);

    const onChangeWrapper = (newValue: boolean) => {
        setChanged(newValue !== originalValue);
        onChange(newValue);
    }

    return (
        <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{label}</Text>
            <Switch thumbColor={value ? theme.colors.success : theme.colors.error} trackColor={{ false: theme.colors.error, true: theme.colors.success }} value={value} onValueChange={onChangeWrapper} style={changed && [styles.formInputChanged, {marginBottom: -1}]} />
        </View>
    );
}