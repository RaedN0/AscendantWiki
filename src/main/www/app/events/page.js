'use client';

import {useEffect, useState} from 'react';
import {Box, Card, CardContent, CardMedia, CircularProgress, Container, Typography, useMediaQuery, useTheme,} from '@mui/material';
import EventService from "@/app/services/EventService";
import eventService from "@/app/services/EventService";
import ListSection from "@/app/components/ListSection";

const EventsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    function fetchEvents() {
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
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleAdd = (item) => {
        eventService.addEvent(item).then(() => fetchEvents());
    };

    const handleEdit = (item) => {
        eventService.updateEvent(item).then(() => fetchEvents());
    };

    const handleDelete = (item) => {
        eventService.deleteEvent(item.id).then(() => fetchEvents());
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
                height: '100%',
                overflow: 'auto'
            }}
        >
            {loading ? (
                <CircularProgress sx={{color: theme.palette.custom.main}}/>
            ) : (
                <>

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
                                items={events}
                                selectedItem={selectedEvent}
                                setSelectedItem={setSelectedEvent}
                                dialogFields={[
                                    {name: 'name', label: 'Name', type: 'text'},
                                    {name: 'description', label: 'Description', type: 'text', multiline: true, rows: 4},
                                    {name: 'image', label: 'Upload Image', type: 'image'},
                                ]}
                                onAdd={handleAdd}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </Box>

                        {selectedEvent && (
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
