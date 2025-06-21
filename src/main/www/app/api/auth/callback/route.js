import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if (error) {
      console.error('Auth0 Error:', error);
      return NextResponse.redirect(new URL('/?error=' + error, request.url));
    }
    
    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(new URL('/?error=no_code', request.url));
    }

    // Exchange the code for tokens
    const tokenResponse = await fetch(`https://ascendant.eu.auth0.com/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: code,
        redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
      }),
    });

    const tokens = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokens);
      return NextResponse.redirect(new URL('/?error=token_exchange_failed', request.url));
    }

    // Get user info
    const userResponse = await fetch(`https://ascendant.eu.auth0.com/userinfo`, {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    });

    const user = await userResponse.json();
    
    // Create response with redirect
    const response = NextResponse.redirect(new URL('/?login=success', request.url));
    
    // Set simple session cookies (in production, use proper JWT handling)
    response.cookies.set('auth_user', JSON.stringify({
      sub: user.sub,
      name: user.name,
      email: user.email,
      picture: user.picture
    }), {
      httpOnly: false, // Allow frontend to read it
      secure: false, // Set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    response.cookies.set('auth_token', tokens.access_token, {
      httpOnly: false, // Allow frontend to read it for API calls
      secure: false,
      sameSite: 'lax', 
      maxAge: 60 * 60 * 24 * 7
    });

    console.log('Auth successful, user logged in:', user.email);
    return response;
    
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/?error=callback_failed', request.url));
  }
}