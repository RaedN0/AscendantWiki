'use client';

import {useEffect, useState} from 'react';
import {Box, CardMedia, Container, Typography, useMediaQuery, useTheme,} from '@mui/material';
import VehicleService from '@/app/services/VehicleService';
import vehicleService from '@/app/services/VehicleService';
import ListSection from "@/app/components/ListSection";
import {gradientBackground} from "@/app/styles/gradient";
import StatSlider from "@/app/components/StatSlider";

const VehiclesPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(true);

    function fetchVehicles() {
        VehicleService.getVehicles()
            .then((data) => {
                const sortedVehicles = data.sort((a, b) => a.name.localeCompare(b.name));
                setVehicles(sortedVehicles);
                setSelectedVehicle(sortedVehicles[0]);
            })
            .catch((err) => {
                console.error('Failed to fetch vehicles:', err);
            });
    }

    useEffect(() => {
        fetchVehicles();
    }, []);


    const handleAdd = (item) => {
        vehicleService.addVehicle(item).then(() => fetchVehicles());
    };

    const handleEdit = (item) => {
        vehicleService.updateVehicle(item).then(() => fetchVehicles());
    };

    const handleDelete = (item) => {
        vehicleService.deleteVehicle(item.id).then(() => fetchVehicles());
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
            }}
        >
            <Box
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                    overflow: 'auto',
                    marginBottom: 2,
                    padding: 1,
                    border: `2px solid ${theme.palette.custom.main}`,
                    boxShadow: `0 0 10px ${theme.palette.custom.main}`,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: 2,
                    width: '100%',
                }}
            >
                <Typography variant="h6" sx={{ color: theme.palette.custom.main }}>
                    Vehicles
                </Typography>
            </Box>

            <Box
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    height: '100%',
                    width: '100%',
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
                        items={vehicles}
                        selectedItem={selectedVehicle}
                        setSelectedItem={setSelectedVehicle}
                        flexDirection={'column'}
                        imageStyle={{
                            width: '100%',
                            objectFit: 'contain',
                        }}
                        textStyle={{
                            marginBottom: '-10%'
                        }}
                        dialogFields={[
                            {name: 'name', label: 'Name', type: 'text'},
                            {name: 'description', label: 'Description', type: 'text'},
                            {name: 'health', label: 'Health', type: 'number'},
                            {name: 'speed', label: 'Speed', type: 'number'},
                            {name: 'armor', label: 'Armor', type: 'number'},
                            {name: 'cost', label: 'Cost', type: 'number'},
                            {name: 'image', label: 'Upload Image', type: 'image'},
                        ]}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </Box>

                <Box sx={{
                    flex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {selectedVehicle && (
                        <CardMedia
                            component="img"
                            image={`image/png;base64,${selectedVehicle.image}`}
                            alt={selectedVehicle.name}
                            sx={{
                                flex: 1,
                                objectFit: 'contain',
                                alignSelf: 'center',
                            }}
                        />
                    )}

                    {selectedVehicle && (
                        <Box
                            sx={{
                                flex: 1,
                                border: `2px solid ${theme.palette.custom.main}`,
                                boxShadow: `0 0 10px ${theme.palette.custom.main}`,
                                borderRadius: 2,
                                backgroundColor: 'rgba(0,0,0,0.9)',
                                padding: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: `1px solid ${theme.palette.custom.main}`,
                                    paddingBottom: 1,
                                    marginBottom: 3,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: theme.palette.custom.main,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Vehicle Stats
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: theme.palette.custom.main,
                                        fontWeight: 'bold',
                                        textAlign: 'right',
                                    }}
                                >
                                    {selectedVehicle.cost} Power
                                </Typography>
                            </Box>

                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                                <StatSlider
                                    label="Health"
                                    value={selectedVehicle.health}
                                    max={2000}
                                />
                                <StatSlider
                                    label="Speed"
                                    value={selectedVehicle.speed}
                                    max={200}
                                />
                                <StatSlider
                                    label="Armor"
                                    value={selectedVehicle.armor}
                                    max={100}
                                />
                                <Typography variant="body1" sx={{color: '#ffffff'}}>
                                    <strong style={{color: theme.palette.custom.main}}>Description:</strong> {selectedVehicle.description}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default VehiclesPage;
