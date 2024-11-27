'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {
    CircularProgress,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    useTheme,
} from '@mui/material';
import UnderdogService from '@/app/services/UnderdogService';

const LeaderboardPage = () => {
    const theme = useTheme();

    const [players, setPlayers] = useState([]);
    const [totalPlayers, setTotalPlayers] = useState(0);

    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState('score');
    const [order, setOrder] = useState('desc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    const fetchPlayers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await UnderdogService.getUnderdogs(page, rowsPerPage, orderBy, order, searchQuery);
            setPlayers(data.content);
            setTotalPlayers(data.totalElements);
        } catch (error) {
            console.error('Error fetching players:', error);
        } finally {
            setLoading(false);
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

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'url(/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
                height: '100%',
            }}
        >
            {loading ? (
                <CircularProgress sx={{color: theme.palette.custom.main}}/>
            ) : (
                <>
                    <TextField
                        variant="outlined"
                        placeholder="Search by name"
                        fullWidth
                        sx={{
                            mb: 2,
                            backgroundColor: '#1a1a1a',
                            input: {color: '#ffffff'},
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {borderColor: theme.palette.custom.main},
                                '&:hover fieldset': {borderColor: theme.palette.custom.main},
                                '&.Mui-focused fieldset': {borderColor: theme.palette.custom.main},
                            },
                        }}
                        InputProps={{
                            style: {color: '#ffffff'},
                        }}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                    />
                    <TableContainer
                        component={Paper}
                        sx={{
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
                            }}
                        />
                    </TableContainer>
                </>
            )}
        </Container>
    );
};

export default LeaderboardPage;
