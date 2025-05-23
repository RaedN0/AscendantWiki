'use client';

import {useState} from 'react';
import Image from 'next/image';
import ThemeProviderWrapper from "@/app/components/ThemeProvider";
import {TextField, Button, Box, Container, Paper, Typography} from '@mui/material';
import '@fontsource/orbitron';
import axios from "axios";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/api/register', {username, password}, {
                headers: {'Content-Type': 'application/json'},
            });

            setIsRegistering(false);
            setUsername('');
            setPassword('');
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <ThemeProviderWrapper>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 12,
                    px: {xs: 2, sm: 3, md: 4},
                    backgroundImage: 'url(/background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <Container maxWidth="sm">
                    <Paper
                        elevation={24}
                        sx={{
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            border: '1px solid rgba(0,255,120,0.3)',
                            borderRadius: 2,
                            boxShadow: '0 0 20px rgba(0,255,120,0.2)',
                        }}>
                        <Image
                            src="/logo.jpg"
                            alt="Logo"
                            width={100}
                            height={100}
                            style={{
                                borderRadius: '50%',
                                marginBottom: '24px',
                                border: '2px solid rgba(0,255,120,0.3)',
                                boxShadow: '0 0 15px rgba(0,255,120,0.15)'
                            }}
                            priority
                        />
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: 'Orbitron, Arial, sans-serif',
                                color: 'rgba(0,255,120,0.9)',
                                textShadow: '0 0 5px rgba(0,255,120,0.9)',
                                mb: 4
                            }}>
                            {isRegistering ? 'Create Account' : 'Sign In'}
                        </Typography>

                        {error && (
                            <Typography
                                color="error"
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255,0,0,0.1)',
                                    padding: 2,
                                    borderRadius: 1,
                                    width: '100%',
                                    textAlign: 'center'
                                }}
                            >
                                {error}
                            </Typography>
                        )}

                        <Box
                            component="form"
                            method={isRegistering ? undefined : "POST"}
                            action={isRegistering ? undefined : `/auth/login`}
                            onSubmit={isRegistering ? handleRegister : undefined}
                            sx={{width: '100%', mt: 1}}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(0,255,120,0.3)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(0,255,120,0.5)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'rgba(0,255,120,0.7)',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(255,255,255,0.7)',
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white',
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete={isRegistering ? 'new-password' : 'current-password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(0,255,120,0.3)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(0,255,120,0.5)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'rgba(0,255,120,0.7)',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(255,255,255,0.7)',
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white',
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    borderColor: 'rgba(0,255,120,0.3)',
                                    color: 'rgba(0,255,120,0.9)',
                                    '&:hover': {
                                        borderColor: 'rgba(0,255,120,0.5)',
                                        backgroundColor: 'rgba(0,255,120,0.1)',
                                    },
                                    textTransform: 'none',
                                    fontFamily: 'Orbitron, Arial, sans-serif',
                                }}
                            >
                                {isRegistering ? 'Register' : 'Sign In'}
                            </Button>

                            <Button
                                fullWidth
                                onClick={() => {
                                    setIsRegistering(!isRegistering);
                                    setError('');
                                    setUsername('');
                                    setPassword('');
                                }}
                                sx={{
                                    color: 'rgba(0,255,120,0.7)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,255,120,0.1)',
                                    },
                                    textTransform: 'none',
                                    fontFamily: 'Orbitron, Arial, sans-serif',
                                }}
                            >
                                {isRegistering ? 'Back to Sign In' : 'Create New Account'}
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProviderWrapper>
    );
}