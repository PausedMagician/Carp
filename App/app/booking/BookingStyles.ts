import { StyleSheet } from 'react-native';
import {theme} from "@/constants/theme";

export const bookingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollView: {
        flex: 1,
    },
    vehicleCard: {
        backgroundColor: theme.colors.secondary,
        padding: theme.spacing.lg,
        margin: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadow.small,
    },
    vehicleInfo: {
        marginBottom: theme.spacing.md,
    },
    vehicleName: {
        fontSize: theme.fontSize.xl,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    vehicleDetails: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textTertiary,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    actionButton: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    actionButtonText: {
        color: theme.colors.background,
        fontSize: theme.fontSize.sm,
        fontWeight: '600',
    },

    dynamicCard: {
        backgroundColor: theme.colors.secondary,
        padding: theme.spacing.lg,
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        minHeight: 100,
    },
    cardTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    instructionsText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textTertiary,
        lineHeight: 20,
    },

    // Replaces instructions
    selectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    clearLink: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.sm,
        fontWeight: '600',
    },
    datesRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateBox: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    dateBoxLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textTertiary,
        marginBottom: theme.spacing.xs,
    },
    dateBoxValue: {
        fontSize: theme.fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text,
    },
    datesDivider: {
        paddingHorizontal: theme.spacing.sm,
    },
    dividerText: {
        fontSize: theme.fontSize.lg,
        color: theme.colors.textTertiary,
    },

    statusBanner: {
        backgroundColor: theme.colors.accent,
        padding: theme.spacing.sm,
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    statusText: {
        color: theme.colors.background,
        fontSize: theme.fontSize.sm,
        fontWeight: '600',
    },

    loadingContainer: {
        padding: theme.spacing.xxl,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: theme.spacing.md,
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
    },

    calendarWrapper: {
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden', // To clip the corners of the calendar
        backgroundColor: theme.colors.secondary,
    },
    calendarShadowWrapper: {
        marginHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadow.small,
    },

    bottomPadding: {
        height: 100,
    },

    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
    },
    continueButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
    },
    continueButtonDisabled: {
        backgroundColor: theme.colors.textSecondary,
        opacity: 0.5,
    },
    continueButtonText: {
        color: theme.colors.background,
        fontSize: theme.fontSize.md,
        fontWeight: 'bold',
    },
});