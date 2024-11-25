'use client';

import {useEffect, useState} from 'react';
import {Box, Card, CardContent, CardMedia, CircularProgress, Container, Typography, useTheme,} from '@mui/material';
import EventService from "@/app/services/EventService";
import ListSection from "@/app/components/ListSection";

const EventsPage = () => {
    const theme = useTheme();

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        EventService.getEvents()
            .then((data) => {
                const sortedEvents = data.sort((a, b) => a.name.localeCompare(b.name));
                setEvents(sortedEvents);
                setSelectedEvent(sortedEvents[0])
            })
            .catch((err) => {
                console.error('Failed to fetch events:', err);
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
            }}
        >
            {loading ? (
                <CircularProgress sx={{color: theme.palette.custom.main}}/>
            ) : (
                <>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            height: 'calc(100vh - 150px)',
                        }}
                    >

                        <ListSection items={events} selectedItem={selectedEvent} setSelectedItem={setSelectedEvent}/>

                        {selectedEvent && (
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
                                            image={`data:image/png;base64,${selectedEvent.image}`}
                                            alt={selectedEvent.name}
                                            sx={{width: 200, height: 200, margin: 'auto'}}
                                        />
                                        <CardContent>
                                            <Typography variant="h5" sx={{fontWeight: 'bold', color: '#ffffff'}}>
                                                {selectedEvent.name}
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
                                            {selectedEvent.description}
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

export default EventsPage;
