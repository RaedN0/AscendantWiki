import {Box, Button, Menu, MenuItem, useTheme} from "@mui/material";
import Link from "next/link";
import React, {useState} from "react";
import {usePathname} from "next/navigation";

export default function DesktopNavbar({navItems, loadoutItems}) {
    const theme = useTheme();
    const pathname = usePathname();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                justifyContent: "center",
                flex: "1 1 auto",
            }}
        >
            {navItems.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                    <Button
                        sx={{
                            color: pathname === item.href ? "#000000" : "#e0e0e0",
                            backgroundColor:
                                pathname === item.href
                                    ? theme.palette.custom.main
                                    : "transparent",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                            letterSpacing: "1.5px",
                            padding: "8px 16px",
                            border:
                                pathname === item.href
                                    ? `1px solid ${theme.palette.custom.main}`
                                    : "none",
                            borderRadius: "4px",
                            "&:hover": {
                                backgroundColor:
                                    pathname === item.href
                                        ? theme.palette.custom.main
                                        : "rgba(255, 255, 255, 0.1)",
                                color:
                                    pathname === item.href
                                        ? "#000000"
                                        : "#aad1e6",
                            },
                        }}
                    >
                        {item.text}
                    </Button>
                </Link>
            ))}

            <Button
                onClick={handleMenuClick}
                sx={{
                    color: "#e0e0e0",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    letterSpacing: "1.5px",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "#aad1e6",
                    },
                }}
            >
                Loadout
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "#1a1a1a",
                        color: "#e0e0e0",
                        border: `1px solid ${theme.palette.custom.main}`,
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                        minWidth: "200px",
                        padding: "8px 0",
                    },
                }}
                TransitionProps={{
                    onEnter: (node) => {
                        node.style.opacity = 0;
                        node.style.transform = "scale(0.9)";
                        node.style.transition =
                            "opacity 200ms ease-in-out, transform 200ms ease-in-out";
                    },
                    onEntered: (node) => {
                        node.style.opacity = 1;
                        node.style.transform = "scale(1)";
                    },
                    onExit: (node) => {
                        node.style.opacity = 0;
                        node.style.transform = "scale(0.9)";
                    },
                }}
            >
                {loadoutItems.map((item) => (
                    <MenuItem
                        key={item.href}
                        onClick={handleMenuClose}
                        component={Link}
                        href={item.href}
                        sx={{
                            "&:hover": {
                                background: theme.palette.custom.main,
                                color: "#000000",
                            },
                            padding: "10px 16px",
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                        }}
                    >
                        {item.text}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
