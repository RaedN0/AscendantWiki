import {Box, CardMedia, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme} from '@mui/material';
import {gradientBackground} from "@/app/styles/gradient";

const ListSection = ({
                         items,
                         selectedItem,
                         setSelectedItem,
                         flexDirection = 'row',
                         imageStyle = {
                             width: 70,
                             height: 70,
                         },
                         textStyle = {marginLeft: '10%',}
                     }) => {

    const theme = useTheme();

    return (
        <Box
            sx={{
                flex: 1,
                border: `2px solid ${theme.palette.custom.main}`,
                boxShadow: `0 0 10px 1px ${theme.palette.custom.main}`,
                borderRadius: 2,
                backgroundColor: 'rgba(0,0,0,0.95)',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                overflow: 'auto',
            }}
        >
            <List
                sx={{
                    padding: 0,
                    width: '100%',
                }}
            >
                {items.map((item) => (
                    <ListItem
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        sx={{
                            ...gradientBackground,
                            marginBottom: '15px',
                            flexDirection: flexDirection,
                            background: selectedItem?.id === item?.id ? theme.palette.custom.main : gradientBackground.background,
                        }}
                    >
                        <ListItemIcon>
                            {item.image && (
                                <CardMedia
                                    component="img"
                                    image={`data:image/png;base64,${item.image}`}
                                    alt={item.name}
                                    sx={{
                                        ...imageStyle,
                                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                    }}
                                />
                            )}
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                alignSelf: flexDirection === 'column' ? 'flex-start' : 'center',
                            }}
                            primary={
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...textStyle,
                                        color: selectedItem?.id === item.id ? 'rgb(0, 0, 0)' : '#ffffff',
                                        fontWeight: 'bold',
                                        width: '100%',
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
