import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material";
import React, { useContext } from "react";
import { RoleContext } from "@/app/RoleContext";

export default function LoginButtons (){
    const { isAuthenticated, username, isLoading } = useContext(RoleContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isLoading) return (
        <Button 
            variant="outlined" 
            size={isMobile ? "small" : "medium"} 
            disabled
            sx={{
                borderColor: theme.palette.custom.main,
                color: theme.palette.custom.main,
            }}
        >
            Loading...
        </Button>
    );
    if (isAuthenticated) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                    sx={{
                        color: theme.palette.custom.main,
                        display: { xs: 'none', sm: 'block' }
                    }}
                >
                    {username}
                </Typography>
                <Button
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    onClick={() => window.location.href = '/api/auth/logout'}
                    sx={{
                        borderColor: theme.palette.custom.main,
                        color: theme.palette.custom.main,
                        '&:hover': {
                            backgroundColor: 'rgba(0,255,120,0.1)',
                        }
                    }}
                >
                    Logout
                </Button>
            </Box>
        );
    }

    return (
        <Button
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            onClick={() => {
                const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || 'YOUR_CLIENT_ID';
                if (clientId === 'YOUR_CLIENT_ID') {
                    alert('Auth0 not configured yet. Please set your CLIENT_ID and CLIENT_SECRET in .env.local');
                    return;
                }
                // Direct Auth0 redirect as workaround
                const authUrl = `https://ascendant.eu.auth0.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent('http://localhost:3000/api/auth/callback')}&scope=openid%20profile%20email`;
                window.location.href = authUrl;
            }}
            sx={{
                borderColor: theme.palette.custom.main,
                color: theme.palette.custom.main,
                '&:hover': {
                    backgroundColor: 'rgba(0,255,120,0.1)',
                }
            }}
        >
            Login
        </Button>
    );
}