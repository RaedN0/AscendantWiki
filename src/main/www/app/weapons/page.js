'use client';

import { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import WeaponService from "@/app/services/WeaponService";

const WeaponsPage = () => {
    const [weapons, setWeapons] = useState([]);

    useEffect(() => {
        // Fetch weapons from your service or API
        WeaponService.getWeapons().then((data) => {
            setWeapons(data);
        }).catch((err) => {
            console.error('Failed to fetch weapons:', err);
        });
    }, []);

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#aad1e6' }}>
                Weapon List
            </Typography>
            <Grid container spacing={4}>
                {weapons.map((weapon) => (
                    <Grid item xs={12} sm={6} md={4} key={weapon.id}>
                        <Card sx={{ backgroundColor: '#2a2a2a', color: '#e0e0e0' }}>
                            {/* Optional Image */}
                            {weapon.image && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={weapon.image}
                                    alt={`${weapon.name} image`}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {weapon.name}
                                </Typography>
                                <Typography variant="body2" color="#c0c0c0">
                                    Base Damage: {weapon.baseDamage}
                                </Typography>
                                <Typography variant="body2" color="#c0c0c0">
                                    Fire Rate: {weapon.fireRate} RPM
                                </Typography>
                                <Typography variant="body2" color="#c0c0c0">
                                    Reload Speed: {weapon.reloadSpeed}s
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default WeaponsPage;
