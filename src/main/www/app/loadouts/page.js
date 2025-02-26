'use client';

import { useEffect, useState, useContext } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CardMedia,
    useTheme,
    useMediaQuery,
    Grid,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LoadoutService from '@/app/services/LoadoutService';
import AbilityService from '@/app/services/AbilityService';
import PerkService from '@/app/services/PerkService';
import { RoleContext } from '@/app/RoleContext';

export default function LoadoutsPage() {
    const theme = useTheme();
    const { isAuthenticated } = useContext(RoleContext);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [loadouts, setLoadouts] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [perks, setPerks] = useState({ combat: [], utility: [] });
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
        utility2: '',
    });

    const { username } = useContext(RoleContext);

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
                combat: data.filter((perk) => perk.type === 'COMBAT'),
                utility: data.filter((perk) => perk.type === 'UTILITY'),
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
            utility2: '',
        });
    };

    const handleSaveLoadout = async () => {
        if (
            !formData.name ||
            !formData.ability ||
            !formData.combat1 ||
            !formData.combat2 ||
            !formData.utility1 ||
            !formData.utility2
        ) {
            alert('Please fill in all fields');
            return;
        }

        const selectedAbility = abilities.find((a) => a.id === formData.ability);
        const combat1 = perks.combat.find((p) => p.id === formData.combat1);
        const combat2 = perks.combat.find((p) => p.id === formData.combat2);
        const utility1 = perks.utility.find((p) => p.id === formData.utility1);
        const utility2 = perks.utility.find((p) => p.id === formData.utility2);

        const loadout = {
            name: formData.name,
            username: username,
            ability: selectedAbility,
            combatPerk1: combat1,
            combatPerk2: combat2,
            utilityPerk1: utility1,
            utilityPerk2: utility2,
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
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDeleteLoadout = async (id) => {
        try {
            await LoadoutService.deleteLoadout(id);
            fetchLoadouts();
        } catch (error) {
            console.error('Error deleting loadout:', error);
        }
    };

    // Define a card item without the title inside
    const ItemCard = ({ item, size = { xs: 40, sm: 50 } }) => (
        <Box
            sx={{
                ...neonGreenBorder,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: { xs: '8px', sm: '10px' },
                height: '100%',
                width: '100%',
                minWidth: 0,
            }}
        >
            <CardMedia
                component="img"
                src={`data:image/png;base64,${item.image}`}
                alt={item.name}
                sx={{
                    width: size,
                    height: size,
                    margin: '4px 0',
                    objectFit: 'contain',
                }}
            />
            <Typography
                variant="body2"
                color="white"
                sx={{
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    mt: 1,
                }}
            >
                {item.name}
            </Typography>
        </Box>
    );

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'url(/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                padding: { xs: 1, sm: 2 },
                minHeight: '100vh',
                gap: { xs: 1, sm: 2 },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: { xs: 1, sm: 2 },
                    flexWrap: 'wrap',
                    gap: 1,
                }}
            >
                <Typography
                    variant={isMobile ? 'h5' : 'h4'}
                    sx={{ color: 'white', fontWeight: 'bold' }}
                >
                    Loadouts
                </Typography>
                {isAuthenticated && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                        sx={{
                            background: 'linear-gradient(to right, #00c853, #b2ff59)',
                            color: '#000',
                            fontWeight: 'bold',
                            '&:hover': {
                                background: 'linear-gradient(to right, #009624, #7ecb20)',
                            },
                        }}
                    >
                        {isMobile ? 'Create' : 'Create Loadout'}
                    </Button>
                )}
            </Box>

            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    width: '100%',
                }}
            >
                {loadouts.map((loadout) => (
                    <Grid item xs={12} md={12} lg={6} xl={4} key={loadout.id}>
                        <Card
                            sx={{
                                ...neonGreenBorder,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardContent
                                sx={{
                                    flex: '1 0 auto',
                                    p: { xs: 1.5, sm: 2 },
                                    "&:last-child": { pb: { xs: 1.5, sm: 2 } },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        variant={isMobile ? 'subtitle1' : 'h6'}
                                        color="white"
                                        sx={{
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {loadout.name} – {loadout.username}
                                    </Typography>

                                    {username && loadout.username === username && (
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeleteLoadout(loadout.id)}
                                            sx={{ ml: 1 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Box>

                                {isSmallScreen ? (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    textAlign: 'center',
                                                    color: theme.palette.custom.main,
                                                    fontWeight: 'bold',
                                                    mb: 1,
                                                }}
                                            >
                                                CARRIER ABILITY
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                                                    <ItemCard
                                                        item={loadout.ability}
                                                        size={{ xs: 50, sm: 65 }}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    textAlign: 'center',
                                                    color: theme.palette.custom.main,
                                                    fontWeight: 'bold',
                                                    mb: 1,
                                                }}
                                            >
                                                COMBAT PERKS
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <ItemCard item={loadout.combatPerk1} />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <ItemCard item={loadout.combatPerk2} />
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    textAlign: 'center',
                                                    color: theme.palette.custom.main,
                                                    fontWeight: 'bold',
                                                    mb: 1,
                                                }}
                                            >
                                                UTILITY PERKS
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <ItemCard item={loadout.utilityPerk1} />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <ItemCard item={loadout.utilityPerk2} />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Grid container spacing={2} sx={{ mb: 1 }}>
                                            <Grid item xs={2.4}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        textAlign: 'center',
                                                        color: theme.palette.custom.main,
                                                        fontWeight: 'bold',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    CARRIER ABILITY
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4.8}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        textAlign: 'center',
                                                        color: theme.palette.custom.main,
                                                        fontWeight: 'bold',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    COMBAT PERKS
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4.8}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        textAlign: 'center',
                                                        color: theme.palette.custom.main,
                                                        fontWeight: 'bold',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    UTILITY PERKS
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 2,
                                                width: '100%',
                                            }}
                                        >
                                            <Box sx={{ width: '20%', minWidth: 0 }}>
                                                <ItemCard
                                                    item={loadout.ability}
                                                    size={{ xs: 45, sm: 55, md: 60 }}
                                                />
                                            </Box>
                                            <Box sx={{ width: '20%', minWidth: 0 }}>
                                                <ItemCard item={loadout.combatPerk1} />
                                            </Box>
                                            <Box sx={{ width: '20%', minWidth: 0 }}>
                                                <ItemCard item={loadout.combatPerk2} />
                                            </Box>
                                            <Box sx={{ width: '20%', minWidth: 0 }}>
                                                <ItemCard item={loadout.utilityPerk1} />
                                            </Box>
                                            <Box sx={{ width: '20%', minWidth: 0 }}>
                                                <ItemCard item={loadout.utilityPerk2} />
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                fullScreen={isMobile}
                PaperProps={{
                    sx: {
                        background: 'rgba(0,0,0,0.9)',
                        border: '1px solid #00FF00',
                        boxShadow: '0 0 10px #00FF00',
                        m: isMobile ? 0 : 2,
                        height: isMobile ? '100%' : 'auto',
                        borderRadius: isMobile ? 0 : 1,
                    },
                }}
            >
                <DialogTitle sx={{ color: 'white', py: 2 }}>Create New Loadout</DialogTitle>
                <DialogContent dividers sx={{ borderColor: 'rgba(0,255,0,0.3)' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
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
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#00FF00',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#00FF00',
                                    },
                                },
                                '& .MuiInputLabel-root': { color: 'white' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#00FF00' },
                                '& .MuiOutlinedInput-input': { color: 'white' },
                            }}
                        />

                        <FormControl
                            fullWidth
                            sx={{
                                '& label': { color: 'white' },
                                '& label.Mui-focused': { color: '#00FF00' },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#00FF00',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#00FF00',
                                },
                                '& .MuiSelect-icon': { color: 'white' },
                            }}
                        >
                            <InputLabel>Ability</InputLabel>
                            <Select
                                name="ability"
                                value={formData.ability}
                                onChange={handleChange}
                                sx={{ color: 'white' }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            bgcolor: 'rgba(0,0,0,0.9)',
                                            border: '1px solid #00FF00',
                                            '& .MuiMenuItem-root': {
                                                color: 'white',
                                                '&:hover': {
                                                    bgcolor: 'rgba(0,255,0,0.1)',
                                                },
                                                '&.Mui-selected': {
                                                    bgcolor: 'rgba(0,255,0,0.2)',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(0,255,0,0.3)',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                {abilities.map((ability) => (
                                    <MenuItem key={ability.id} value={ability.id}>
                                        {ability.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Typography variant="subtitle1" color="white" sx={{ mt: 1 }}>
                            Combat Perks
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        '& label': { color: 'white' },
                                        '& label.Mui-focused': { color: '#00FF00' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#00FF00',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#00FF00',
                                        },
                                        '& .MuiSelect-icon': { color: 'white' },
                                    }}
                                >
                                    <InputLabel>First Combat Perk</InputLabel>
                                    <Select
                                        name="combat1"
                                        value={formData.combat1}
                                        onChange={handleChange}
                                        sx={{ color: 'white' }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    bgcolor: 'rgba(0,0,0,0.9)',
                                                    border: '1px solid #00FF00',
                                                    '& .MuiMenuItem-root': {
                                                        color: 'white',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(0,255,0,0.1)',
                                                        },
                                                        '&.Mui-selected': {
                                                            bgcolor: 'rgba(0,255,0,0.2)',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        {perks.combat.map((perk) => (
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        '& label': { color: 'white' },
                                        '& label.Mui-focused': { color: '#00FF00' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#00FF00',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#00FF00',
                                        },
                                        '& .MuiSelect-icon': { color: 'white' },
                                    }}
                                >
                                    <InputLabel>Second Combat Perk</InputLabel>
                                    <Select
                                        name="combat2"
                                        value={formData.combat2}
                                        onChange={handleChange}
                                        sx={{ color: 'white' }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    bgcolor: 'rgba(0,0,0,0.9)',
                                                    border: '1px solid #00FF00',
                                                    '& .MuiMenuItem-root': {
                                                        color: 'white',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(0,255,0,0.1)',
                                                        },
                                                        '&.Mui-selected': {
                                                            bgcolor: 'rgba(0,255,0,0.2)',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        {perks.combat.map((perk) => (
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
                            </Grid>
                        </Grid>

                        <Typography variant="subtitle1" color="white" sx={{ mt: 1 }}>
                            Utility Perks
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        '& label': { color: 'white' },
                                        '& label.Mui-focused': { color: '#00FF00' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#00FF00',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#00FF00',
                                        },
                                        '& .MuiSelect-icon': { color: 'white' },
                                    }}
                                >
                                    <InputLabel>First Utility Perk</InputLabel>
                                    <Select
                                        name="utility1"
                                        value={formData.utility1}
                                        onChange={handleChange}
                                        sx={{ color: 'white' }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    bgcolor: 'rgba(0,0,0,0.9)',
                                                    border: '1px solid #00FF00',
                                                    '& .MuiMenuItem-root': {
                                                        color: 'white',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(0,255,0,0.1)',
                                                        },
                                                        '&.Mui-selected': {
                                                            bgcolor: 'rgba(0,255,0,0.2)',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        {perks.utility.map((perk) => (
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        '& label': { color: 'white' },
                                        '& label.Mui-focused': { color: '#00FF00' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#00FF00',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#00FF00',
                                        },
                                        '& .MuiSelect-icon': { color: 'white' },
                                    }}
                                >
                                    <InputLabel>Second Utility Perk</InputLabel>
                                    <Select
                                        name="utility2"
                                        value={formData.utility2}
                                        onChange={handleChange}
                                        sx={{ color: 'white' }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    bgcolor: 'rgba(0,0,0,0.9)',
                                                    border: '1px solid #00FF00',
                                                    '& .MuiMenuItem-root': {
                                                        color: 'white',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(0,255,0,0.1)',
                                                        },
                                                        '&.Mui-selected': {
                                                            bgcolor: 'rgba(0,255,0,0.2)',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        {perks.utility.map((perk) => (
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
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{ p: isMobile ? 2 : 3, justifyContent: 'space-between' }}
                >
                    <Button
                        onClick={handleCloseDialog}
                        sx={{
                            color: 'white',
                            '&:hover': { color: '#00FF00' },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveLoadout}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(to right, #00c853, #b2ff59)',
                            color: '#000',
                            fontWeight: 'bold',
                            '&:hover': {
                                background: 'linear-gradient(to right, #009624, #7ecb20)',
                            },
                            px: 3,
                        }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Empty state message when no loadouts */}
            {loadouts.length === 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '200px',
                        mt: 4,
                        p: 2,
                        ...neonGreenBorder,
                        mx: 'auto',
                        maxWidth: '600px',
                    }}
                >
                    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                        No Loadouts Found
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
                        {isAuthenticated
                            ? 'Click the Create Loadout button to build your first loadout!'
                            : 'Log in to create your own custom loadouts.'}
                    </Typography>
                </Box>
            )}
        </Container>
    );
}
