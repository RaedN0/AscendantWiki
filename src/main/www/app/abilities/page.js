'use client';

import {useEffect, useState} from 'react';
import {Container, Card, CardContent, CardMedia, Typography, Box, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AbilityService from "@/app/services/AbilityService";

const AbilitiesPage = () => {
    const [abilities, setAbilities] = useState([]);

    useEffect(() => {
        AbilityService.getAllAbilities()
            .then((data) => {
                setAbilities(data);
            })
            .catch((err) => {
                console.error('Failed to fetch abilities:', err);
            });
    }, []);

    const renderAbilityCards = (abilities) => {
        return abilities.map((ability) => (
            <Card
                key={ability.id}
                sx={{
                    display: 'flex',
                    backgroundColor: '#333',
                    color: '#e0e0e0',
                    marginBottom: 2,
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden',
                }}
            >
                {ability.image && (
                    <CardMedia
                        component="img"
                        sx={{
                            width: 160,
                            objectFit: 'cover',
                            borderRight: '1px solid #444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        image={`data:image/png;base64,${ability.image}`}
                        alt={`${ability.name} image`}
                    />
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                            {ability.name}
                        </Typography>
                        <Typography variant="body2" color="#c0c0c0" gutterBottom>
                            {ability.description}
                        </Typography>
                        <Typography variant="body2" color="#c0c0c0">
                            Cooldown: {ability.cooldown}s
                        </Typography>
                        <Typography variant="body2" color="#c0c0c0">
                            Activation Time: {ability.activationTime}s
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        ));
    };

    return (
        <Container maxWidth="lg" sx={{marginTop: '20px'}}>
            <Typography variant="h4" component="h1" gutterBottom sx={{textAlign: 'center', color: '#aad1e6'}}>
                Abilities
            </Typography>
            {renderAbilityCards(abilities)}
        </Container>
    );
};

export default AbilitiesPage;
