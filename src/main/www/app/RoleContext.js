"use client";

import React, { createContext, useEffect, useState } from 'react';

export const RoleContext = createContext({
    isAdmin: false,
    isAuthenticated: false,
    username: null,
    isLoading: true
});

export function RoleProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for our custom auth cookie
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };

        const authUserCookie = getCookie('auth_user');
        if (authUserCookie) {
            try {
                const userData = JSON.parse(decodeURIComponent(authUserCookie));
                setUser(userData);
            } catch (error) {
                console.error('Error parsing auth cookie:', error);
            }
        }
        setIsLoading(false);
    }, []);
    
    const isAuthenticated = !!user;
    const isAdmin = user?.roles?.includes('admin') || false; // Adjust based on your user structure
    const username = user?.name || user?.email || null;

    return (
        <RoleContext.Provider value={{ isAdmin, isAuthenticated, username, isLoading, user }}>
            {children}
        </RoleContext.Provider>
    );
}
