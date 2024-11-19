'use client';

import {useEffect, useState} from 'react';
import {
    Box,
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
    Typography,
} from '@mui/material';
import LeaderboardService from '@/app/services/LeaderboardService'; // Mocked service for leaderboard data

const LeaderboardPage = () => {
    const [players, setPlayers] = useState([]);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('biocores');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        LeaderboardService.getLeaderboard()
            .then((data) => setPlayers(data))
            .catch((err) => console.error('Failed to fetch leaderboard:', err))
            .finally(() => setLoading(false));
    }, []);

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };

    const sortedPlayers = [...players].sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });

    const paginatedPlayers = sortedPlayers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Container maxWidth="lg" sx={{marginTop: '20px'}}>
            <Typography variant="h4" component="h1" gutterBottom sx={{textAlign: 'center', color: '#aad1e6'}}>
                Leaderboard
            </Typography>

            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'calc(100vh - 200px)',
                    }}
                >
                    <CircularProgress sx={{color: '#00ff00'}}/>
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{backgroundColor: '#2a2a2a'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: '#e0e0e0'}}>#</TableCell>
                                <TableCell sx={{color: '#e0e0e0'}}>
                                    <TableSortLabel
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={() => handleSort('name')}
                                    >
                                        Player Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{color: '#e0e0e0'}}>
                                    <TableSortLabel
                                        active={orderBy === 'kills'}
                                        direction={orderBy === 'kills' ? order : 'asc'}
                                        onClick={() => handleSort('kills')}
                                    >
                                        Kills
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{color: '#e0e0e0'}}>
                                    <TableSortLabel
                                        active={orderBy === 'deaths'}
                                        direction={orderBy === 'deaths' ? order : 'asc'}
                                        onClick={() => handleSort('deaths')}
                                    >
                                        Deaths
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{color: '#e0e0e0'}}>
                                    <TableSortLabel
                                        active={orderBy === 'games'}
                                        direction={orderBy === 'games' ? order : 'asc'}
                                        onClick={() => handleSort('games')}
                                    >
                                        Games Played
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{color: '#e0e0e0'}}>
                                    <TableSortLabel
                                        active={orderBy === 'biocores'}
                                        direction={orderBy === 'biocores' ? order : 'asc'}
                                        onClick={() => handleSort('biocores')}
                                    >
                                        Biocores
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedPlayers.map((player, index) => (
                                <TableRow key={player.id}>
                                    <TableCell sx={{color: '#e0e0e0'}}>
                                        {page * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell sx={{color: '#e0e0e0'}}>{player.name}</TableCell>
                                    <TableCell sx={{color: '#e0e0e0'}}>{player.kills}</TableCell>
                                    <TableCell sx={{color: '#e0e0e0'}}>{player.deaths}</TableCell>
                                    <TableCell sx={{color: '#e0e0e0'}}>{player.games}</TableCell>
                                    <TableCell sx={{color: '#e0e0e0'}}>{player.biocores}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={players.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{color: '#e0e0e0', backgroundColor: '#1f1f1f'}}
                    />
                </TableContainer>
            )}
        </Container>
    );
};

export default LeaderboardPage;
