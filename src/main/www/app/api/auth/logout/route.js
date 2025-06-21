import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Create response with redirect to home
    const response = NextResponse.redirect(new URL('/', request.url));
    
    // Clear auth cookies
    response.cookies.set('auth_user', '', {
      maxAge: 0,
      path: '/'
    });
    
    response.cookies.set('auth_token', '', {
      maxAge: 0,
      path: '/'
    });

    console.log('User logged out');
    return response;
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.redirect(new URL('/?error=logout_failed', request.url));
  }
}