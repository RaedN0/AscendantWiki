"use client";

import React, { createContext, useEffect, useState } from 'react';
import AuthenticationService from "@/app/services/AuthenticationService";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await AuthenticationService.isAdmin();
                setIsAdmin(response);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    return (
        <RoleContext.Provider value={{ isAdmin }}>
            {children}
        </RoleContext.Provider>
    );
};
