import {Box, Divider, IconButton, ListSubheader, Menu, MenuItem, useTheme} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import React, {useState} from "react";

export default function MobileNavbar({navItems, loadoutItems}) {
    const theme = useTheme();

    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

    const handleMobileMenuClick = (event) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    };

    return (
        <Box>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#1a1a1a',
                        color: '#e0e0e0',
                        border: `1px solid ${theme.palette.custom.main}`,
                    },
                }}
            >
                {navItems.map((item) => (
                    <MenuItem
                        key={item.href}
                        onClick={handleMobileMenuClose}
                        component={Link}
                        href={item.href}
                        sx={{
                            '&:hover': {
                                background: theme.palette.custom.main,
                                color: '#000000',
                            },
                        }}
                    >
                        {item.text}
                    </MenuItem>
                ))}

                <Divider sx={{ borderColor: theme.palette.custom.main, marginY: 1 }} />

                <ListSubheader
                    sx={{
                        backgroundColor: '#1a1a1a',
                        color: '#aad1e6',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                    }}
                >
                    Loadout
                </ListSubheader>
                {loadoutItems.map((item) => (
                    <MenuItem
                        key={item.href}
                        onClick={handleMobileMenuClose}
                        component={Link}
                        href={item.href}
                        sx={{
                            '&:hover': {
                                background: theme.palette.custom.main,
                                color: '#000000',
                            },
                        }}
                    >
                        {item.text}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
