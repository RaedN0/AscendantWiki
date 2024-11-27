"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import UnderdogService from "@/app/services/UnderdogService";

const UnderdogsPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        try {
            const response = await UnderdogService.saveUnderdogs(selectedFile);
            alert(`File uploaded successfully: ${response.message || 'Success'}`);
        } catch (error) {
            alert("Failed to upload file.");
        } finally {
            handleClose();
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleOpen}
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                }}
            >
                <Add />
            </Fab>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload File</DialogTitle>
                <DialogContent>
                    <Button variant="contained" component="label" sx={{ mt: 2 }}>
                        Choose File
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {selectedFile && (
                        <Typography sx={{ mt: 1 }} variant="body2">
                            Selected file: {selectedFile.name}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UnderdogsPage;
