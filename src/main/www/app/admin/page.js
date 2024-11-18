'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function AdminDashboard() {
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
                Admin Dashboard
            </Typography>
            <Typography variant="h5" component="p" gutterBottom sx={{ color: '#e0e0e0' }}>
                Manage all your data from a single place.
            </Typography>
            <Box sx={{ marginTop: '30px', display: 'flex', gap: 2 }}>
                <Link href="/admin/weapons" passHref>
                    <Button variant="contained" color="secondary">
                        Manage Weapons
                    </Button>
                </Link>
                <Link href="/admin/attachments" passHref>
                    <Button variant="contained" color="primary">
                        Manage Attachments
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}
