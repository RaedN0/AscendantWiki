'use client';

import {useEffect, useState} from 'react';
import {Box, Card, CardContent, CardMedia, CircularProgress, Container, Typography, useMediaQuery, useTheme} from '@mui/material';
import AbilityService from "@/app/services/AbilityService";
import abilityService from "@/app/services/AbilityService";
import ListSection from "@/app/components/ListSection";

const AbilitiesPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

    const [abilities, setAbilities] = useState([]);
    const [selectedAbility, setSelectedAbility] = useState(null);
    const [loading, setLoading] = useState(true);

    function fetchAbilities() {
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
    }

    useEffect(() => {
        fetchAbilities();
    }, []);

    const handleAdd = (item) => {
        abilityService.addAbility(item).then(() => fetchAbilities());
    };

    const handleEdit = (item) => {
        abilityService.updateAbility(item).then(() => fetchAbilities());
    };

    const handleDelete = (item) => {
        abilityService.deleteAbility(item.id).then(() => fetchAbilities());
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'url(/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                height: '100%',
                alignItems: 'center',
            }}
        >
            {loading ? (
                <CircularProgress sx={{color: theme.palette.custom.main}}/>
            ) : (
                <Box
                    maxWidth="lg"
                    sx={{
                        width: '100%',
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
                            dialogFields={[
                                {name: 'name', label: 'Name', type: 'text'},
                                {name: 'description', label: 'Description', type: 'text', multiline: true, rows: 4},
                                {name: 'cooldown', label: 'Cooldown', type: 'number'},
                                {name: 'activationTime', label: 'Activation Time', type: 'number'},
                                {name: 'image', label: 'Upload Image', type: 'image'},
                            ]}
                            onAdd={handleAdd}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
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
                                        justifySelf: 'flex-start',
                                        alignItems: 'center',
                                        marginLeft: '10px',
                                        marginTop: '10px',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={`data:image/png;base64,${selectedAbility.image}`}
                                        alt={selectedAbility.name}
                                        sx={{width: 200, height: 200, margin: 'auto'}}
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
                                            justifySelf: 'flex-start',
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
