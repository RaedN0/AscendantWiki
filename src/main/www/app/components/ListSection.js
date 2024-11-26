import { Box, CardMedia, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme, useMediaQuery } from '@mui/material';
import { gradientBackground } from "@/app/styles/gradient";

const ListSection = ({
                         items,
                         selectedItem,
                         setSelectedItem,
                         flexDirection = 'row',
                         imageStyle = {
                             width: 40,
                             height: 40,
                         },
                         textStyle = { marginLeft: '8px' }
                     }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

    return (
        <Box
            sx={{
                border: `2px solid ${theme.palette.custom.main}`,
                boxShadow: `0 0 10px 1px ${theme.palette.custom.main}`,
                borderRadius: 2,
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <List
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    overflow: 'auto',
                    gap: '20px'
                }}
            >
                {items.map((item) => (
                    <ListItem
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        sx={{
                            ...gradientBackground,
                            flexDirection: isMobile ? 'column' : flexDirection,
                            background: selectedItem?.id === item?.id ? theme.palette.custom.main : gradientBackground.background,
                            minWidth: isMobile ? '150px' : '20px',
                            borderRadius: '8px',
                            padding: 0,
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            '&:hover': {
                                background: theme.palette.custom.hover,
                                boxShadow: `0 0 10px ${theme.palette.custom.main}`,
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                justifyContent: 'center',
                            }}
                        >
                            {item.image && (
                                <CardMedia
                                    component="img"
                                    image={`data:image/png;base64,${item.image}`}
                                    alt={item.name}
                                    sx={{
                                        ...imageStyle,
                                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        </ListItemIcon>
                        <ListItemText
                            sx={{alignContent: 'center'}}
                            primary={
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...textStyle,
                                        color: selectedItem?.id === item.id ? 'rgb(0, 0, 0)' : '#ffffff',
                                        fontWeight: 'bold',
                                        textAlign: isMobile ? 'center': 'flex-start',
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        margin: 0
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ListSection;
