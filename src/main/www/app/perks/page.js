'use client';

import {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Typography, useMediaQuery, useTheme,} from '@mui/material';
import PerkService from "@/app/services/PerkService";
import perkService from "@/app/services/PerkService";
import ListSection from "@/app/components/ListSection";
import {gradientBackground} from "@/app/styles/gradient";

const PerksPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [perks, setPerks] = useState([]);
    const [filteredPerks, setFilteredPerks] = useState([]);
    const [selectedPerk, setSelectedPerk] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('COMBAT');
    const [loading, setLoading] = useState(true);

    function fetchPerks() {
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
    }

    useEffect(() => {
        fetchPerks();
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

    const handleAdd = (item) => {
        perkService.addPerk(item).then(() => fetchPerks());
    };

    const handleEdit = (item) => {
        perkService.updatePerk(item).then(() => fetchPerks());
    };

    const handleDelete = (item) => {
        perkService.deletePerk(item.id).then(() => fetchPerks());
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'url(/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                height: '100%',
                alignItems: 'center',
                overflow: 'auto'
            }}
        >
            {loading ? (
                <CircularProgress sx={{color: theme.palette.custom.main}}/>
            ) : (
                <Box
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        gap: 2,
                        alignItems: 'flex-start',
                        height: '100%',
                        width: '100%',
                        overflow: 'auto'
                    }}
                >
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        gap: 2,
                        alignItems: 'center',
                        marginBottom: 2,
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
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            alignItems: 'flex-start',
                            height: '90%',
                            overflow: 'auto',
                            width: '100%',
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

                        {selectedPerk && (
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
                </Box>
            )}
        </Container>
    );
};

export default PerksPage;
