'use client';

import React, {useContext, useState} from 'react';
import {
    Box,
    Button,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {Add} from '@mui/icons-material';
import {RoleContext} from '@/app/RoleContext';
import {gradientBackground} from "@/app/styles/gradient";

const ListSection = ({
                         items,
                         onAdd,
                         onEdit,
                         onDelete,
                         selectedItem,
                         setSelectedItem,
                         dialogFields,
                         flexDirection = 'row',
                         imageStyle = {width: 50, height: 50},
                         textStyle = {marginLeft: '8px'},
                     }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const roleContext = useContext(RoleContext);

    const [menuAnchor, setMenuAnchor] = useState(null);
    const [contextItem, setContextItem] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const handleContextMenu = (event, item) => {
        event.preventDefault();
        setContextItem(item);
        setMenuAnchor(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
        setContextItem(null);
    };

    const handleOpenDialog = (item = {}) => {
        setIsEdit(!!item.id);
        setFormData(item);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setFormData({});
    };

    const handleSubmitDialog = () => {
        if (isEdit) {
            onEdit(formData);
        } else {
            onAdd(formData);
        }
        handleCloseDialog();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleImageChange = (e) => {
        setFormData({...formData, image: e.target.files[0]});
    };

    return (
        <Box
            sx={{
                border: `2px solid ${theme.palette.custom.main}`,
                boxShadow: `0 0 10px 1px ${theme.palette.custom.main}`,
                borderRadius: 2,
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <List
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    overflow: 'auto',
                    gap: '20px',
                }}
            >
                {items.map((item) => (
                    <ListItem
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        onContextMenu={(e) => handleContextMenu(e, item)}
                        sx={{
                            ...gradientBackground,
                            flexDirection: isMobile ? 'column' : flexDirection,
                            background: selectedItem?.id === item?.id ? theme.palette.custom.main : gradientBackground.background,
                            minWidth: isMobile ? '150px' : '20px',
                            borderRadius: '8px',
                            padding: 0,
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            '&:hover': {
                                background: theme.palette.custom.hover,
                                boxShadow: `0 0 10px ${theme.palette.custom.main}`,
                            },
                        }}
                    >
                        <ListItemIcon sx={{justifyContent: 'center', paddingX: '1em', paddingTop: '1em', maxHeight: '7em', marginTop: '-5px'}}>
                            {item.image && (
                                <CardMedia
                                    component="img"
                                    image={`data:image/png;base64,${item.image}`}
                                    alt={item.name}
                                    sx={{
                                        ...imageStyle,
                                        objectFit: 'contain',
                                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                        borderRadius: '4px',
                                    }}
                                />
                            )}
                        </ListItemIcon>

                        <ListItemText
                            primary={
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...textStyle,
                                        color: selectedItem?.id === item.id ? 'rgb(0, 0, 0)' : '#ffffff',
                                        fontWeight: 'bold',
                                        textAlign: isMobile ? 'center' : 'flex-start',
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>


            {/*ADMIN STUFF*/}
            {roleContext.isAdmin && (
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => handleOpenDialog()}
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                    }}
                >
                    <Add/>
                </Fab>
            )}

            {roleContext.isAdmin && (
                <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleCloseMenu}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: 'rgba(0,0,0,0.9)',
                            color: '#fff',
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            handleCloseMenu();
                            handleOpenDialog(contextItem);
                        }}
                    >
                        Edit
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleCloseMenu();
                            onDelete(contextItem);
                        }}
                    >
                        Delete
                    </MenuItem>
                </Menu>
            )}

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{isEdit ? 'Edit Item' : 'Add Item'}</DialogTitle>
                <DialogContent>
                    {dialogFields.map((field) => {
                        if (field.type === 'select') {
                            return (
                                <FormControl
                                    key={field.name}
                                    fullWidth
                                    sx={{mt: 2}}
                                >
                                    <InputLabel>{field.label}</InputLabel>
                                    <Select
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                    >
                                        {field.options.map((option) => (
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
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        {field.label}
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleImageChange}
                                        />
                                    </Button>
                                </Box>
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
                                multiline={field.multiline || false}
                                rows={field.rows || 1}
                            />
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmitDialog} variant="contained">
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ListSection;
