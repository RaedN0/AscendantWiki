"use client";

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    IconButton,
    Fab,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";

import AttachmentService from "@/app/services/AttachmentService"; // Create this service similarly to WeaponService

const AttachmentsPage = () => {
    const [attachments, setAttachments] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        type: "OPTIC",
        multiplier: 0,
    });
    const [isEdit, setIsEdit] = useState(false);

    const fetchAttachments = async () => {
        try {
            const data = await AttachmentService.getAttachments();
            setAttachments(data);
        } catch (err) {
            console.error("Failed to fetch attachments", err);
        }
    };

    useEffect(() => {
        fetchAttachments();
    }, []);

    const handleOpen = (attachment = { id: "", name: "", type: "OPTIC", multiplier: 1 }) => {
        setIsEdit(!!attachment.id);
        setFormData(attachment);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await AttachmentService.updateAttachment(formData);
            } else {
                await AttachmentService.addAttachment(formData);
            }
            fetchAttachments();
            handleClose();
        } catch (err) {
            console.error("Failed to save attachment", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await AttachmentService.deleteAttachment(id);
            fetchAttachments();
        } catch (err) {
            console.error("Failed to delete attachment", err);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "type", headerName: "Type", flex: 1 },
        { field: "multiplier", headerName: "Multiplier", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleOpen(params.row)} color="primary">
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)} color="error">
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box sx={{ height: 600, width: "100%", mt: 4 }}>
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => handleOpen()}
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                }}
            >
                <Add />
            </Fab>

            <DataGrid rows={attachments} columns={columns} pageSize={10} checkboxSelection={false} />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEdit ? "Edit Attachment" : "Add Attachment"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Select
                        margin="dense"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="OPTIC">Optic</MenuItem>
                        <MenuItem value="GRIP">Grip</MenuItem>
                        <MenuItem value="BARREL">Barrel</MenuItem>
                    </Select>
                    <TextField
                        margin="dense"
                        name="multiplier"
                        label="Multiplier"
                        value={formData.multiplier}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {isEdit ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AttachmentsPage;
