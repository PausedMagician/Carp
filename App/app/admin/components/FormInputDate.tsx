import { useThemedStyles } from "@/hooks/useThemedStyles";
import { createAdminStyles } from "../AdminStyles";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useState } from "react";

interface FormInputDateProps {
    label: string;
    value: Date | number | string;
    onChange: (value: any | string | number | undefined) => void;
    onBlur?: () => void;
}

export default function FormInputDate({ label, value, onChange, onBlur }: FormInputDateProps) {
    const theme = useThemedStyles();
    const styles = createAdminStyles(theme);
    const [shown, setShown] = useState(false);
    
    if (typeof value !== 'object') {
        value = moment(value).toDate();
    }
    const [originalValue] = useState(value);
    const [changed, setChanged] = useState(false);
    
    const onChangeWrapper = (date: Date) => {
        setChanged(moment(date).startOf('day').diff(moment(originalValue).startOf('day')) !== 0);
        setShown(false);
        onChange(date);
    }

    const onChangeRNDWrapper = (event: DateTimePickerEvent, date?: Date) => {
        onChangeWrapper(date || value as Date);
    };

    const inputDateStyle = {
        ...styles.formInput,
        borderBottomWidth: 1,
        ...(changed ? styles.formInputChanged : {})
    }

    return (
        <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{label}</Text>
            {Platform.OS === 'web' ?
                <input type="date" style={inputDateStyle} value={moment(value).format('YYYY-MM-DD')} onChange={(e) => onChangeWrapper(new Date(e.target.value))} onBlur={onBlur} /> :
                <TouchableOpacity onPress={() => setShown(!shown)}>
                    <Text style={[styles.formInput, changed && styles.formInputChanged]}>{moment(value).format('DD-MM-YYYY')}</Text>
                </TouchableOpacity>
            }
            {shown && (
                <RNDateTimePicker display="spinner" style={styles.formInput} value={value} onChange={onChangeRNDWrapper} onBlur={onBlur} />
            )}
        </View>
    );
}