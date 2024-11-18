'use client';

import { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const PerksPage = () => {

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#aad1e6' }}>
                Perk List
            </Typography>
        </Container>
    );
};

export default PerksPage;
