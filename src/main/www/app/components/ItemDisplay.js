import {CardMedia, ListItem, ListItemIcon, ListItemText, Typography, useTheme} from "@mui/material";
import {gradientBackground} from "@/app/styles/gradient";
import React from "react";

export default function ItemDisplay ({handleContextMenu, isMobile, item, selectedItem, setSelectedItem, styles}) {

    const theme = useTheme();

    return (
        <ListItem
            key={item.id}
            onClick={() => setSelectedItem(item)}
            onContextMenu={(e) => handleContextMenu(e, item)}
            sx={{
                ...gradientBackground,
                flexDirection: isMobile ? 'column' : styles.flexDirection,
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
            <ListItemIcon sx={{justifyContent: 'center', paddingX: '10px', maxHeight: '7em'}}>
                {item.image && (
                    <CardMedia
                        component="img"
                        image={`data:image/png;base64,${item.image}`}
                        alt={item.name}
                        sx={{
                            ...styles.imageStyle,
                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                            borderRadius: '4px',
                            objectFit: 'contain',
                        }}
                    />
                )}
            </ListItemIcon>

            <ListItemText
                primary={
                    <Typography
                        variant="body1"
                        sx={{
                            ...styles.textStyle,
                            color: selectedItem?.id === item.id ? 'rgb(0, 0, 0)' : '#ffffff',
                            fontWeight: 'bold',
                            textAlign: isMobile ? 'center' : 'flex-start',
                        }}
                    >
                        {item.name}
                    </Typography>
                }
            />
        </ListItem>
    )
}