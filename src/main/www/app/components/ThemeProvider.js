"use client";

import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/orbitron'; // Defaults to weight 400

const theme = createTheme({
    typography: {
        fontFamily: 'Orbitron, Arial, sans-serif', // Default font family
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#ffffff',
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'rgba(0,255,120,0.9)',
            textShadow: '0 0 5px rgba(0,255,120,0.9)',
        },
    },
    palette: {
        mode: 'dark',
        primary: {main: '#1976d2'},
        background: {default: '#121212', paper: '#1d1d1d'},
        custom: {
            main: 'rgba(0,255,120,0.9)'
        }
    },
});

export default function ThemeProviderWrapper({children}) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
}
