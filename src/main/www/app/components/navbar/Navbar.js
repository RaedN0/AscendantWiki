'use client';

import React, { useContext } from 'react';
import { AppBar, Box, Button, Toolbar, useMediaQuery, useTheme, Typography } from '@mui/material';
import Link from 'next/link';
import MobileNavbar from "@/app/components/navbar/mobile";
import DesktopNavbar from "@/app/components/navbar/desktop";
import { RoleContext } from "@/app/RoleContext";
import LoginButtons from "@/app/components/navbar/LoginButtons";

const Navbar = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const navItems = [
		{ text: 'Home', href: '/' },
		// {text: 'Weapon Calculator', href: '/weapon-calculator'},
		{ text: 'Underdogs Leaderboard', href: '/leaderboard' },
		{ text: 'Events', href: '/events' },
		{ text: 'Sensitivity Converter', href: '/sensitivity' },
	];

	const loadoutItems = [
		{ text: 'Weapons', href: '/loadout/weapons' },
		{ text: 'Perks', href: '/loadout/perks' },
		{ text: 'Abilities', href: '/loadout/abilities' },
	];

	const buildsItems = [
		{ text: 'Loadouts', href: '/loadouts' },
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
					justifyContent: isMobile ? 'flex-end' : 'center',
					alignItems: 'center',
					padding: '10px 20px',
				}}
			>
				{isMobile ? (
					<Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'flex-end', gap: 2 }}>
						<LoginButtons />
						<MobileNavbar navItems={navItems} loadoutItems={loadoutItems} buildsItems={buildsItems} />
					</Box>
				) : (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<DesktopNavbar navItems={navItems} loadoutItems={loadoutItems} buildsItems={buildsItems} />
						<LoginButtons />
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
