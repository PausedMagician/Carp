import { StyleSheet } from 'react-native';
import { Theme } from '@/constants/theme';

export const createAppStyles = (theme: Theme) => StyleSheet.create({
    tabBar: {
        backgroundColor: theme.colors.background,
        borderTopColor: theme.colors.secondary,
        borderTopWidth: 0,
        height: 80,
        paddingBottom: 16,
        paddingTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 8,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    tabIcon: {
        width: 32,
        height: 32,
    },
    tabIconFocused: {
        transform: [{ scale: 1.1 }],
    },
    quickBookContainer: {
        position: 'relative',
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quickBookButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadow.medium,
    },
    quickBookPlus: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusHorizontal: {
        position: 'absolute',
        width: 20,
        height: 3,
        backgroundColor: theme.colors.background,
        borderRadius: 2,
    },
    plusVertical: {
        position: 'absolute',
        width: 3,
        height: 20,
        backgroundColor: theme.colors.background,
        borderRadius: 2,
    },
});