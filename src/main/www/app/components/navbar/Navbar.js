'use client';

import React from 'react';
import {AppBar, Toolbar, Typography, useMediaQuery, useTheme,} from '@mui/material';
import MobileNavbar from "@/app/components/navbar/mobile";
import DesktopNavbar from "@/app/components/navbar/desktop";

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navItems = [
        {text: 'Home', href: '/'},
        {text: 'Weapon Calculator', href: '/weapon-calculator'},
        {text: 'Leaderboard', href: '/leaderboard'},
        {text: 'Events', href: '/events'},
    ];

    const loadoutItems = [
        {text: 'Weapons', href: '/weapons'},
        {text: 'Perks', href: '/perks'},
        {text: 'Abilities', href: '/abilities'},
    ];

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
                    }}
                >
                    Ascendant Wiki
                </Typography>

                {isMobile ? (
                    <MobileNavbar navItems={navItems} loadoutItems={loadoutItems}/>
                ) : (
                    <DesktopNavbar navItems={navItems} loadoutItems={loadoutItems}/>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
