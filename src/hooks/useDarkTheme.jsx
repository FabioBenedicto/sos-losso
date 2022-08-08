import { useContext } from 'react';
import { DarkThemeContext } from '../contexts/DarkThemeContext';

export default function useDarkTheme() {
    const value = useContext(DarkThemeContext);
    return value;
}
