'use client';

import { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import PerkService from "@/app/services/PerkService";

const PerksPage = () => {
    const [perks, setPerks] = useState([]);

    useEffect(() => {
        PerkService.getAllPerks()
            .then((data) => {
                setPerks(data);
            })
            .catch((err) => {
                console.error('Failed to fetch perks:', err);
            });
    }, []);

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#aad1e6' }}>
                Perk List
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {perks.map((perk) => (
                    <Card key={perk.id} sx={{ display: 'flex', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}>
                        {perk.image && (
                            <CardMedia
                                component="img"
                                sx={{ width: 140, objectFit: 'cover' }}
                                image={`data:image/png;base64,${perk.image}`}
                                alt={`${perk.name} image`}
                            />
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {perk.name}
                                </Typography>
                                <Typography variant="body2" color="#c0c0c0" gutterBottom>
                                    {perk.description}
                                </Typography>
                                <Typography variant="body2" color="#c0c0c0">
                                    Type: {perk.type}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default PerksPage;
