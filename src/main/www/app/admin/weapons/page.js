"use client";

import { useEffect, useState } from 'react';

export default function AuthCheck() {
    const [authStatus, setAuthStatus] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('https://ascendant.raedn.net/auth-status', {
                    credentials: 'include', // Send cookies for session authentication
                });

                if (res.ok) {
                    const text = await res.text();
                    setAuthStatus(text);
                } else {
                    setAuthStatus('Failed to check authentication');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setAuthStatus('Error checking authentication');
            }
        };

        checkAuth();
    }, []);

    return (
        <div>
            <h1>Authentication Check</h1>
            <p>Status: {authStatus || 'Loading...'}</p>
        </div>
    );
}
