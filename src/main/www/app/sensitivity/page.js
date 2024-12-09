"use client"

import {useState} from 'react';
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme} from '@mui/material';

const gameYaws = {
    'CS2': 0.022,
    'Valorant': 0.07,
    'Overwatch': 0.0066,
    'Apex Legends': 0.022,
    'cm/360': null
};

const scopeSettings = [
    {
        scopeName: "1.5x Scope, Ironsight",
        multiplier: 1.5,
        fov: 67.362
    },
    {
        scopeName: "2x Scope",
        multiplier: 2,
        fov: 52.978
    },
    {
        scopeName: "3x Scope",
        multiplier: 3,
        fov: 36.8579
    },
    {
        scopeName: "4x Scope",
        multiplier: 4,
        fov: 28.0535
    },
    {
        scopeName: "5x Scope",
        multiplier: 5,
        fov: 22.6467
    }
];

const BASE_YAW = 0.07;

function sensToCmPer360(sens, dpi, yaw) {
    const counts = 360.0 / (sens * yaw);
    const inchesPer360 = counts / dpi;
    return inchesPer360 * 2.54;
}

function cmPer360ToSens(cmPer360, dpi, yaw) {
    const inchesPer360 = cmPer360 / 2.54;
    const counts = inchesPer360 * dpi;
    return 360.0 / (counts * yaw);
}

export default function YawConverter() {
    const theme = useTheme();

    const [selectedGame, setSelectedGame] = useState('CS2');
    const [gameSens, setGameSens] = useState(2.5);
    const [cmPer360, setCmPer360] = useState(30);
    const [dpi, setDpi] = useState(800);
    const [fov, setFov] = useState(90);
    const [result, setResult] = useState(null);

    const isCustom = selectedGame === 'cm/360';

    const handleCalculate = () => {
        let originalCmPer360;
        if (isCustom) {
            originalCmPer360 = parseFloat(cmPer360);
        } else {
            const sens = parseFloat(gameSens);
            const originalYaw = gameYaws[selectedGame];
            originalCmPer360 = sensToCmPer360(sens, dpi, originalYaw);
        }

        const newSens = findOverallSens(originalCmPer360, dpi);
        const hipfireSens = cmPer360ToSens(originalCmPer360, dpi, BASE_YAW * newSens)
        const adsSens = calculateScopedCm360(originalCmPer360, dpi, newSens, fov, scopeSettings[0]);
        const zoom2 = calculateScopedCm360(originalCmPer360, dpi, newSens, fov, scopeSettings[1]);
        const zoom3 = calculateScopedCm360(originalCmPer360, dpi, newSens, fov, scopeSettings[2]);
        const zoom4 = calculateScopedCm360(originalCmPer360, dpi, newSens, fov, scopeSettings[3]);
        const zoom5 = calculateScopedCm360(originalCmPer360, dpi, newSens, fov, scopeSettings[4]);

        setResult({
            originalCmPer360: originalCmPer360.toFixed(5),
            newSens: newSens.toFixed(2),
            hipfire: hipfireSens.toFixed(5),
            ads: adsSens.toFixed(5),
            zoom2: zoom2.toFixed(5),
            zoom3: zoom3.toFixed(5),
            zoom4: zoom4.toFixed(5),
            zoom5: zoom5.toFixed(5),
        });
    };

    function findOverallSens(cm360, dpi) {
        for (let i = 0.01; i < 2; i += 0.01) {
           const newSens = cmPer360ToSens(cm360, dpi, BASE_YAW * i)

            if(newSens < 4) {
                const scopeSens = calculateScopedCm360(cm360, dpi, i, fov, scopeSettings[4]);
                if (scopeSens < 4) {
                    return i;
                }
            }
        }
    }

    function calculateScopedCm360(cmPer360, dpi, overallSens, normalFov, scope) {
        const normalFovRadians = Math.PI * normalFov / 180.0;
        const scopedFovRadians = Math.PI * scope.fov / 180.0;

        const inches_per360 = cmPer360 / 2.54;
        const counts_per360 = inches_per360 * dpi;

        const scoped_counts = counts_per360 *
            (Math.tan(normalFovRadians / 2.0) / Math.tan(scopedFovRadians / 2.0));

        const inches_per360_scoped = scoped_counts / dpi;
        const cm360 = inches_per360_scoped * 2.54;

        const yaw = (BASE_YAW * (overallSens * 2 / 10)) / scope.multiplier;

        return cmPer360ToSens(cm360, dpi, yaw);
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 4,
                fontFamily: 'Arial, sans-serif',
                background: '#111',
                color: '#fff',
                border: `2px solid ${theme.palette.custom.main}`,
                borderRadius: 2,
                boxShadow: `0 0 10px ${theme.palette.custom.main}`,
                marginTop: '50px'
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', textShadow: `0 0 5px ${theme.palette.custom.main}` }}>
                Sensitivity Converter
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Select a known game and enter your current sensitivity and DPI (we'll figure out your cm/360),
                or choose "Custom cm/360" and directly enter your cm/360 and DPI.
                We'll give you the equivalent sensitivity at yaw = 0.07.
            </Typography>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel sx={{ color: '#ffffff' }}>Source</InputLabel>
                <Select
                    value={selectedGame}
                    label="Source"
                    onChange={(e) => setSelectedGame(e.target.value)}
                    sx={{
                        color: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.custom.main,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.custom.main,
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#ffffff',
                        },
                    }}
                >
                    {Object.keys(gameYaws).map((game) => (
                        <MenuItem key={game} value={game}>{game}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {isCustom ? (
                <TextField
                    label="cm/360"
                    type="number"
                    value={cmPer360}
                    onChange={(e) => setCmPer360(e.target.value)}
                    fullWidth
                    sx={{
                        marginBottom: 2,
                        '& .MuiOutlinedInput-root': {
                            color: '#ffffff',
                            '& fieldset': {
                                borderColor: theme.palette.custom.main,
                            },
                            '&:hover fieldset': {
                                borderColor: theme.palette.custom.main,
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#ffffff',
                        },
                    }}
                    InputProps={{ style: { color: '#ffffff' } }}
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                />
            ) : (
                <TextField
                    label="Game Sensitivity"
                    type="number"
                    value={gameSens}
                    onChange={(e) => setGameSens(e.target.value)}
                    fullWidth
                    sx={{
                        marginBottom: 2,
                        '& .MuiOutlinedInput-root': {
                            color: '#ffffff',
                            '& fieldset': {
                                borderColor: theme.palette.custom.main,
                            },
                            '&:hover fieldset': {
                                borderColor: theme.palette.custom.main,
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#ffffff',
                        },
                    }}
                    InputProps={{ style: { color: '#ffffff' } }}
                    InputLabelProps={{ style: { color: '#ffffff' } }}
                />
            )}

            <TextField
                label="DPI"
                type="number"
                value={dpi}
                onChange={(e) => setDpi(e.target.value)}
                fullWidth
                sx={{
                    marginBottom: 2,
                    '& .MuiOutlinedInput-root': {
                        color: '#ffffff',
                        '& fieldset': {
                            borderColor: '#00ff00',
                        },
                        '&:hover fieldset': {
                            borderColor: '#00ff00',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ffffff',
                    },
                }}
                InputProps={{ style: { color: '#ffffff' } }}
                InputLabelProps={{ style: { color: '#ffffff' } }}
            />

            <TextField
                label="FOV in Ascendant"
                type="number"
                value={fov}
                onChange={(e) => setFov(e.target.value)}
                fullWidth
                sx={{
                    marginBottom: 2,
                    '& .MuiOutlinedInput-root': {
                        color: '#ffffff',
                        '& fieldset': {
                            borderColor: '#00ff00',
                        },
                        '&:hover fieldset': {
                            borderColor: '#00ff00',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ffffff',
                    },
                }}
                InputProps={{ style: { color: '#ffffff' } }}
                InputLabelProps={{ style: { color: '#ffffff' } }}
            />

            <Button
                variant="contained"
                onClick={handleCalculate}
                sx={{
                    background: '#00ff00',
                    color: '#000000',
                    fontWeight: 'bold',
                    border: '2px solid #00ff00',
                    boxShadow: '0 0 10px #00ff00',
                    '&:hover': {
                        background: '#00cc00',
                    },
                }}
            >
                Convert
            </Button>

            {result && (
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6" sx={{ textShadow: '0 0 5px #00ff00' }}>Results</Typography>
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                        cm/360: {result.originalCmPer360}
                    </Typography>
                    <Typography variant="body1">
                        Overall Sensitivity: {result.newSens}
                    </Typography>
                    <Typography variant="body1">
                        Hipfire: {result.hipfire}
                    </Typography>
                    <Typography variant="body1">
                        1.5x: {result.ads}
                    </Typography>
                    <Typography variant="body1">
                        2x: {result.zoom2}
                    </Typography>
                    <Typography variant="body1">
                        3x: {result.zoom3}
                    </Typography>
                    <Typography variant="body1">
                        4x: {result.zoom4}
                    </Typography>
                    <Typography variant="body1">
                        5x: {result.zoom5}
                    </Typography>
                </Box>
            )}
        </Container>
    );
}
