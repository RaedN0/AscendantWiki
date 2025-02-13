"use client";

import React, { createContext, useEffect, useState } from 'react';
import authenticationService from "@/app/services/AuthenticationService";

export const RoleContext = createContext({
    isAdmin: false,
    isAuthenticated: false,
    username: null
});

export function RoleProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const userInfo = await authenticationService.getUserInfo();
            setIsAuthenticated(userInfo.isAuthenticated);
            setIsAdmin(userInfo.isAdmin);
            setUsername(userInfo.username);
        };
        checkAuthentication();
    }, []);

    return (
        <RoleContext.Provider value={{ isAdmin, isAuthenticated, username }}>
            {children}
        </RoleContext.Provider>
    );
}
