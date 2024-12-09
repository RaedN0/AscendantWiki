import {Box, Slider, Typography, useTheme} from "@mui/material";

export default function StatSlider({label, value, max, invert = false}) {
    const theme = useTheme()
    const displayValue = invert ? max - value : value;

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="body1" sx={{color: '#ffffff', marginBottom: '4px'}}>
                <strong style={{color: theme.palette.custom.main}}>{label}:</strong> {value}
            </Typography>
            <Slider
                value={displayValue}
                max={max}
                disabled
                sx={{
                    color: theme.palette.custom.main,
                    height: 8,
                    '& .MuiSlider-track': {
                        border: 'none'
                    },
                    '& .MuiSlider-thumb': {
                        display: 'none'
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.5,
                        backgroundColor: '#999'
                    }
                }}
            />
        </Box>
    );
};
