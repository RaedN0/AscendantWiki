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
import {keyframes} from '@emotion/react';
import AbilityService from "@/app/services/AbilityService";

const AbilitiesPage = () => {
    const [abilities, setAbilities] = useState([]);
    const [selectedAbility, setSelectedAbility] = useState(null);

    useEffect(() => {
        AbilityService.getAllAbilities()
            .then((data) => {
                const sortedAbilities = data.sort((a, b) => a.name.localeCompare(b.name));
                setAbilities(sortedAbilities);
                setSelectedAbility(sortedAbilities[0]);
            })
            .catch((err) => {
                console.error('Failed to fetch abilities:', err);
            });
    }, []);

    const handleSelectAbility = (ability) => {
        setSelectedAbility(ability);
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
                        {abilities.map((ability) => (
                            <ListItem
                                key={ability.id}
                                onClick={() => handleSelectAbility(ability)}
                                sx={{
                                    backgroundColor: selectedAbility?.id === ability.id ? '#00ff00' : '#000000',
                                    border: '1px solid #00ff00',
                                    boxShadow: '0 0 10px 1px #00ff00',
                                    borderRadius: '5px',
                                    marginBottom: 1,
                                    transition: 'background-color 0.5s ease-in-out, color 0.5s ease-in-out',
                                    '&:hover': {
                                        animation: selectedAbility?.id !== ability.id ? `${hoverToGreen} 0.5s forwards` : 'none',
                                        '& .MuiTypography-root': {
                                            color: 'black',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {ability.image && (
                                        <CardMedia
                                            component="img"
                                            image={`data:image/png;base64,${ability.image}`}
                                            alt={ability.name}
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
                                                color: selectedAbility?.id === ability.id ? 'rgb(0, 0, 0)' : '#ffffff',
                                                fontWeight: 'bold',
                                                marginLeft: '10%',
                                            }}
                                        >
                                            {ability.name}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {selectedAbility && (
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
                                    image={`data:image/png;base64,${selectedAbility.image}`}
                                    alt={selectedAbility.name}
                                    sx={{width: 120, height: 120, margin: 'auto', paddingTop: 2}}
                                />
                                <CardContent>
                                    <Typography variant="h5" sx={{fontWeight: 'bold', color: '#ffffff'}}>
                                        {selectedAbility.name}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardContent>
                                <Typography variant="body1" sx={{color: '#ffffff', marginTop: 2, marginLeft: 4, justifySelf: 'flex-start'}}>
                                    {selectedAbility.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default AbilitiesPage;
