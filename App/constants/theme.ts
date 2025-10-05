// Color theme for the app

export const colors = {
    light: {
        background: '#FBFBFE',
        primary: '#2F27CE',
        secondary: '#DDDBFF',
        accent: '#443DFF',
        text: '#050316',
        textMuted: '#EAE9FC',
        textSecondary: '#ADA5F3',
        textTertiary: '#321FE0',
        textQuaternary: '#1E1287',
    },
    dark: {
        background: '#010104',
        primary: '#3A31D8',
        secondary: '#020024',
        accent: '#0600C2',
        text: '#EAE9FC',
        textMuted: '#040316',
        textSecondary: '#100C5A',
        textTertiary: '#281FE0',
        textQuaternary: '#7E78ED',
    },
};

const baseTheme = {
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        full: 9999,
    },
    fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32,
    },
    shadow: {
        small: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
        },
        medium: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 10,
        },
    },
};

export const getTheme = (darkMode: boolean) => ({
   ...baseTheme,
    colors: darkMode ? colors.dark : colors.light,
});

export type Theme = ReturnType<typeof getTheme>;