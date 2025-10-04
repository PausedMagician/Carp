
import { Vehicle } from "@/types/openapi";
import { ListRenderItemInfo, Text, View, StyleSheet } from "react-native";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { styles } from "@/constants/Stylings";


export default function CarListItem(entry: ListRenderItemInfo<{car: Vehicle, isAvailable: boolean}>) {
  const s = useThemedStyles(styles);
    return (
        <View style={[s.container, !entry.item.isAvailable && s.carItemUnavailable]}>
            <View style={s.carItemHeader}>
                <Text style={s.text}> {entry.item.car.make} </Text>
                <Text style={entry.item.isAvailable ? s.carItemPrice : s.carItemUnavailableText}>
                     {entry.item.car.type}
                </Text>
            </View>

            <Text style={s.carItemModel}> {entry.item.car.model} </Text>
            <Text style={s.carItemYear}> {entry.item.car.year} </Text>

            <View style={s.carItemAvailabilityContainer}>
                <Text style={[
                    s.carItemAvailability,
                    entry.item.isAvailable ? s.carItemAvailability : s.carItemAvailability
                ]}>
                    {entry.item.isAvailable ? 'Available' : 'Unavailable'}
                </Text>
            </View>
        </View>
    );
}
