import { StyleSheet } from 'react-native';
import { Theme } from '@/constants/theme';

export const createProfileStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
    }
});