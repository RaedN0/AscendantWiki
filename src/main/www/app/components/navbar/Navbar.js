'use client';

import React, {useContext} from 'react';
import {AppBar, Box, Button, Toolbar, useMediaQuery, useTheme, Typography} from '@mui/material';
import Link from 'next/link';
import MobileNavbar from "@/app/components/navbar/mobile";
import DesktopNavbar from "@/app/components/navbar/desktop";
import {RoleContext} from "@/app/RoleContext";
import authenticationService from "@/app/services/AuthenticationService";

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const {isAuthenticated, username} = useContext(RoleContext);

    const LoginButtons = () => {
        if (isAuthenticated) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        sx={{
                            color: theme.palette.custom.main,
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        {username}
                    </Typography>
                    <Button
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        onClick={() => authenticationService.logout()}
                        sx={{
                            borderColor: theme.palette.custom.main,
                            color: theme.palette.custom.main,
                            '&:hover': {
                                backgroundColor: 'rgba(0,255,120,0.1)',
                            }
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            );
        }
        return (
            <Link href="/login" passHref>
                <Button
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        borderColor: theme.palette.custom.main,
                        color: theme.palette.custom.main,
                        '&:hover': {
                            backgroundColor: 'rgba(0,255,120,0.1)',
                        }
                    }}
                >
                    Login
                </Button>
            </Link>
        );
    };

    const navItems = [
        {text: 'Home', href: '/'},
        // {text: 'Weapon Calculator', href: '/weapon-calculator'},
        {text: 'Underdogs Leaderboard', href: '/leaderboard'},
        {text: 'Events', href: '/events'},
        {text: 'Sensitivity Converter', href: '/sensitivity'},
    ];

    const loadoutItems = [
        {text: 'Weapons', href: '/weapons'},
        {text: 'Perks', href: '/perks'},
        {text: 'Abilities', href: '/abilities'},
        {text: 'Vehicles', href: '/vehicles'}, // ADDED VEHICLES HERE
    ];

    const buildsItems = [
        {text: 'Loadouts', href: '/loadouts'},
    ]

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
                {isMobile ? (
                    <Box sx={{display: 'flex', alignItems: 'center', justifyItems: 'center', gap: 2}}>
                        <LoginButtons/>
                        <MobileNavbar navItems={navItems} loadoutItems={loadoutItems} buildsItems={buildsItems}/>
                    </Box>
                ) : (
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <DesktopNavbar navItems={navItems} loadoutItems={loadoutItems} buildsItems={buildsItems}/>
                        <LoginButtons/>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
