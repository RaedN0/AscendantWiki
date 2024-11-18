import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function middleware(req) {
    const sessionCookie = req.cookies.get('JSESSIONID');
    const sessionToken = sessionCookie ? sessionCookie.value : null;

    console.log('Session token:', sessionToken);

    if (!sessionToken) {
        console.log('No JSESSIONID found. Redirecting to /login.');
        return NextResponse.redirect(new URL(`${API_URL}/login`, req.url));
    }

    try {
        const res = await fetch(`${API_URL}/api/auth-status`, {
            headers: {
                Cookie: `JSESSIONID=${sessionToken}`,
            },
            credentials: 'include',
        });

        console.log('Backend response status:', res.status);

        if (res.ok) {
            const data = await res.json();
            console.log('Auth status:', data);

            if (!data.roles.includes('ROLE_ADMIN')) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        } else {
            console.log('Failed to authenticate.');
            return NextResponse.redirect(new URL(`${API_URL}/login`, req.url));
        }
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL(`${API_URL}/login`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/weapons', '/admin/attachments'],
};
