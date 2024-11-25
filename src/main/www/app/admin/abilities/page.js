'use client';

import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {
    Box,
    Button,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import {Add, Delete, Edit} from '@mui/icons-material';

import AbilityService from '@/app/services/AbilityService';

const AbilitiesPage = () => {
    const [abilities, setAbilities] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        cooldown: 0,
        activationTime: 0,
        image: null,
    });
    const [isEdit, setIsEdit] = useState(false);

    const fetchAbilities = async () => {
        try {
            const data = await AbilityService.getAbilities();
            setAbilities(data);
        } catch (err) {
            console.error('Failed to fetch abilities:', err);
        }
    };

    useEffect(() => {
        fetchAbilities();
    }, []);

    const handleOpen = (ability = {id: '', name: '', description: '', cooldown: 0, activationTime: 0, image: null}) => {
        setIsEdit(!!ability.id);
        setFormData(ability);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleImageChange = (e) => {
        setFormData({...formData, image: e.target.files[0]});
    };

    const handleSubmit = () => {
        try {
            if (isEdit) {
                AbilityService.updateAbility(formData).then(r => {
                    fetchAbilities();
                });
            } else {
                AbilityService.addAbility(formData).then(r => {
                    fetchAbilities();
                });
            }
            handleClose();
        } catch (err) {
            console.error('Failed to save ability:', err);
        }
    };

    const handleDelete = (id) => {
        try {
            AbilityService.deleteAbility(id).then(r => {
                fetchAbilities();
            });
        } catch (err) {
            console.error('Failed to delete ability:', err);
        }
    };

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'description', headerName: 'Description', flex: 2},
        {field: 'cooldown', headerName: 'Cooldown (s)', flex: 1},
        {field: 'activationTime', headerName: 'Activation Time (s)', flex: 1},
        {
            field: 'image',
            headerName: 'Image',
            renderCell: (params) => (
                params.row.image ? (
                    <CardMedia
                        component="img"
                        height="50"
                        image={`data:image/png;base64,${params.row.image}`}
                        alt={`${params.row.name} image`}
                    />
                ) : (
                    'No Image'
                )
            ),
            width: 100,
        },
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

            <DataGrid rows={abilities} columns={columns} pageSize={10} checkboxSelection={false}/>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEdit ? 'Edit Ability' : 'Add Ability'}</DialogTitle>
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
                        name="description"
                        label="Description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <TextField
                        margin="dense"
                        name="cooldown"
                        label="Cooldown (s)"
                        value={formData.cooldown}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                    />
                    <TextField
                        margin="dense"
                        name="activationTime"
                        label="Activation Time (s)"
                        value={formData.activationTime}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{mt: 2}}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                    {formData.image && (
                        <Typography sx={{mt: 1}} variant="body2">
                            Selected file: {formData.image.name || 'Existing image'}
                        </Typography>
                    )}
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

export default AbilitiesPage;
