'use client';

import React, {useContext, useState} from 'react';
import {Box, Fab, List, Menu, MenuItem, useMediaQuery, useTheme,} from '@mui/material';
import {Add} from '@mui/icons-material';
import {RoleContext} from '@/app/RoleContext';
import ItemDialog from "@/app/components/ItemDialog";
import ItemDisplay from "@/app/components/ItemDisplay";

export default function ListSection({
                                        items = [],
                                        onAdd,
                                        onEdit,
                                        onDelete,
                                        selectedItem,
                                        setSelectedItem,
                                        dialogFields,
                                        styles = {
                                            flexDirection: 'row',
                                            imageStyle: {width: 50, height: 50},
                                            textStyle: {marginLeft: '8px'}
                                        }
                                    }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const roleContext = useContext(RoleContext);

    const [dialogConfig, setDialogConfig] = useState({
        open: false,
        item: null,
    });
    const [contextMenu, setContextMenu] = useState({
        anchor: null,
        item: null,
    });

    const handleContextMenu = (event, item) => {
        event.preventDefault();
        setContextMenu({anchor: event.currentTarget, item: item});
    };

    const handleCloseMenu = () => {
        setContextMenu({anchor: null, item: null});
    };

    const handleOpenDialog = (itemToEdit = null) => {
        setDialogConfig({open: true, item: itemToEdit});
        handleCloseMenu();
    };

    const handleCloseDialog = () => {
        setDialogConfig({open: false, item: null});
    };

    const handleDialogSubmit = (submittedData, isEditMode) => {
        if (isEditMode) {
            onEdit(submittedData);
        } else {
            onAdd(submittedData);
        }
        handleCloseDialog();
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
                height: isMobile ? 'auto' : '100%',
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
                    <ItemDisplay
                        key={item.id}
                        item={item}
                        handleContextMenu={handleContextMenu}
                        isMobile={isMobile}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        styles={styles}
                    />
                ))}
            </List>


            {roleContext.isAdmin && (
                <>
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
                    <Menu
                        anchorEl={contextMenu.anchor}
                        open={Boolean(contextMenu.anchor)}
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
                                handleOpenDialog(contextMenu.item);
                            }}
                        >
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleCloseMenu();
                                onDelete(contextMenu.item);
                            }}
                        >
                            Delete
                        </MenuItem>
                    </Menu>
                </>
            )}

            <ItemDialog
                open={dialogConfig.open}
                itemToEdit={dialogConfig.item}
                onClose={handleCloseDialog}
                onSubmit={handleDialogSubmit}
                dialogFields={dialogFields}
            />
        </Box>
    );
}