'use client';

import React from 'react';
import {Box, Button, Card, CardContent, Container, Grid2, Typography} from '@mui/material';

const Homepage = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/mainpage.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(4px) brightness(0.6)',
                    zIndex: -1,
                }}
            />

            <Container
                maxWidth="lg"
                sx={{
                    textAlign: 'center',
                    flex: 1,
                    overflow: 'auto',
                    alignContent: 'center',
                }}
            >
                <Box sx={{marginBottom: 6}}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 'bold',
                            color: '#aad1e6',
                            textTransform: 'uppercase',
                            textShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)',
                            fontSize: {
                                xs: '3rem',
                                sm: '4rem',
                                md: '5rem',
                            },
                        }}
                    >
                        Ascendant Wiki
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#e0e0e0',
                            marginTop: 2,
                            fontSize: {
                                xs: '1rem',
                                md: '1.5rem',
                            },
                            fontWeight: '300',
                        }}
                    >
                        Your go-to resource for stats, guides, and everything Ascendant.
                    </Typography>
                    <Button
                        variant="outlined"
                        href="https://store.steampowered.com/app/1803110/ASCENDANT/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            marginTop: '10px',
                            color: '#aad1e6',
                            borderColor: '#aad1e6',
                            fontSize: '1rem',
                            '&:hover': {
                                borderColor: '#ffffff',
                                color: '#ffffff',
                            },
                        }}
                    >
                        VIEW ON STEAM
                    </Button>
                </Box>

                <Grid2 container spacing={4} sx={{marginBottom: 6}}>
                    {[
                        {
                            title: 'Weapon Calculator',
                            link: '/weapon-calculator',
                            description: 'Optimize your loadout.',
                        },
                        {
                            title: 'Leaderboard',
                            link: '/leaderboard',
                            description: 'View top players globally.',
                        },
                        {
                            title: 'Weapons',
                            link: '/weapons',
                            description: 'Explore detailed stats and information about weapons.',
                        },
                        {
                            title: 'Perks',
                            link: '/perks',
                            description: 'Learn about the various perks and how to use them effectively.',
                        },
                        {
                            title: 'Abilities',
                            link: '/abilities',
                            description: 'Master abilities to gain the upper hand in combat.',
                        },
                        {
                            title: 'Events',
                            link: '/events',
                            description: 'Stay updated on in-game events.',
                        },
                    ].map((feature) => (
                        <Grid2 item xs={12} md={6} lg={4} key={feature.title}>
                            <Card
                                sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    border: '1px solid #00ff00',
                                    boxShadow: '0 4px 10px rgba(0, 255, 0, 0.5)',
                                    textAlign: 'center',
                                    height: '100%',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: '#00ff00',
                                            fontWeight: 'bold',
                                            marginBottom: 2,
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{color: '#ffffff', marginBottom: 4}}
                                    >
                                        {feature.description}
                                    </Typography>
                                    <Button
                                        href={feature.link}
                                        variant="outlined"
                                        sx={{
                                            color: '#00ff00',
                                            borderColor: '#00ff00',
                                            textTransform: 'uppercase',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                            },
                                        }}
                                    >
                                        Explore
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Container>
        </Box>
    );
};

export default Homepage;
