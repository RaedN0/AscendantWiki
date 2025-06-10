'use client';

import ListSection from "@/app/components/ListSection";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import StatSlider from "@/app/components/StatSlider";
import { default as WeaponService, default as weaponService } from '@/app/services/WeaponService';
import { gradientBackground } from "@/app/styles/gradient";
import { Box, Button, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const WeaponsPage = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

	const [weapons, setWeapons] = useState([]);
	const [filteredWeapons, setFilteredWeapons] = useState([]);
	const [selectedWeapon, setSelectedWeapon] = useState(null);
	const [weaponCategory, setWeaponCategory] = useState('Battle Rifle');
	const [isLoading, setIsLoading] = useState(true);

	const styles = {
		flexDirection: 'column',
		imageStyle: {
			width: '100%',
			objectFit: 'contain',
		},
		textStyle: {
			marginBottom: '-10%'
		}
	}

	function fetchWeapons() {
		setIsLoading(true);
		WeaponService.getWeapons()
			.then((data) => {
				const sortedWeapons = data.sort((a, b) => a.name.localeCompare(b.name));
				setWeapons(sortedWeapons);
				filterWeaponsByCategory('Battle Rifle', sortedWeapons);
			})
			.catch((err) => {
				console.error('Failed to fetch weapons:', err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	useEffect(() => {
		fetchWeapons();
	}, []);

	const filterWeaponsByCategory = (category, weaponsList = weapons) => {
		const filtered = weaponsList.filter(
			(weapon) => weapon.category === category.toUpperCase().replace(' ', '_')
		);
		setFilteredWeapons(filtered);
		setSelectedWeapon(filtered[0]);
	};

	const handleCategoryChange = (category) => {
		setWeaponCategory(category);
		filterWeaponsByCategory(category.toUpperCase().replace(' ', '_'));
	};

	const handleAdd = (item) => {
		weaponService.addWeapon(item).then(() => fetchWeapons());
	};

	const handleEdit = (item) => {
		weaponService.updateWeapon(item).then(() => fetchWeapons());
	};

	const handleDelete = (item) => {
		weaponService.deleteWeapon(item.id).then(() => fetchWeapons());
	};

	if (isLoading) {
		return (
			<LoadingSpinner />
		)
	}

	return (
		<Box
			sx={{
				height: '100%',
			}}
		>
			<Box
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundImage: 'url(/background.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					zIndex: -1,
				}}
			/>
			<Box
				maxWidth="lg"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					padding: 2,
					height: '100%',
					width: '100vw',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						overflow: 'auto',
						marginBottom: 2,
						padding: 1,
						border: `2px solid ${theme.palette.custom.main}`,
						boxShadow: `0 0 10px ${theme.palette.custom.main}`,
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						borderRadius: 2,
						width: '100%',
					}}
				>
					{['Battle Rifle', 'Beam Gloves', 'Plasma Rifle', 'Shotgun', 'Sniper Rifle'].map(
						(category) => (
							<Button
								key={category}
								onClick={() => handleCategoryChange(category)}
								sx={{
									...gradientBackground,
									color: weaponCategory === category ? '#000000' : '#ffffff',
									background:
										weaponCategory === category
											? theme.palette.custom.main
											: gradientBackground.background,
									width: '15%',
									minWidth: '100px'
								}}
							>
								{category}
							</Button>
						)
					)}
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexDirection: isMobile ? 'column' : 'row',
						gap: 2,
						height: '100%',
						width: '100%',
						overflow: 'auto',
					}}
				>
					<Box
						sx={{
							flex: isMobile ? '1 1 10%' : '1',
						}}
					>
						<ListSection
							items={filteredWeapons}
							selectedItem={selectedWeapon}
							setSelectedItem={setSelectedWeapon}
							flexDirection={'column'}
							dialogFields={[
								{ name: 'name', label: 'Name', type: 'text' },
								{ name: 'baseDamage', label: 'Base Damage', type: 'number' },
								{ name: 'fireRate', label: 'Fire Rate', type: 'number' },
								{ name: 'reloadSpeed', label: 'Reload Speed', type: 'number' },
								{
									name: 'category', label: 'Category', type: 'select', options: [
										{ value: 'BATTLE_RIFLE', label: 'Battle Rifle' },
										{ value: 'PLASMA_RIFLE', label: 'Plasma Rifle' },
										{ value: 'BEAM_GLOVES', label: 'Beam Gloves' },
										{ value: 'SHOTGUN', label: 'Shotgun' },
										{ value: 'BOMBER', label: 'Bomber' },
										{ value: 'SNIPER_RIFLE', label: 'Sniper Rifle' },
									]
								},
								{
									name: 'rarity', label: 'Rarity', type: 'select', options: [
										{ value: 'GREY', label: 'Grey' },
										{ value: 'BLUE', label: 'Blue' },
										{ value: 'PURPLE', label: 'Purple' },
										{ value: 'GOLDEN', label: 'Golden' },
									]
								},
								{
									name: 'ammo', label: 'Ammo', type: 'select', options: [
										{ value: 'LIGHT', label: 'Light' },
										{ value: 'HEAVY', label: 'Heavy' },
										{ value: 'ENERGY', label: 'Energy' },
									]
								},
								{ name: 'cost', label: 'Cost', type: 'number' },
								{ name: 'image', label: 'Upload Image', type: 'image' },
							]}
							onAdd={handleAdd}
							onEdit={handleEdit}
							onDelete={handleDelete}
							styles={styles}
						/>
					</Box>

					<Box sx={{
						display: 'flex',
						flex: isMobile ? '1 1 90%' : '2',
						overflow: isMobile ? '' : 'auto'
					}}>
						{selectedWeapon && (
							<Box>
								<CardMedia
									component="img"
									image={`data:image/png;base64,${selectedWeapon.image}`}
									alt={selectedWeapon.name}
									sx={{
										flex: 1,
										objectFit: 'contain',
										alignSelf: 'center',
									}}
								/>
								<Box
									sx={{
										flex: 1,
										border: `2px solid ${theme.palette.custom.main}`,
										boxShadow: `0 0 10px ${theme.palette.custom.main}`,
										borderRadius: 2,
										backgroundColor: 'rgba(0,0,0,0.9)',
										padding: 3,
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											borderBottom: `1px solid ${theme.palette.custom.main}`,
											paddingBottom: 1,
											marginBottom: 3,
										}}
									>
										<Typography
											variant="h6"
											sx={{
												color: theme.palette.custom.main,
												fontWeight: 'bold',
											}}
										>
											Weapon Stats
										</Typography>
										<Typography
											variant="h6"
											sx={{
												color: theme.palette.custom.main,
												fontWeight: 'bold',
												textAlign: 'right',
											}}
										>
											{selectedWeapon.cost} Power
										</Typography>
									</Box>

									<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
										<StatSlider
											label="Base Damage"
											value={selectedWeapon.baseDamage}
											max={100}
										/>
										<StatSlider
											label="Fire Rate (RPM)"
											value={selectedWeapon.fireRate}
											max={1000}
										/>
										<StatSlider
											label="Reload Speed (s)"
											value={selectedWeapon.reloadSpeed}
											max={5}
											invert
										/>
										<Typography variant="body1" sx={{ color: '#ffffff' }}>
											<strong style={{ color: theme.palette.custom.main }}>Rarity:</strong> {selectedWeapon.rarity}
										</Typography>
										<Typography variant="body1" sx={{ color: '#ffffff' }}>
											<strong style={{ color: theme.palette.custom.main }}>Ammo:</strong> {selectedWeapon.ammo}
										</Typography>
									</Box>
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default WeaponsPage;
