import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Add this

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    const sort = searchParams.get('sort') || '';
    
    let endpoint = `${API_URL}/jobs`;
    
    if (sort === 'recent') {
      endpoint = `${API_URL}/jobs/recent`;
    } else if (sort === 'highest-salary') {
      endpoint = `${API_URL}/jobs/highest-salary`;
    } else if (sort === 'most-relevant') {
      endpoint = `${API_URL}/jobs`;
    }
    
    if (query) {
      endpoint += `?query=${encodeURIComponent(query)}`;
    }
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // Add this
      next: { revalidate: 0 }, // Add this
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch jobs' },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Add cache control headers to response
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error in jobs API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
