import {Box, IconButton, Typography} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function SensitivityResult({name, result}) {

    const handleCopy = (value) => {
        navigator.clipboard.writeText(value);
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1}}>
            <Typography variant="body1">{name}</Typography>
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <Typography variant="body1"><strong>{result}</strong></Typography>
                <IconButton size="small" onClick={() => handleCopy(result)}>
                    <ContentCopyIcon fontSize="inherit"/>
                </IconButton>
            </Box>
        </Box>
    )
}