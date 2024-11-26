'use client';

import {useEffect, useState} from 'react';
import {Box, Button, CardMedia, Container, Typography, useMediaQuery, useTheme,} from '@mui/material';
import WeaponService from '@/app/services/WeaponService';
import {keyframes} from "@emotion/react";
import ListSection from "@/app/components/ListSection";
import {gradientBackground} from "@/app/styles/gradient";

const WeaponsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

    const [weapons, setWeapons] = useState([]);
    const [filteredWeapons, setFilteredWeapons] = useState([]);
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [weaponCategory, setWeaponCategory] = useState('Battle Rifle');

    useEffect(() => {
        WeaponService.getWeapons()
            .then((data) => {
                setWeapons(data);
                filterWeaponsByCategory('Battle Rifle', data);
            })
            .catch((err) => {
                console.error('Failed to fetch weapons:', err);
            });
    }, []);

    const filterWeaponsByCategory = (category, weaponsList = weapons) => {
        const filtered = weaponsList.filter(
            (weapon) => weapon.category === category.toUpperCase().replace(' ', '_')
        );
        setFilteredWeapons(filtered);
        setSelectedWeapon(filtered[0]);
    };

    const handleCategoryChange = (category) => {
        setWeaponCategory(category);
        filterWeaponsByCategory(category.toUpperCase().replace(' ', '_'));
    };

    const hoverToGreen = keyframes`
        0% {
            background-color: #000000;
        }
        100% {
            background-color: #00ff00;
        }
    `;

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'url(/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                height: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    gap: 2,
                    marginBottom: 2,
                    padding: 1,
                    border: `2px solid ${theme.palette.custom.main}`,
                    boxShadow: `0 0 10px ${theme.palette.custom.main}`,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: 2,
                }}
            >
                {['Battle Rifle', 'Beam Gloves', 'Plasma Rifle', 'Shotgun', 'Sniper Rifle'].map(
                    (category) => (
                        <Button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            sx={{
                                ...gradientBackground,
                                color: weaponCategory === category ? '#000000' : '#ffffff',
                                background:
                                    weaponCategory === category
                                        ? theme.palette.custom.main
                                        : gradientBackground.background,
                                padding: '5px 15px',
                            }}
                        >
                            {category}
                        </Button>
                    )
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    height: '100%',
                    overflow: 'auto'
                }}
            >
                <Box
                    sx={{
                        flex: isMobile ? '1 1 100%' : '1',
                        maxWidth: isMobile ? '100%' : '40%',
                        height: isMobile ? 'auto' : '100%',
                        overflow: 'auto',
                    }}
                >
                    <ListSection
                        items={filteredWeapons}
                        selectedItem={selectedWeapon}
                        setSelectedItem={setSelectedWeapon}
                        flexDirection={'column'}
                        imageStyle={{
                            width: '100%',
                            paddingX: '20%',
                        }}
                        textStyle={{
                            marginBottom: '-10%'
                        }}
                    />
                </Box>

                <Box sx={{
                    flex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {selectedWeapon && (
                        <CardMedia
                            component="img"
                            image={`data:image/png;base64,${selectedWeapon.image}`}
                            alt={selectedWeapon.name}
                            sx={{
                                flex: 1,
                                objectFit: 'contain',
                                alignSelf: 'center',
                            }}
                        />
                    )}

                    {selectedWeapon && (
                        <Box
                            sx={{
                                flex: 1,
                                border: `2px solid ${theme.palette.custom.main}`,
                                boxShadow: `0 0 10px ${theme.palette.custom.main}`,
                                borderRadius: 2,
                                backgroundColor: 'rgba(0,0,0,0.9)',
                                padding: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: `1px solid ${theme.palette.custom.main}`,
                                    paddingBottom: 1,
                                    marginBottom: 3,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: theme.palette.custom.main,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Weapon Stats
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: theme.palette.custom.main,
                                        fontWeight: 'bold',
                                        textAlign: 'right',
                                    }}
                                >
                                    {selectedWeapon.cost} Power
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1" sx={{color: '#ffffff'}}>
                                    <strong style={{color: theme.palette.custom.main}}>Base Damage:</strong> {selectedWeapon.baseDamage}
                                </Typography>
                                <Typography variant="body1" sx={{color: '#ffffff'}}>
                                    <strong style={{color: theme.palette.custom.main}}>Fire Rate:</strong> {selectedWeapon.fireRate} RPM
                                </Typography>
                                <Typography variant="body1" sx={{color: '#ffffff'}}>
                                    <strong style={{color: theme.palette.custom.main}}>Reload
                                        Speed:</strong> {selectedWeapon.reloadSpeed} seconds
                                </Typography>
                                <Typography variant="body1" sx={{color: '#ffffff'}}>
                                    <strong style={{color: theme.palette.custom.main}}>Rarity:</strong> {selectedWeapon.rarity}
                                </Typography>
                                <Typography variant="body1" sx={{color: '#ffffff'}}>
                                    <strong style={{color: theme.palette.custom.main}}>Ammo:</strong> {selectedWeapon.ammo}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default WeaponsPage;
