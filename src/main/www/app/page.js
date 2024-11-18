'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)',
                textAlign: 'center',
            }}
        >
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#aad1e6' }}>
                Welcome to the Ascendant Wiki
            </Typography>
            <Typography variant="h5" component="p" gutterBottom sx={{ color: '#e0e0e0' }}>
                Your go-to app for calculating weapon damage, stats, and more.
            </Typography>
            <Box sx={{ marginTop: '30px' }}>
                <Link href="/weapon-calculator" passHref>
                    <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                        Go to Weapon Calculator
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}
