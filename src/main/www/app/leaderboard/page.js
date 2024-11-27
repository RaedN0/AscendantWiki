'use client';

import {useEffect, useState} from 'react';
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
    useTheme,
} from '@mui/material';
import UnderdogService from "@/app/services/UnderdogService";

const LeaderboardPage = () => {

    const theme = useTheme();

    const [players, setPlayers] = useState([]);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('score');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        UnderdogService.getUnderdogs()
            .then((data) => setPlayers(data))
            .catch((err) => console.log(err))
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
        setPage(0);
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
        <Container maxWidth="lg"
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
                            <TableRow sx={{
                                color: theme.palette.custom.main,
                                backgroundColor: '#1a1a1a',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1000,
                            }}>
                                <TableCell sx={{color: '#00ff00', fontWeight: 'bold'}}>#</TableCell>
                                <TableCell sx={{color: '#00ff00', fontWeight: 'bold'}}>
                                    <TableSortLabel
                                        sx={{color: theme.palette.custom.main, '&.Mui-active': {color: theme.palette.custom.main}}}
                                    >
                                        Player Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{color: '#00ff00', fontWeight: 'bold'}}>
                                    <TableSortLabel
                                        active={orderBy === 'score'}
                                        direction={orderBy === 'score' ? order : 'asc'}
                                        onClick={() => handleSort('score')}
                                        sx={{color: theme.palette.custom.main, '&.Mui-active': {color: theme.palette.custom.main}}}
                                    >
                                        Score
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedPlayers.map((player, index) => (
                                <>
                                    <TableRow
                                        key={player.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#343434',
                                            },
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            borderTop: `2px solid ${theme.palette.custom.main}`,
                                            borderBottom: `2px solid ${theme.palette.custom.main}`
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
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell sx={{color: '#ffffff'}}>{player.name}</TableCell>
                                        <TableCell sx={{color: '#ffffff'}}>{player.score}</TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{
                                            height: '10px',
                                            backgroundColor: '#1a1a1a',
                                        }}
                                    >
                                        <TableCell colSpan={6} sx={{padding: 0, border: 'none'}}/>
                                    </TableRow>
                                </>
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
                        sx={{
                            color: theme.palette.custom.main,
                            backgroundColor: '#1a1a1a',
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 1000,
                        }}
                    />
                </TableContainer>
            )}
        </Container>
    );
};

export default LeaderboardPage;
