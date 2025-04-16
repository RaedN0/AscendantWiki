'use client';

import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, CardMedia, CircularProgress, Container, Typography, useMediaQuery, useTheme} from '@mui/material';
import AbilityService from "@/app/services/AbilityService";
import abilityService from "@/app/services/AbilityService";
import ListSection from "@/app/components/ListSection";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import SelectedItem from "@/app/components/SelectedItem";

const AbilitiesPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [abilities, setAbilities] = useState([]);
    const [selectedAbility, setSelectedAbility] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function fetchAbilities() {
        setIsLoading(true);
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
                setIsLoading(false);
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

    if (isLoading) {
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

                <Box
                    sx={{
                        flex: isMobile ? '1 1 100%' : '2',
                        maxWidth: isMobile ? '100%' : '70%',
                        height: isMobile ? 'auto' : '100%',
                    }}
                >
                    {selectedAbility && (
                        <SelectedItem item={selectedAbility}/>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AbilitiesPage;
