import React, {useState} from "react";
import {Box, Divider, Drawer, IconButton, List, ListItem, ListItemText, Typography, useTheme,} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

export default function MobileNavbar({navItems, loadoutItems, buildsItems}) {
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <Box>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
                sx={{
                    color: theme.palette.custom.main,
                }}
            >
                <MenuIcon/>
            </IconButton>

            <Drawer
                anchor="top"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        backgroundColor: "#0f0f0f",
                        color: "#e0e0e0",
                        height: "100%",
                        width: "100%",
                        padding: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 20px",
                        borderBottom: `1px solid ${theme.palette.custom.main}`,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.custom.main,
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            fontSize: "1.5rem",
                        }}
                    >
                        Menu
                    </Typography>
                    <IconButton
                        onClick={handleDrawerClose}
                        sx={{
                            color: "#e0e0e0",
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>

                <List
                    sx={{
                        marginTop: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        paddingX: 2,
                    }}
                >
                    {navItems.map((item) => (
                        <ListItem
                            key={item.href}
                            onClick={handleDrawerClose}
                            component={Link}
                            href={item.href}
                            sx={{
                                "&:hover": {
                                    backgroundColor: theme.palette.custom.main,
                                    color: "#000000",
                                },
                                padding: "10px 0",
                                marginBottom: "5px",
                            }}
                        >
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    color: "#e0e0e0",
                                }}
                            />
                        </ListItem>
                    ))}

                    <Divider
                        sx={{
                            borderColor: theme.palette.custom.main,
                            marginY: 2,
                            width: "100%",
                        }}
                    />

                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: "#aad1e6",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            fontSize: "0.9rem",
                            marginBottom: 1,
                        }}
                    >
                        Loadout
                    </Typography>
                    {loadoutItems.map((item) => (
                        <ListItem
                            key={item.href}
                            onClick={handleDrawerClose}
                            component={Link}
                            href={item.href}
                            sx={{
                                "&:hover": {
                                    backgroundColor: theme.palette.custom.main,
                                    color: "#000000",
                                },
                                padding: "10px 0",
                                marginBottom: "5px",
                            }}
                        >
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: "1.1rem",
                                    fontWeight: "medium",
                                    color: "#e0e0e0",
                                }}
                            />
                        </ListItem>
                    ))}
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: "#aad1e6",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            fontSize: "0.9rem",
                            marginBottom: 1,
                        }}
                    >
                        Builds
                    </Typography>
                    {buildsItems.map((item) => (
                        <ListItem
                            key={item.href}
                            onClick={handleDrawerClose}
                            component={Link}
                            href={item.href}
                            sx={{
                                "&:hover": {
                                    backgroundColor: theme.palette.custom.main,
                                    color: "#000000",
                                },
                                padding: "10px 0",
                                marginBottom: "5px",
                            }}
                        >
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: "1.1rem",
                                    fontWeight: "medium",
                                    color: "#e0e0e0",
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
