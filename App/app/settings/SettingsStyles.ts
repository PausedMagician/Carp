import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createSettingsStyles = (theme: Theme) =>
    StyleSheet.create({
        // Main container
        container: {
            flexGrow: 1,
            padding: theme.spacing.md,
            backgroundColor: theme.colors.background,
        },

        sectionTitle: {
            fontSize: theme.fontSize.xxl,
            fontWeight: "bold",
            marginVertical: theme.spacing.md,
            color: theme.colors.text,
        },

        // Account Card Styling
        accountCard: {
            flexDirection: "row",
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.lg,
            backgroundColor: theme.colors.secondary,
            marginBottom: theme.spacing.md,
            ...theme.shadow.small,
        },
        accountAvatar: {
            marginRight: theme.spacing.md,
            justifyContent: "center",
            alignItems: "center",
        },
        accountName: {
            fontSize: theme.fontSize.lg,
            fontWeight: "bold",
            color: theme.colors.text,
        },
        accountEmail: {
            fontSize: theme.fontSize.sm,
            color: theme.colors.textSecondary,
        },
        accountRole: {
            fontSize: theme.fontSize.sm,
            fontStyle: "italic",
            color: theme.colors.textTertiary,
        },
        editButton: {
            backgroundColor: theme.colors.primary,
            paddingVertical: theme.spacing.xs,
            paddingHorizontal: theme.spacing.sm,
            borderRadius: theme.borderRadius.md,
            alignSelf: "center",
        },
        editButtonText: {
            color: theme.colors.background,
            fontWeight: "600",
        },

        // Dark Mode Toggle Row
        darkModeRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: theme.spacing.md,
            borderBottomWidth: 1,
            borderColor: theme.colors.secondary,
        },
        rowText: {
            fontSize: theme.fontSize.md,
            color: theme.colors.text,
        },

        // Links and Other Sections
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: theme.spacing.lg,
        },
        rowLink: {
            paddingVertical: theme.spacing.sm,
            borderBottomWidth: 1,
            borderColor: theme.colors.secondary,
        },
        rowLinkText: {
            fontSize: theme.fontSize.md,
            color: theme.colors.primary,
        },
        rowLinkDangerText: {
            fontSize: theme.fontSize.md,
            color: "#ff3b30", // Red for danger actions
        },

        // Section Cards Styling
        sectionCard: {
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.lg,
            backgroundColor: theme.colors.secondary,
            marginBottom: theme.spacing.xs,
            marginTop: theme.spacing.lg,
            ...theme.shadow.small,
        },
        sectionCardTitle: {
            fontSize: theme.fontSize.lg,
            fontWeight: "600",
            marginBottom: theme.spacing.md,
            color: theme.colors.text,
        },

        // History Section Styling
        historyRow: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: theme.spacing.sm,
            paddingVertical: theme.spacing.xs,
            borderBottomWidth: 1,
            borderColor: theme.colors.background,
        },
        historyImageWrapper: {
            width: 60,
            height: 60,
            borderRadius: theme.borderRadius.md,
            overflow: "hidden",
            marginRight: theme.spacing.md,
            backgroundColor: theme.colors.background,
        },
        historyImage: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },
        historyDetails: {
            flex: 1,
        },
        historyCarName: {
            fontSize: theme.fontSize.md,
            fontWeight: "bold",
            color: theme.colors.text,
            marginBottom: theme.spacing.xs,
        },
        historyBookedAt: {
            fontSize: theme.fontSize.sm,
            color: theme.colors.textSecondary,
        },
    });