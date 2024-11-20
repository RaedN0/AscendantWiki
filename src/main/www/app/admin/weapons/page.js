"use client";

import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, MenuItem, Select, TextField,} from '@mui/material';
import {Add, Delete, Edit} from '@mui/icons-material';

import WeaponService from "@/app/services/WeaponService";

const WeaponsPage = () => {
    const [weapons, setWeapons] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        baseDamage: 0,
        fireRate: 0,
        reloadSpeed: 0,
        category: 'BATTLE_RIFLE',
        rarity: 'GREY',
        ammo: 'LIGHT',
        cost: 0
    });
    const [isEdit, setIsEdit] = useState(false);

    const fetchWeapons = async () => {
        try {
            const data = await WeaponService.getWeapons();
            setWeapons(data);
        } catch (err) {
            setError('Failed to fetch weapons');
        }
    };

    useEffect(() => {
        fetchWeapons();
    }, []);

    const handleOpen = (weapon = {
        id: '',
        name: '',
        baseDamage: 0,
        fireRate: 0,
        reloadSpeed: 0,
        category: 'BATTLE_RIFLE',
        rarity: 'GREY',
        ammo: 'LIGHT',
        cost: 0
    }) => {
        setIsEdit(!!weapon.id);
        setFormData(weapon);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = () => {
        if (isEdit) {
            WeaponService.updateWeapon(formData).then(r => {
                fetchWeapons();
            })
        } else {
            WeaponService.addWeapon(formData).then(r => {
                fetchWeapons();
            });
        }
        handleClose()
    }

    const handleDelete = (id) => {
        WeaponService.deleteWeapon(id).then(r => {
            fetchWeapons();
        });
    };

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'baseDamage', headerName: 'Base Damage', flex: 1},
        {field: 'fireRate', headerName: 'Fire Rate', flex: 1},
        {field: 'reloadSpeed', headerName: 'Reload Speed', flex: 1},
        {field: 'category', headerName: 'Category', flex: 1},
        {field: 'rarity', headerName: 'Rarity', flex: 1},
        {field: 'ammo', headerName: 'Ammo', flex: 1},
        {field: 'cost', headerName: 'Cost', flex: 1},
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleOpen(params.row)} color="primary">
                        <Edit/>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)} color="error">
                        <Delete/>
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box sx={{height: 600, width: '100%', mt: 4}}>
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => handleOpen()}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
            >
                <Add/>
            </Fab>

            <DataGrid rows={weapons} columns={columns} pageSize={10} checkboxSelection={false}/>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEdit ? 'Edit Weapon' : 'Add Weapon'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="baseDamage"
                        label="Base Damage"
                        value={formData.baseDamage}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="fireRate"
                        label="Fire Rate"
                        value={formData.fireRate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="reloadSpeed"
                        label="Reload Speed"
                        value={formData.reloadSpeed}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Select
                        margin="dense"
                        name="type"
                        value={formData.category}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="BATTLE_RIFLE">Battle Rifle</MenuItem>
                        <MenuItem value="PLASMA_RIFLE">Plasma Rifle</MenuItem>
                        <MenuItem value="BEAM_GLOVES">Beam Gloves</MenuItem>
                        <MenuItem value="SHOTGUN">Shotgun</MenuItem>
                        <MenuItem value="BOMBER">Bomber</MenuItem>
                        <MenuItem value="SNIPER_RIFLE">Sniper Rifle</MenuItem>
                    </Select>
                    <Select
                        margin="dense"
                        name="type"
                        value={formData.rarity}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="GREY">Grey</MenuItem>
                        <MenuItem value="BLUE">Blue</MenuItem>
                        <MenuItem value="PURPLE">Purple</MenuItem>
                        <MenuItem value="GOLDEN">Golden</MenuItem>
                    </Select>
                    <Select
                        margin="dense"
                        name="type"
                        value={formData.ammo}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="LIGHT">Light</MenuItem>
                        <MenuItem value="HEAVY">Heavy</MenuItem>
                        <MenuItem value="ENERGY">Energy</MenuItem>
                    </Select>
                    <TextField
                        margin="dense"
                        name="cost"
                        label="Cost"
                        value={formData.cost}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default WeaponsPage;
