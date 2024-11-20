"use client";

import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
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
