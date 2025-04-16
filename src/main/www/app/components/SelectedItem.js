import {Box, Card, CardContent, CardMedia, Typography, useTheme} from "@mui/material";

export default function SelectedItem({item}) {
    const theme = useTheme();

    return (
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
                    image={`data:image/png;base64,${item.image}`}
                    alt={item.name}
                    sx={{width: 200, height: 200}}
                />
                <CardContent>
                    <Typography variant="h5" sx={{fontWeight: 'bold', color: '#ffffff'}}>
                        {item.name}
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
                    {item.description}
                </Typography>
            </CardContent>
        </Card>
    )
}