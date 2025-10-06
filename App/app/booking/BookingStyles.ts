import { StyleSheet } from 'react-native';
import { Theme } from '@/constants/theme';

export const createBookingStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollView: {
        flex: 1,
    },

    // Date selection
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
        overflow: 'hidden',
        backgroundColor: theme.colors.secondary,
    },
    calendarShadowWrapper: {
        marginHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadow.small,
    },
    calendarLegend: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendBar: {
        width: 20,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textTertiary,
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

    // Confirmation screen
    card: {
        backgroundColor: theme.colors.secondary,
        padding: theme.spacing.lg,
        marginHorizontal: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadow.small,
    },
    required: {
        color: '#FF3B30', // Should not be hardcoded :(
    },
    vehicleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleImage: {
        width: 80,
        height: 80,
        borderRadius: theme.borderRadius.md,
        marginRight: theme.spacing.md,
        backgroundColor: theme.colors.background,
    },
    vehicleLicense: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    dateLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textTertiary,
        marginBottom: theme.spacing.xs,
    },
    dateValue: {
        fontSize: theme.fontSize.md,
        fontWeight: '600',
        color: theme.colors.text,
    },
    durationBox: {
        backgroundColor: theme.colors.accent,
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
    },
    durationText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.background,
        fontWeight: '600',
    },
    userName: {
        fontSize: theme.fontSize.md,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    userEmail: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textTertiary,
        marginBottom: theme.spacing.xs,
    },
    userDepartment: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
    },
    input: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        minHeight: 50,
    },
    charCount: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textAlign: 'right',
        marginTop: theme.spacing.xs,
    },
    errorCard: {
        backgroundColor: '#FF3B30',
        padding: theme.spacing.md,
        marginHorizontal: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    errorText: {
        color: theme.colors.background,
        fontSize: theme.fontSize.sm,
        fontWeight: '600',
        textAlign: 'center',
    },
    validationHint: {
        marginTop: theme.spacing.sm,
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },

    // Success screen
    successHeader: {
        alignItems: 'center',
        paddingVertical: theme.spacing.xl,
        paddingHorizontal: theme.spacing.md,
    },
    successIconContainer: {
        marginBottom: theme.spacing.lg,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadow.medium,
    },
    successIconText: {
        fontSize: 48,
        color: theme.colors.background,
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: theme.fontSize.xxl,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    successSubtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    referenceContainer: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginVertical: theme.spacing.sm,
    },
    referenceNumber: {
        fontSize: theme.fontSize.xl,
        fontWeight: 'bold',
        color: theme.colors.primary,
        letterSpacing: 1,
    },
    referenceNote: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.background,
    },
    detailLabel: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    detailValue: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
        fontWeight: '600',
        flex: 1,
        textAlign: 'right',
        marginLeft: theme.spacing.md,
    },
    statusBadge: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    statusBadgeText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.background,
        fontWeight: '600',
    },
    nextStepsText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
        lineHeight: 24,
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    primaryButtonText: {
        color: theme.colors.background,
        fontSize: theme.fontSize.md,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: theme.colors.secondary,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    secondaryButtonText: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.md,
        fontWeight: '600',
    },
});