'use client';

import {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Typography, useTheme,} from '@mui/material';
import PerkService from "@/app/services/PerkService";
import ListSection from "@/app/components/ListSection";
import {gradientBackground} from "@/app/styles/gradient";

const PerksPage = () => {
    const theme = useTheme();

    const [perks, setPerks] = useState([]);
    const [filteredPerks, setFilteredPerks] = useState([]);
    const [selectedPerk, setSelectedPerk] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('COMBAT');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        PerkService.getPerks()
            .then((data) => {
                const sortedPerks = data.sort((a, b) => a.name.localeCompare(b.name));
                setPerks(sortedPerks);
                filterPerks('COMBAT', sortedPerks);
            })
            .catch((err) => {
                console.error('Failed to fetch perks:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filterPerks = (category, perksList = perks) => {
        const filtered = perksList.filter((perk) => perk.type === category);
        setFilteredPerks(filtered);
        setSelectedPerk(filtered[0]);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        filterPerks(category);
    };

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
            }}
        >
            {loading ? (
                <CircularProgress sx={{color: theme.palette.custom.main}}/>
            ) : (
                <>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: 2, alignItems: 'center', marginBottom: 2}}>
                        <Button
                            variant={selectedCategory === 'COMBAT' ? 'contained' : 'outlined'}
                            onClick={() => handleCategoryChange('COMBAT')}
                            sx={{
                                ...gradientBackground,
                                background: selectedCategory === 'COMBAT' ? theme.palette.custom.main : gradientBackground.background,
                                color: selectedCategory === 'COMBAT' ? '#000000' : '#ffffff',
                            }}
                        >
                            Combat Perks
                        </Button>
                        <Button
                            variant={selectedCategory === 'UTILITY' ? 'contained' : 'outlined'}
                            onClick={() => handleCategoryChange('UTILITY')}
                            sx={{
                                ...gradientBackground,
                                background: selectedCategory === 'UTILITY' ? theme.palette.custom.main : gradientBackground.background,
                                color: selectedCategory === 'UTILITY' ? '#000000' : '#ffffff',
                            }}
                        >
                            Utility Perks
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            height: 'calc(100vh - 150px)',
                        }}
                    >

                        <ListSection items={filteredPerks} selectedItem={selectedPerk} setSelectedItem={setSelectedPerk}/>

                        {selectedPerk && (
                            <Box
                                sx={{
                                    flex: 2,
                                    height: '100%',
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
                                            image={`data:image/png;base64,${selectedPerk.image}`}
                                            alt={selectedPerk.name}
                                            sx={{width: 200, height: 200, margin: 'auto'}}
                                        />
                                        <CardContent>
                                            <Typography variant="h5" sx={{fontWeight: 'bold', color: '#ffffff'}}>
                                                {selectedPerk.name}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                    <CardContent>
                                        <Typography variant="body1" sx={{
                                            color: '#ffffff',
                                            margin: '5%',
                                            justifySelf: 'flex-start',
                                            textAlign: 'left'
                                        }}>
                                            {selectedPerk.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Container>
    );
};

export default PerksPage;
