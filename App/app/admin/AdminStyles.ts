import { StyleSheet } from 'react-native';
import { Theme } from '@/constants/theme';

export const createAdminStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    gridContainer: {
        flex: 1, // Columns should be set dynamically
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: theme.spacing.sm,
    },
    header: {
        padding: theme.spacing.lg,
        paddingTop: theme.spacing.xl,
    },
    title: {
        fontSize: theme.fontSize.xxl,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    semiTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    subtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
    },
    content: {
        padding: theme.spacing.lg,
    },
    card: {
        width: 160,
        backgroundColor: theme.colors.secondary,
        // padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.lg,
        ...theme.shadow.small,
    },
    cardIconContainer: {
        width: '100%',
        aspectRatio: 1/1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardIcon: {
        color: theme.colors.textSecondary
    },
    cardImage: {
        width: '100%',
        aspectRatio: 1/1,
        borderTopLeftRadius: theme.borderRadius.lg,
        borderTopRightRadius: theme.borderRadius.lg
    },
    cardTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    cardInfo: {
        padding: theme.spacing.sm
    },
    cardText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textTertiary,
    },
    bottomBorder: {
        borderBottomColor: theme.colors.text,
        borderBottomWidth: 1,
        width: '95%',
        padding: theme.spacing.sm,
        marginHorizontal: theme.spacing.sm
    },
    // Buttons
    button: {
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: theme.colors.text,
        fontSize: theme.fontSize.md,
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: theme.colors.success,
    },
    cancelButton: {
        backgroundColor: theme.colors.error,
    },

    // Editing (text inputs and more)
    formImageContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing.md
    },
    formImage: {
        maxWidth: '80%',
        height: '100%',
        aspectRatio: 6/4,
        borderRadius: theme.borderRadius.lg
    },
    formInputs: {
        flex: 2,
    },
    formScroll: {
        flex: 1,
    },
    formContainer: {
        // maxHeight: '20%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    formGroup: {
        width: 350,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formLabel: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text,
    },
    formInput: {
        fontSize: theme.fontSize.md,
        width: 150,
        // borderRadius: theme.borderRadius.sm,
        textAlign: 'center',
        color: theme.colors.text,
        // backgroundColor: theme.colors.accent,
        padding: theme.spacing.xs,
        borderBottomColor: theme.colors.text,
        borderWidth: 0,
        borderBottomWidth: 1,
    },
    formInputChanged: {
        borderBottomColor: theme.colors.warning,
        borderBottomWidth: 1,
    }
});