import {Box, Button, Typography, useMediaQuery, useTheme} from "@mui/material";
import authenticationService from "@/app/services/AuthenticationService";
import Link from "next/link";
import React from "react";

export default function LoginButtons ({isAuthenticated, username}){

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                    onClick={() => authenticationService.logout()}
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
        <Link href="/login" passHref>
            <Button
                variant="outlined"
                size={isMobile ? "small" : "medium"}
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
        </Link>
    );
}