import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const config = {
      AUTH0_SECRET: process.env.AUTH0_SECRET ? 'SET' : 'MISSING',
      AUTH0_BASE_URL: process.env.AUTH0_BASE_URL ? 'SET' : 'MISSING',
      AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL ? 'SET' : 'MISSING',
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID ? 'SET' : 'MISSING',
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET ? 'SET' : 'MISSING',
    };
    
    return NextResponse.json({ 
      status: 'Auth0 configuration check',
      config 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}