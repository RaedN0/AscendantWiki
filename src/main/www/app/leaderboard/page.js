'use client';

import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container, Dialog, DialogActions, DialogContent, DialogTitle, Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField, Typography,
    useTheme,
} from '@mui/material';
import UnderdogService from '@/app/services/UnderdogService';
import {RoleContext} from "@/app/RoleContext";
import {Add} from "@mui/icons-material";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const LeaderboardPage = () => {
    const theme = useTheme();
    const roleContext = useContext(RoleContext);

    const [players, setPlayers] = useState([]);
    const [totalPlayers, setTotalPlayers] = useState(0);

    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState('score');
    const [order, setOrder] = useState('desc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchPlayers = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await UnderdogService.getUnderdogs(page, rowsPerPage, orderBy, order, searchQuery);
            setPlayers(data.content);
            setTotalPlayers(data.totalElements);
        } catch (error) {
            console.error('Error fetching players:', error);
        } finally {
            setIsLoading(false);
        }
    }, [page, rowsPerPage, orderBy, order, searchQuery]);

    useEffect(() => {
        fetchPlayers();
    }, [fetchPlayers]);

    const triggerSearch = () => {
        setSearchQuery(searchInput);
        setPage(0);
    };

    const handleBlur = () => {
        triggerSearch();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            triggerSearch();
        }
    };

    const handleSort = (property) => {
        if (property === 'name') return;
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    if (isLoading) {
        return (
            <LoadingSpinner/>
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
                    gap: 2,
                    width: '100vw',
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search by name"
                    sx={{
                        backgroundColor: '#1a1a1a',
                        input: {color: '#ffffff'},
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {borderColor: theme.palette.custom.main},
                            '&:hover fieldset': {borderColor: theme.palette.custom.main},
                            '&.Mui-focused fieldset': {borderColor: theme.palette.custom.main},
                        },
                    }}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
                <TableContainer
                    component={Paper}
                    sx={{
                        height: '100%',
                        backgroundColor: '#1a1a1a',
                        border: `1px solid ${theme.palette.custom.main}`,
                        borderRadius: '8px',
                        overflow: 'auto',
                        boxShadow: `0 0 15px ${theme.palette.custom.main}`,
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    color: theme.palette.custom.main,
                                    backgroundColor: '#1a1a1a',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1000,
                                }}
                            >
                                <TableCell sx={{color: theme.palette.custom.main, fontWeight: 'bold'}}>Rank</TableCell>
                                <TableCell sx={{color: theme.palette.custom.main, fontWeight: 'bold'}}>Player Name</TableCell>
                                <TableCell sx={{color: theme.palette.custom.main, fontWeight: 'bold'}}>
                                    <TableSortLabel
                                        active={orderBy === 'score'}
                                        direction={orderBy === 'score' ? order : 'asc'}
                                        onClick={() => handleSort('score')}
                                        sx={{
                                            color: theme.palette.custom.main,
                                            '&.Mui-active': {color: theme.palette.custom.main},
                                        }}
                                    >
                                        Score
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players.map((player) => (
                                <React.Fragment key={player.id}>
                                    <TableRow
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#343434',
                                            },
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            borderTop: `2px solid ${theme.palette.custom.main}`,
                                            borderBottom: `2px solid ${theme.palette.custom.main}`,
                                        }}
                                    >
                                        <TableCell
                                            sx={{
                                                color: '#ffffff',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {player.rank}
                                        </TableCell>
                                        <TableCell sx={{color: '#ffffff'}}>{player.name}</TableCell>
                                        <TableCell sx={{color: '#ffffff'}}>{player.score}</TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalPlayers}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            color: theme.palette.custom.main,
                            backgroundColor: '#1a1a1a',
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 1000,
                            '.MuiTablePagination-toolbar': {
                                flexWrap: 'wrap',
                            },
                            '.MuiTablePagination-spacer': {
                                display: 'none',
                            },
                            '.MuiTablePagination-actions': {
                                marginLeft: {xs: '0', sm: '1rem'},
                                justifySelf: 'center'
                            },
                        }}
                    />
                </TableContainer>
            </Box>

            {roleContext.isAdmin && (
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
                    <Add/>
                </Fab>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload File</DialogTitle>
                <DialogContent>
                    <Button variant="contained" component="label" sx={{mt: 2}}>
                        Choose File
                        <input type="file" hidden onChange={handleFileChange}/>
                    </Button>
                    {selectedFile && (
                        <Typography sx={{mt: 1}} variant="body2">
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

export default LeaderboardPage;
