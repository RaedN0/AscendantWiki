'use client';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ItemDialog({
                                       open,
                                       onClose,
                                       onSubmit,
                                       itemToEdit,
                                       dialogFields = [],
                                   }) {

    const [formData, setFormData] = useState({});
    const isEdit = !!itemToEdit?.id;

    useEffect(() => {
        if (open) {
            const initialData = itemToEdit ? { ...itemToEdit } : {};
            setFormData(initialData);

        }
    }, [open, itemToEdit]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prevData => ({ ...prevData, image: file }));

        }
    };

    const handleSubmit = () => {
        onSubmit(formData, isEdit);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{isEdit ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            <DialogContent>
                {dialogFields.map((field) => {
                    if (field.type === 'select') {
                        return (
                            <FormControl
                                key={field.name}
                                fullWidth
                                margin="dense"
                                sx={{ mt: 2 }}
                            >
                                <InputLabel id={`${field.name}-select-label`}>{field.label}</InputLabel>
                                <Select
                                    labelId={`${field.name}-select-label`}
                                    label={field.label}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                >
                                    {field.options?.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                    }

                    if (field.type === 'image') {
                        return (
                            <Box
                                key={field.name}
                                sx={{
                                    mt: 2,
                                    mb: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    component="label"
                                >
                                    {formData.image instanceof File ? `Change ${field.label}` : field.label}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImageChange}
                                    />
                                </Button>
                            </Box>
                        );
                    }

                    if (field.type === 'textarea') {
                        return (
                            <TextField
                                key={field.name}
                                margin="dense"
                                name={field.name}
                                label={field.label}
                                type="text"
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={field.rows || 4}
                            />
                        );
                    }

                    return (
                        <TextField
                            key={field.name}
                            margin="dense"
                            name={field.name}
                            label={field.label}
                            type={field.type || 'text'}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    {isEdit ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
