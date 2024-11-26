'use client';

import React from 'react';
import {AppBar, Box, Toolbar, useMediaQuery, useTheme} from '@mui/material';
import Link from 'next/link';
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
                <Link href="/" passHref>
                    <Box
                        component="img"
                        src="logo.jpg"
                        alt="Ascendant Wiki Logo"
                        sx={{
                            height: '40px',
                            cursor: 'pointer',
                        }}
                    />
                </Link>

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
