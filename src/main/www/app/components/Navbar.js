'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { text: 'Home', href: '/' },
        { text: 'Weapon Calculator', href: '/weapon-calculator' },
        { text: 'Weapons', href: '/weapons' },
        { text: 'Perks', href: '/perks' },
        { text: 'Abilities', href: '/abilities' },
        { text: 'Leaderboard', href: '/leaderboard' },
    ];

    const adminItem = { text: 'Admin', href: '/admin' };

    return (
        <AppBar
            position="sticky"
            sx={{
                height: '7vh',
                backgroundColor: '#1E1E1E',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        color: '#aad1e6',
                        cursor: 'pointer',
                    }}
                >
                    Ascendant Wiki
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} passHref>
                            <Button
                                color={pathname === item.href ? 'secondary' : 'inherit'}
                                sx={{
                                    color: pathname === item.href ? '#f50057' : '#e0e0e0',
                                    textTransform: 'none',
                                    fontWeight: pathname === item.href ? 'bold' : 'normal',
                                    '&:hover': {
                                        color: '#aad1e6',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                {item.text}
                            </Button>
                        </Link>
                    ))}
                </Box>

                <Box sx={{ alignItems: 'center' }}>
                    <Link href={adminItem.href} passHref>
                        <Button
                            color={pathname === adminItem.href ? 'secondary' : 'inherit'}
                            sx={{
                                color: pathname === adminItem.href ? '#f50057' : '#e0e0e0',
                                fontWeight: 'bold',
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
