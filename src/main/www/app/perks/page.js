'use client';

import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import {keyframes} from '@emotion/react';
import PerkService from "@/app/services/PerkService";

const PerksPage = () => {
    const [perks, setPerks] = useState([]);
    const [filteredPerks, setFilteredPerks] = useState([]);
    const [selectedPerk, setSelectedPerk] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('COMBAT');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        PerkService.getAllPerks()
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

    const handleSelectPerk = (perk) => {
        setSelectedPerk(perk);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        filterPerks(category);
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
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'calc(100vh - 85px)',
                    }}
                >
                    <CircularProgress sx={{color: '#00ff00'}}/>
                </Box>
            ) : (
                <>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', gap: 2, alignItems: 'center', marginBottom: 2}}>
                        <Button
                            variant={selectedCategory === 'COMBAT' ? 'contained' : 'outlined'}
                            onClick={() => handleCategoryChange('COMBAT')}
                            sx={{
                                color: selectedCategory === 'COMBAT' ? '#000000' : '#ffffff',
                                border: '2px solid #00ff00',
                                boxShadow: '0 0 10px 1px #00ff00',
                                backgroundColor: selectedCategory === 'COMBAT' ? 'rgba(0,250,0,0.95)' : '#000000',
                                borderRadius: '5px',
                                transition: 'background-color 0.5s ease-in-out',
                                '&:hover': {
                                    animation: selectedCategory !== 'COMBAT' ? `${hoverToGreen} 0.5s forwards` : 'none',
                                    color: 'black',
                                },
                            }}
                        >
                            Combat Perks
                        </Button>
                        <Button
                            variant={selectedCategory === 'UTILITY' ? 'contained' : 'outlined'}
                            onClick={() => handleCategoryChange('UTILITY')}
                            sx={{
                                color: selectedCategory === 'UTILITY' ? '#000000' : '#ffffff',
                                border: '2px solid #00ff00',
                                boxShadow: '0 0 10px 1px #00ff00',
                                backgroundColor: selectedCategory === 'UTILITY' ? 'rgba(0,250,0,0.95)' : '#000000',
                                borderRadius: '5px',
                                transition: 'background-color 0.5s ease-in-out',
                                '&:hover': {
                                    animation: selectedCategory !== 'UTILITY' ? `${hoverToGreen} 0.5s forwards` : 'none',
                                    color: 'black',
                                },
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
                                height: '100%',
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
                                            backgroundColor: selectedPerk?.id === perk.id ? '#00ff00' : '#000000',
                                            border: '1px solid #00ff00',
                                            boxShadow: '0 0 10px 1px #00ff00',
                                            borderRadius: '5px',
                                            marginBottom: 1,
                                            transition: 'background-color 0.5s ease-in-out, color 0.5s ease-in-out',
                                            '&:hover': {
                                                animation: selectedPerk?.id !== perk.id ? `${hoverToGreen} 0.5s forwards` : 'none',
                                                '& .MuiTypography-root': {
                                                    color: 'black',
                                                },
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
                                                        color: selectedPerk?.id === perk.id ? 'rgb(0, 0, 0)' : '#ffffff',
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
                                    height: '100%',
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
