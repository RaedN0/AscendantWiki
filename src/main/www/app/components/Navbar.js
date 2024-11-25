'use client';

import React, {useState} from 'react';
import {AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography, useTheme} from '@mui/material';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const Navbar = () => {

    const theme = useTheme();

    const pathname = usePathname();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navItems = [
        {text: 'Home', href: '/'},
        {text: 'Weapon Calculator', href: '/weapon-calculator'},
        {text: 'Leaderboard', href: '/leaderboard'},
    ];

    const adminItem = {text: 'Admin', href: '/admin'};

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: '#000000',
                boxShadow: 'none',
                borderBottom: `2px solid ${theme.palette.custom.main}`,
                zIndex: 1000,
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    padding: '10px 20px',
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        color: '#aad1e6',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        cursor: 'default',
                        flex: '1 1 auto',
                    }}
                >
                    Ascendant Wiki
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 3,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        flex: '1 1 auto',
                    }}
                >
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} passHref>
                            <Button
                                sx={{
                                    color: pathname === item.href ? '#000000' : '#e0e0e0',
                                    backgroundColor:
                                        pathname === item.href ? theme.palette.custom.main : 'transparent',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    letterSpacing: '1.5px',
                                    padding: '8px 16px',
                                    border: pathname === item.href ? `1px solid ${theme.palette.custom.main}` : 'none',
                                    borderRadius: '4px',
                                    '&:hover': {
                                        backgroundColor: pathname === item.href
                                            ? theme.palette.custom.main
                                            : 'rgba(255, 255, 255, 0.1)',
                                        color: pathname === item.href ? '#000000' : '#aad1e6',
                                    },
                                }}
                            >
                                {item.text}
                            </Button>
                        </Link>
                    ))}

                    <Button
                        onClick={handleMenuClick}
                        sx={{
                            color: '#e0e0e0',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            letterSpacing: '1.5px',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: '#aad1e6',
                            },
                        }}
                    >
                        Loadout
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: '#1a1a1a',
                                color: '#e0e0e0',
                                border: `1px solid ${theme.palette.custom.main}`,
                            },
                        }}
                    >
                        <MenuItem
                            onClick={handleMenuClose}
                            component={Link}
                            href="/weapons"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.custom.main,
                                    color: '#000000',
                                },
                            }}
                        >
                            Weapons
                        </MenuItem>
                        <MenuItem
                            onClick={handleMenuClose}
                            component={Link}
                            href="/perks"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.custom.main,
                                    color: '#000000',
                                },
                            }}
                        >
                            Perks
                        </MenuItem>
                        <MenuItem
                            onClick={handleMenuClose}
                            component={Link}
                            href="/abilities"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.custom.main,
                                    color: '#000000',
                                },
                            }}
                        >
                            Abilities
                        </MenuItem>
                        <MenuItem
                            onClick={handleMenuClose}
                            component={Link}
                            href="/events"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.custom.main,
                                    color: '#000000',
                                },
                            }}
                        >
                            Events
                        </MenuItem>
                    </Menu>
                </Box>

                <Box
                    sx={{
                        alignItems: 'center',
                        flex: '1 1 auto',
                        textAlign: 'right',
                    }}
                >
                    <Link href={adminItem.href} passHref>
                        <Button
                            sx={{
                                color: pathname === adminItem.href ? '#000000' : '#e0e0e0',
                                backgroundColor:
                                    pathname === adminItem.href ? theme.palette.custom.main : 'transparent',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                '&:hover': {
                                    color: '#aad1e6',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            {adminItem.text}
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
