"use client"

import React, {useEffect, useState} from "react";
import EventService from "@/app/services/EventService";
import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    IconButton,
    MenuItem,
    Select,
    TextField, Typography
} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import {DataGrid} from "@mui/x-data-grid";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(
        {
            id: "",
            name: "",
            description: "",
            image: null,
        }
    );
    const [isEdit, setIsEdit] = useState(false);
    const fetchEvents = async () => {
        try {
            const data = await EventService.getEvents();
            setEvents(data);
        } catch (err) {
            console.error("Failed to fetch events:", err);
        }
    }
    useEffect(() => {
        fetchEvents();
    }, []);

    const handleOpen = (event = {id: "", name: "", description: "", image: null}) => {
        setIsEdit(!!event.id);
        setFormData(event);
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
                EventService.updateEvent(formData).then(r => {
                    fetchEvents();
                });
            } else {
                EventService.addEvent(formData).then(r => {
                    fetchEvents();
                });
            }
            handleClose();
        } catch (err) {
            console.error("Failed to save event:", err);
        }
    };

    const handleDelete = (id) => {
        try {
            EventService.deleteEvent(id).then(r => {
                fetchEvents();
            });
        } catch (err) {
            console.error("Failed to delete event:", err);
        }
    };

    const columns = [
        {field: "id", headerName: "ID", width: 90},
        {field: "name", headerName: "Name", flex: 1},
        {field: "description", headerName: "Description", flex: 2},
        {field: "image", headerName: "Image", flex: 1},
        {
            field: "actions",
            headerName: "Actions",
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
        <Box sx={{height: 600, width: "100%", mt: 4}}>
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
                <Add/>
            </Fab>

            <DataGrid rows={events} columns={columns} pageSize={10} checkboxSelection={false}/>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEdit ? "Edit Event" : "Add Event"}</DialogTitle>
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
                            Selected file: {formData.image.name}
                        </Typography>
                    )}
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
}
export default EventPage;