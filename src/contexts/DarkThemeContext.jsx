import React, { useState, createContext, useEffect } from 'react';

export const DarkThemeContext = createContext({});

export function DarkThemeContextProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(() => {
        const isDarkModeSet = localStorage.getItem('darkMode');
        if (isDarkModeSet == 'true') {
            return true;
        } if (isDarkModeSet == 'false') {
            return false;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', darkTheme.toString());
    }, [darkTheme]);

    return (
        <DarkThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            {children}
        </DarkThemeContext.Provider>
    );
}
