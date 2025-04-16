'use client';

import { Box, CircularProgress, useTheme } from '@mui/material';

export default function LoadingSpinner () {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                minHeight: '100vh',
            }}
        >
            <CircularProgress sx={{color: theme.palette.custom?.main}}/>
        </Box>
    );
};