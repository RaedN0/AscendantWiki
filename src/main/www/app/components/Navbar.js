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

    const adminItem = { text: 'Admin', href: '/admin/weapons' };

    return (
        <AppBar position="sticky" sx={{ height: '5vh', backgroundColor: '#333' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Ascendant Wiki
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} passHref>
                            <Button
                                color={pathname === item.href ? 'secondary' : 'inherit'}
                                sx={{ textTransform: 'none'}}
                            >
                                {item.text}
                            </Button>
                        </Link>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <Link href={adminItem.href} passHref>
                        <Button
                            color={pathname === adminItem.href ? 'secondary' : 'inherit'}
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
