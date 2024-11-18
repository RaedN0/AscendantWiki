'use client';

import {useEffect, useState} from 'react';
import {
    Container,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Card,
    CardContent,
    CardMedia,
    Button,
} from '@mui/material';
import PerkService from "@/app/services/PerkService";

const PerksPage = () => {
    const [perks, setPerks] = useState([]);
    const [filteredPerks, setFilteredPerks] = useState([]);
    const [selectedPerk, setSelectedPerk] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('COMBAT');

    useEffect(() => {
        PerkService.getAllPerks()
            .then((data) => {
                setPerks(data);
                filterPerks('COMBAT', data);
            })
            .catch((err) => {
                console.error('Failed to fetch perks:', err);
            });
    }, []);

    const filterPerks = (category, perksList = perks) => {
        const filtered = perksList.filter((perk) => perk.type === category);
        setFilteredPerks(filtered);
        setSelectedPerk(filtered[0]);
    };

    const handleSelectPerk = (perk) => {
        setSelectedPerk(perk);
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
                backgroundImage: 'url(/background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2}}>
                <Typography variant="h5" sx={{color: '#ffffff', marginLeft: '1%'}}>
                    Perks
                </Typography>

                <Box sx={{display: 'flex', gap: 2, margin: 'auto'}}>
                    <Button
                        variant={selectedCategory === 'COMBAT' ? 'contained' : 'outlined'}
                        onClick={() => handleCategoryChange('COMBAT')}
                        sx={{
                            color: '#ffffff',
                            border: '2px solid #00ff00',
                            boxShadow: '0 0 10px 1px #00ff00',
                            backgroundColor: selectedCategory === 'COMBAT' ? 'rgba(0,0,0,0.95)' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#2d5a2d',
                            },
                        }}
                    >
                        Combat Perks
                    </Button>
                    <Button
                        variant={selectedCategory === 'UTILITY' ? 'contained' : 'outlined'}
                        onClick={() => handleCategoryChange('UTILITY')}
                        sx={{
                            color: '#ffffff',
                            border: '2px solid #00ff00',
                            boxShadow: '0 0 10px 1px #00ff00',
                            backgroundColor: selectedCategory === 'UTILITY' ? 'rgba(0,0,0,0.95)' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#2d5a2d',
                            },
                        }}
                    >
                        Utility Perks
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        border: '2px solid #00ff00',
                        boxShadow: '0 0 10px 1px #00ff00',
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.95)',
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxHeight: 'calc(100vh - 150px)',
                        overflow: 'auto',
                    }}
                >
                    <List
                        sx={{
                            padding: 0,
                            width: '100%',
                        }}
                    >
                        {filteredPerks.map((perk) => (
                            <ListItem
                                key={perk.id}
                                onClick={() => handleSelectPerk(perk)}
                                sx={{
                                    backgroundColor: selectedPerk?.id === perk.id ? '#2d5a2d' : 'transparent',
                                    border: '1px solid #00ff00',
                                    boxShadow: '0 0 10px 1px #00ff00',
                                    borderRadius: '5px',
                                    marginBottom: 1,
                                    '&:hover': {
                                        backgroundColor: '#2d5a2d',
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {perk.image && (
                                        <CardMedia
                                            component="img"
                                            image={`data:image/png;base64,${perk.image}`}
                                            alt={perk.name}
                                            sx={{
                                                width: 70,
                                                height: 70,
                                                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                            }}
                                        />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#ffffff',
                                                fontWeight: 'bold',
                                                marginLeft: '10%',
                                            }}
                                        >
                                            {perk.name}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {selectedPerk && (
                    <Box
                        sx={{
                            flex: 2,
                        }}
                    >
                        <Card
                            sx={{
                                backgroundColor: 'rgba(0,0,0,0.95)',
                                border: '2px solid #00ff00',
                                boxShadow: '0 0 10px 1px #00ff00',
                                textAlign: 'center',
                                height: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifySelf: 'baseline',
                                    alignItems: 'center',
                                    marginLeft: '5%',
                                    marginTop: '5%',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={`data:image/png;base64,${selectedPerk.image}`}
                                    alt={selectedPerk.name}
                                    sx={{width: 120, height: 120, margin: 'auto', paddingTop: 2}}
                                />
                                <CardContent>
                                    <Typography variant="h5" sx={{fontWeight: 'bold', color: '#ffffff'}}>
                                        {selectedPerk.name}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardContent>
                                <Typography variant="body1" sx={{color: '#ffffff', marginTop: 2, marginLeft: 4, justifySelf: 'flex-start'}}>
                                    {selectedPerk.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default PerksPage;
