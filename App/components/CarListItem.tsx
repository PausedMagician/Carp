import { Vehicle } from "@/types/openapi";
import { ListRenderItemInfo, Text, View, StyleSheet} from "react-native";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { Theme } from "@/constants/theme";

// This is old but could be used for list items in the future
export default function CarListItem(entry: ListRenderItemInfo<{car: Vehicle, isAvailable: boolean}>) {
    const theme = useThemedStyles();
    const styles = createCarListItemStyles(theme);

    const { car, isAvailable } = entry.item;

    return (
        <View style={[styles.container, !isAvailable && styles.carItemUnavailable]}>
            <View style={styles.carItemHeader}>
                <Text style={styles.text}>{car.make}</Text>
                <Text style={isAvailable ? styles.carItemPrice : styles.carItemUnavailableText}>
                    {car.type}
                </Text>
            </View>

            <Text style={styles.carItemModel}>{car.model}</Text>
            <Text style={styles.carItemYear}>{car.year}</Text>

            <View style={styles.carItemAvailabilityContainer}>
                <Text style={[
                    styles.carItemAvailability,
                    isAvailable
                        ? styles.carItemAvailabilityAvailable
                        : styles.carItemAvailabilityUnavailable
                ]}>
                    {isAvailable ? 'Available' : 'Unavailable'}
                </Text>
            </View>
        </View>
    );
}

// Some of the attributes should be considered standardized in the future
const createCarListItemStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.secondary,
            padding: theme.spacing.md,
            marginHorizontal: theme.spacing.md,
            marginVertical: theme.spacing.xs,
            borderRadius: theme.borderRadius.lg,
            ...theme.shadow.small,
        },
        carItemUnavailable: {
            backgroundColor: theme.colors.textMuted,
            opacity: 0.7,
        },
        carItemHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.xs,
        },
        text: {
            fontSize: theme.fontSize.lg,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        carItemPrice: {
            fontSize: theme.fontSize.md,
            color: theme.colors.primary,
            fontWeight: "600",
        },
        carItemUnavailableText: {
            fontSize: theme.fontSize.md,
            color: theme.colors.textSecondary,
            fontWeight: "600",
        },
        carItemModel: {
            fontSize: theme.fontSize.md,
            color: theme.colors.textTertiary,
            marginBottom: theme.spacing.xs,
        },
        carItemYear: {
            fontSize: theme.fontSize.sm,
            color: theme.colors.textSecondary,
            marginBottom: theme.spacing.sm,
        },
        carItemAvailabilityContainer: {
            marginTop: theme.spacing.sm,
            paddingTop: theme.spacing.sm,
            borderTopWidth: 1,
            borderTopColor: theme.colors.background,
        },
        carItemAvailability: {
            fontSize: theme.fontSize.sm,
            fontWeight: "600",
        },
        carItemAvailabilityAvailable: {
            color: "#4CAF50",
        },
        carItemAvailabilityUnavailable: {
            color: "#F44336",
        },
    });