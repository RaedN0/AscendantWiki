'use client';

import {useEffect, useState, useContext} from 'react';
import {
    Box, Button, Card, CardContent, Container, Typography, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem,
    FormControl, InputLabel, CardMedia, Grid2, useTheme, List, ListItem
} from '@mui/material';
import LoadoutService from '@/app/services/LoadoutService';
import AbilityService from '@/app/services/AbilityService';
import PerkService from '@/app/services/PerkService';
import {RoleContext} from '@/app/RoleContext';

export default function LoadoutsPage() {
    const theme = useTheme();
    const {isAuthenticated} = useContext(RoleContext);

    const [loadouts, setLoadouts] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [perks, setPerks] = useState({combat: [], utility: []});
    const [dialogOpen, setDialogOpen] = useState(false);

    const neonGreenBorder = {
        border: `2px solid ${theme.palette.custom.main}`,
        borderRadius: '6px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        boxShadow: `0 0 10px ${theme.palette.custom.main}`,
    };

    const [formData, setFormData] = useState({
        name: '',
        ability: '',
        combat1: '',
        combat2: '',
        utility1: '',
        utility2: ''
    });

    const {username} = useContext(RoleContext);

    useEffect(() => {
        fetchLoadouts();
        fetchAbilities();
        fetchPerks();
    }, []);

    const fetchLoadouts = async () => {
        try {
            const data = await LoadoutService.getLoadouts();
            setLoadouts(data);
        } catch (error) {
            console.error('Error fetching loadouts:', error);
        }
    };

    const fetchAbilities = async () => {
        try {
            const data = await AbilityService.getAbilities();
            setAbilities(data);
        } catch (error) {
            console.error('Error fetching abilities:', error);
        }
    };

    const fetchPerks = async () => {
        try {
            const data = await PerkService.getPerks();
            setPerks({
                combat: data.filter(perk => perk.type === 'COMBAT'),
                utility: data.filter(perk => perk.type === 'UTILITY')
            });
        } catch (error) {
            console.error('Error fetching perks:', error);
        }
    };

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setFormData({
            name: '',
            ability: '',
            combat1: '',
            combat2: '',
            utility1: '',
            utility2: ''
        });
    };

    const handleSaveLoadout = async () => {
        if (!formData.name || !formData.ability || !formData.combat1 || !formData.combat2 ||
            !formData.utility1 || !formData.utility2) {
            alert('Please fill in all fields');
            return;
        }

        const selectedAbility = abilities.find(a => a.id === formData.ability);
        const combat1 = perks.combat.find(p => p.id === formData.combat1);
        const combat2 = perks.combat.find(p => p.id === formData.combat2);
        const utility1 = perks.utility.find(p => p.id === formData.utility1);
        const utility2 = perks.utility.find(p => p.id === formData.utility2);

        const loadout = {
            name: formData.name,
            username: username,
            ability: selectedAbility,
            combatPerk1: combat1,
            combatPerk2: combat2,
            utilityPerk1: utility1,
            utilityPerk2: utility2
        };

        try {
            await LoadoutService.createLoadout(loadout);
            fetchLoadouts();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving loadout:', error);
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                gap: 2
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Typography variant="h4" sx={{color: 'white'}}>
                    Loadouts
                </Typography>
                {isAuthenticated && (
                    <Button
                        variant="contained"
                        onClick={handleOpenDialog}
                    >
                        Create Loadout
                    </Button>
                )}
            </Box>

            <List sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                width: '100%',
                justifyContent: 'center'
            }}>
                {loadouts.map(loadout => (
                    <ListItem
                        key={loadout.id}
                        sx={{
                            display: 'flex',
                        }}>
                        <Card sx={{
                            ...neonGreenBorder
                        }}>
                            <CardContent>
                                <Typography variant="h6" color="white">
                                    {loadout.name} – {loadout.username}
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    gap: 4,
                                    mt: 1,
                                    alignItems: 'center',
                                }}>
                                    <Box
                                        sx={{
                                            ...neonGreenBorder,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            minWidth: 150,
                                            padding: '10px'
                                        }}
                                    >
                                        <Typography variant="body2" sx={{textAlign: 'center', color: theme.palette.custom.main}}>
                                            CARRIER ABILITY
                                        </Typography>
                                        <CardMedia
                                            component="img"
                                            src={`data:image/png;base64,${loadout.ability.image}`}
                                            alt={loadout.ability.name}
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                margin: '8px 0',
                                            }}
                                        />
                                        <Typography variant="body2" color="white">
                                            {loadout.ability.name}
                                        </Typography>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        gap: 2,
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            gap: 2,
                                        }}>
                                            <Box
                                                sx={{
                                                    ...neonGreenBorder,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    minWidth: 150,
                                                    padding: '10px'
                                                }}
                                            >
                                                <Typography variant="body2" sx={{textAlign: 'center', color: theme.palette.custom.main}}>
                                                    COMBAT PERK
                                                </Typography>
                                                <CardMedia
                                                    component="img"
                                                    src={`data:image/png;base64,${loadout.combatPerk1.image}`}
                                                    alt={loadout.combatPerk1.name}
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                        margin: '8px 0',
                                                    }}
                                                />
                                                <Typography variant="body2" color="white">
                                                    {loadout.combatPerk1.name}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    ...neonGreenBorder,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    minWidth: 150,
                                                    padding: '10px'
                                                }}
                                            >
                                                <Typography variant="body2" sx={{textAlign: 'center', color: theme.palette.custom.main}}>
                                                    COMBAT PERK
                                                </Typography>
                                                <CardMedia
                                                    component="img"
                                                    src={`data:image/png;base64,${loadout.combatPerk2.image}`}
                                                    alt={loadout.combatPerk2.name}
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                        margin: '8px 0',
                                                    }}
                                                />
                                                <Typography variant="body2" color="white">
                                                    {loadout.combatPerk2.name}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            gap: 2,
                                        }}>
                                            <Box
                                                sx={{
                                                    ...neonGreenBorder,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    minWidth: 150,
                                                    padding: '10px'
                                                }}
                                            >
                                                <Typography variant="body2" sx={{textAlign: 'center', color: theme.palette.custom.main}}>
                                                    UTILITY PERK
                                                </Typography>
                                                <CardMedia
                                                    component="img"
                                                    src={`data:image/png;base64,${loadout.utilityPerk1.image}`}
                                                    alt={loadout.utilityPerk1.name}
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                        margin: '8px 0',
                                                    }}
                                                />
                                                <Typography variant="body2" color="white">
                                                    {loadout.utilityPerk1.name}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    ...neonGreenBorder,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    minWidth: 150,
                                                    padding: '10px'
                                                }}
                                            >
                                                <Typography variant="body2" sx={{textAlign: 'center', color: theme.palette.custom.main}}>
                                                    UTILITY PERK
                                                </Typography>
                                                <CardMedia
                                                    component="img"
                                                    src={`data:image/png;base64,${loadout.utilityPerk2.image}`}
                                                    alt={loadout.utilityPerk2.name}
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                        margin: '8px 0',
                                                    }}
                                                />
                                                <Typography variant="body2" color="white">
                                                    {loadout.utilityPerk2.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Delete Button (only shown if current user) */}
                                {username && loadout.username === username && (
                                    <Button
                                        onClick={() => LoadoutService.deleteLoadout(loadout.id).then(fetchLoadouts)}
                                        variant="contained"
                                        color="error"
                                        sx={{mt: 2}}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>

            {/* Dialog for Creating a New Loadout */}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'rgba(0,0,0,0.9)',
                        border: '1px solid #00FF00',
                        boxShadow: '0 0 10px #00FF00'
                    }
                }}
            >
                <DialogTitle sx={{color: 'white'}}>Create New Loadout</DialogTitle>
                <DialogContent>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
                        <TextField
                            name="name"
                            label="Loadout Name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#00FF00'
                                    },
                                },
                                '& .MuiInputLabel-root': {color: 'white'},
                                '& .MuiOutlinedInput-input': {color: 'white'}
                            }}
                        />

                        <FormControl fullWidth
                                     sx={{
                                         '& label': {color: 'white'},
                                         '& .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                                         '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#00FF00'},
                                         '& .MuiSelect-icon': {color: 'white'}
                                     }}
                        >
                            <InputLabel>Ability</InputLabel>
                            <Select
                                name="ability"
                                value={formData.ability}
                                onChange={handleChange}
                                sx={{color: 'white'}}
                            >
                                {abilities.map(ability => (
                                    <MenuItem key={ability.id} value={ability.id}>
                                        {ability.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth
                                     sx={{
                                         '& label': {color: 'white'},
                                         '& .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                                         '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#00FF00'},
                                         '& .MuiSelect-icon': {color: 'white'}
                                     }}
                        >
                            <InputLabel>First Combat Perk</InputLabel>
                            <Select
                                name="combat1"
                                value={formData.combat1}
                                onChange={handleChange}
                                sx={{color: 'white'}}
                            >
                                {perks.combat.map(perk => (
                                    <MenuItem
                                        key={perk.id}
                                        value={perk.id}
                                        disabled={formData.combat2 === perk.id}
                                    >
                                        {perk.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth
                                     sx={{
                                         '& label': {color: 'white'},
                                         '& .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                                         '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#00FF00'},
                                         '& .MuiSelect-icon': {color: 'white'}
                                     }}
                        >
                            <InputLabel>Second Combat Perk</InputLabel>
                            <Select
                                name="combat2"
                                value={formData.combat2}
                                onChange={handleChange}
                                sx={{color: 'white'}}
                            >
                                {perks.combat.map(perk => (
                                    <MenuItem
                                        key={perk.id}
                                        value={perk.id}
                                        disabled={formData.combat1 === perk.id}
                                    >
                                        {perk.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth
                                     sx={{
                                         '& label': {color: 'white'},
                                         '& .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                                         '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#00FF00'},
                                         '& .MuiSelect-icon': {color: 'white'}
                                     }}
                        >
                            <InputLabel>First Utility Perk</InputLabel>
                            <Select
                                name="utility1"
                                value={formData.utility1}
                                onChange={handleChange}
                                sx={{color: 'white'}}
                            >
                                {perks.utility.map(perk => (
                                    <MenuItem
                                        key={perk.id}
                                        value={perk.id}
                                        disabled={formData.utility2 === perk.id}
                                    >
                                        {perk.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth
                                     sx={{
                                         '& label': {color: 'white'},
                                         '& .MuiOutlinedInput-notchedOutline': {borderColor: 'white'},
                                         '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#00FF00'},
                                         '& .MuiSelect-icon': {color: 'white'}
                                     }}
                        >
                            <InputLabel>Second Utility Perk</InputLabel>
                            <Select
                                name="utility2"
                                value={formData.utility2}
                                onChange={handleChange}
                                sx={{color: 'white'}}
                            >
                                {perks.utility.map(perk => (
                                    <MenuItem
                                        key={perk.id}
                                        value={perk.id}
                                        disabled={formData.utility1 === perk.id}
                                    >
                                        {perk.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{p: 3}}>
                    <Button onClick={handleCloseDialog} sx={{color: 'white'}}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveLoadout}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(to right, #00c853, #b2ff59)',
                            color: '#000',
                            fontWeight: 'bold',
                        }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
