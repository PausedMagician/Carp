import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { getTheme } from '@/constants/theme';

export function useThemedStyles() {
    const { darkMode } = useContext(ThemeContext);
    return getTheme(darkMode);
}