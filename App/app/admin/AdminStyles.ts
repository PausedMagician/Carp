import { StyleSheet } from 'react-native';
import { Theme } from '@/constants/theme';

export const createAdminStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
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
    subtitle: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textSecondary,
    },
    content: {
        padding: theme.spacing.lg,
    },
    card: {
        backgroundColor: theme.colors.secondary,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.lg,
        ...theme.shadow.small,
    },
    cardTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    cardText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.textTertiary,
    }
});