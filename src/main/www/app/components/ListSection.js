import {Box, List, ListItem, ListItemIcon, ListItemText, Typography, CardMedia} from '@mui/material';
import {keyframes} from "@emotion/react";

const hoverToGreen = keyframes`
    0% {
        background-color: #000000;
    }
    100% {
        background-color: #00ff00;
    }
`;

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
    return (
        <Box
            sx={{
                flex: 1,
                border: '2px solid #00ff00',
                boxShadow: '0 0 10px 1px #00ff00',
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
                            display: 'flex',
                            flexDirection: flexDirection,
                            backgroundColor: selectedItem?.id === item.id ? '#00ff00' : '#000000',
                            border: '1px solid #00ff00',
                            boxShadow: '0 0 10px 1px #00ff00',
                            borderRadius: '5px',
                            marginBottom: 1,
                            transition: 'background-color 0.5s ease-in-out, color 0.5s ease-in-out',
                            '&:hover': {
                                animation: selectedItem?.id !== item.id ? `${hoverToGreen} 0.5s forwards` : 'none',
                                '& .MuiTypography-root': {
                                    color: 'black',
                                },
                            },
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
