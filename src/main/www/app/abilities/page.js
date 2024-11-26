'use client';

import {useEffect, useState} from 'react';
import {Box, Card, CardContent, CardMedia, CircularProgress, Container, Typography, useTheme, useMediaQuery} from '@mui/material';
import AbilityService from "@/app/services/AbilityService";
import ListSection from "@/app/components/ListSection";

const AbilitiesPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

    const [abilities, setAbilities] = useState([]);
    const [selectedAbility, setSelectedAbility] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AbilityService.getAbilities()
            .then((data) => {
                const sortedAbilities = data.sort((a, b) => a.name.localeCompare(b.name));
                setAbilities(sortedAbilities);
                setSelectedAbility(sortedAbilities[0]);
            })
            .catch((err) => {
                console.error('Failed to fetch abilities:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Container
            maxWidth="lg"
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
            {loading ? (
                <CircularProgress sx={{color: theme.palette.custom.main}}/>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        alignItems: 'flex-start',
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
                            items={abilities}
                            selectedItem={selectedAbility}
                            setSelectedItem={setSelectedAbility}
                        />
                    </Box>

                    {selectedAbility && (
                        <Box
                            sx={{
                                flex: isMobile ? '1 1 100%' : '2',
                                maxWidth: isMobile ? '100%' : '70%',
                                height: isMobile ? 'auto' : '100%',
                            }}
                        >
                            <Card
                                sx={{
                                    background: 'rgba(0,0,0,0.8)',
                                    border: `2px solid ${theme.palette.custom.main}`,
                                    boxShadow: `0 0 10px 1px ${theme.palette.custom.main}`,
                                    textAlign: 'center',
                                    height: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '10px',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={`data:image/png;base64,${selectedAbility.image}`}
                                        alt={selectedAbility.name}
                                        sx={{width: 200, height: 200}}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" sx={{fontWeight: 'bold', color: '#ffffff'}}>
                                            {selectedAbility.name}
                                        </Typography>
                                    </CardContent>
                                </Box>
                                <CardContent>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#ffffff',
                                            margin: '5%',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {selectedAbility.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                </Box>
            )}
        </Container>
    );
};

export default AbilitiesPage;
