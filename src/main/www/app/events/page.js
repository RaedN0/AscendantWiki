'use client';

import React, {useEffect, useState} from 'react';
import {Box, Container, useMediaQuery, useTheme} from '@mui/material';
import EventService from "@/app/services/EventService";
import ListSection from "@/app/components/ListSection";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import SelectedItem from "@/app/components/SelectedItem";

const EventsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    function fetchEvents() {
        setLoading(true);
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
        EventService.addEvent(item).then(() => fetchEvents());
    };

    const handleEdit = (item) => {
        EventService.updateEvent(item).then(() => fetchEvents());
    };

    const handleDelete = (item) => {
        EventService.deleteEvent(item.id).then(() => fetchEvents());
    };

    if (loading) {
        return (
            <LoadingSpinner/>
        )
    }

    return (
        <Box
            sx={{
                height: '100%',
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                }}
            />
            <Box
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    padding: 2,
                    gap: 2,
                    height: '100%',
                    width: '100vw',
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
                <Box
                    sx={{
                        flex: isMobile ? '1 1 100%' : '2',
                        maxWidth: isMobile ? '100%' : '70%',
                        height: isMobile ? 'auto' : '100%',
                    }}
                >
                    {selectedEvent && (
                        <SelectedItem item={selectedEvent}/>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default EventsPage;
