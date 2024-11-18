'use client';

import { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PerkService from "@/app/services/PerkService";

const PerksPage = () => {
    const [perks, setPerks] = useState([]);
    const [combatPerks, setCombatPerks] = useState([]);
    const [utilityPerks, setUtilityPerks] = useState([]);

    useEffect(() => {
        PerkService.getAllPerks()
            .then((data) => {
                setPerks(data);
                filterPerksByType(data);
            })
            .catch((err) => {
                console.error('Failed to fetch perks:', err);
            });
    }, []);

    const filterPerksByType = (perks) => {
        setCombatPerks(perks.filter((perk) => perk.type === 'COMBAT'));
        setUtilityPerks(perks.filter((perk) => perk.type === 'UTILITY'));
    };

    const renderPerkCards = (perks) => {
        return perks.map((perk) => (
            <Card
                key={perk.id}
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
                {perk.image && (
                    <CardMedia
                        component="img"
                        sx={{
                            width: 140,
                            objectFit: 'cover',
                            borderRight: '1px solid #444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        image={`data:image/png;base64,${perk.image}`}
                        alt={`${perk.name} image`}
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
                        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {perk.name}
                        </Typography>
                        <Typography variant="body2" color="#c0c0c0" gutterBottom>
                            {perk.description}
                        </Typography>
                        <Typography variant="body2" color="#c0c0c0">
                            Type: {perk.type}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        ));
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#aad1e6' }}>
                Perks
            </Typography>

            <Accordion defaultExpanded sx={{ backgroundColor: '#2a2a2a', color: '#e0e0e0', marginBottom: 2, borderRadius: '10px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#aad1e6' }} />}
                    sx={{ backgroundColor: '#333', borderBottom: '1px solid #444', padding: '10px 20px', borderRadius: '10px 10px 0 0' }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Combat Perks
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '0 0 10px 10px' }}>
                    {renderPerkCards(combatPerks)}
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded sx={{ backgroundColor: '#2a2a2a', color: '#e0e0e0', borderRadius: '10px' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#aad1e6' }} />}
                    sx={{ backgroundColor: '#333', borderBottom: '1px solid #444', padding: '10px 20px', borderRadius: '10px 10px 0 0' }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Utility Perks
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '0 0 10px 10px' }}>
                    {renderPerkCards(utilityPerks)}
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

export default PerksPage;
