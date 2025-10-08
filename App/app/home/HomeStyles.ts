import { StyleSheet } from 'react-native';
import { Theme } from '@/constants/theme';

export const createHomeStyles = (theme: Theme, tabBarHeight?: number) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    tabBarSpacer: {
        height: tabBarHeight || 60,
    },
});