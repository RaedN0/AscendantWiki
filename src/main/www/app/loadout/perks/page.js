'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, Container, useMediaQuery, useTheme,} from '@mui/material';
import PerkService from "@/app/services/PerkService";
import ListSection from "@/app/components/ListSection";
import {gradientBackground} from "@/app/styles/gradient";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import SelectedItem from "@/app/components/SelectedItem";

const PerksPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [perks, setPerks] = useState([]);
    const [selectedPerk, setSelectedPerk] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('COMBAT');
    const [isLoading, setIsLoading] = useState(true);

    function fetchPerks() {
        setIsLoading(true);
        PerkService.getPerks()
            .then((data) => {
                const sortedPerks = data.sort((a, b) => a.name.localeCompare(b.name));
                setPerks(sortedPerks);
            })
            .catch((err) => {
                console.error('Failed to fetch perks:', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const filteredPerks = useMemo(() => {
        return perks.filter((perk) => perk.type === selectedCategory);
    }, [perks, selectedCategory]);

    useEffect(() => {
        fetchPerks();
    }, []);

    useEffect(() => {
        if (!selectedPerk || !filteredPerks.some(p => p.id === selectedPerk.id)) {
            setSelectedPerk(filteredPerks.length > 0 ? filteredPerks[0] : null);
        }
    }, [filteredPerks, selectedPerk]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleAdd = (item) => {
        PerkService.addPerk(item).then(() => fetchPerks());
    };

    const handleEdit = (item) => {
        PerkService.updatePerk(item).then(() => fetchPerks());
    };

    const handleDelete = (item) => {
        PerkService.deletePerk(item.id).then(() => fetchPerks());
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
                    flexDirection: 'column',
                    padding: 2,
                    height: '100%',
                    width: '100vw',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignSelf: 'flex-start',
                        gap: 2,
                    }}>
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
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        padding: 2,
                        gap: 2,
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            flex: isMobile ? '1 1 100%' : '1',
                            width: isMobile ? '100%' : '30%',
                            height: isMobile ? 'auto' : '100%',
                            overflow: 'auto',
                        }}
                    >
                        <ListSection
                            items={filteredPerks}
                            selectedItem={selectedPerk}
                            setSelectedItem={setSelectedPerk}
                            dialogFields={[
                                {name: 'name', label: 'Name', type: 'text'},
                                {name: 'description', label: 'Description', type: 'text', multiline: true, rows: 4},
                                {
                                    name: 'type', label: 'Category', type: 'select', options: [
                                        {value: 'COMBAT', label: 'Combat'},
                                        {value: 'UTILITY', label: 'Utility'},
                                    ]
                                },
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
                            width: isMobile ? '100%' : '60%',
                            height: isMobile ? 'auto' : '100%',
                        }}
                    >

                        {selectedPerk && (
                            <SelectedItem item={selectedPerk}/>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PerksPage;
