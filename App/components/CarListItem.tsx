import { Vehicle } from "@/types/openapi";
import { ListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import { theme } from "@/constants/theme";

export default function CarListItem(entry: ListRenderItemInfo<{car: Vehicle, isAvailable: boolean}>) {
    return (
        <View style={[styles.container, !entry.item.isAvailable && styles.carItemUnavailable]}>
            <View style={styles.carItemHeader}>
                <Text style={styles.text}> {entry.item.car.make} </Text>
                <Text style={entry.item.isAvailable ? styles.carItemPrice : styles.carItemUnavailableText}>
                     {entry.item.car.type}
                </Text>
            </View>

            <Text style={styles.carItemModel}> {entry.item.car.model} </Text>
            <Text style={styles.carItemYear}> {entry.item.car.year} </Text>

            <View style={styles.carItemAvailabilityContainer}>
                <Text style={[
                    styles.carItemAvailability,
                    entry.item.isAvailable ? styles.carItemAvailability : styles.carItemAvailability
                ]}>
                    {entry.item.isAvailable ? 'Available' : 'Unavailable'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    text: {
      color: theme.colors.text,
      fontSize: theme.fontSize.sm,
    },
    carItemUnavailable: {
      opacity: 0.7,
      backgroundColor: theme.colors.background,
    },
    carItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    carItemName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      flex: 1,
    },
    carItemPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.textSecondary,
    },
    carItemUnavailableText: {
      color: theme.colors.textSecondary,
    },
    carItemModel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    carItemYear: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    carItemAvailabilityContainer: {
      alignItems: 'flex-start',
    },
    carItemAvailability: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    carItemAvailable: {
      color: '#4caf50',
    },
    carItemUnavailableStatus: {
      color: '#f44336',
    },
});