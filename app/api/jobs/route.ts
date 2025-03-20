import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const sort = searchParams.get('sort') || '';
    const page = searchParams.get('page') || '1';

    let endpoint = `${API_URL}/jobs`;

    // Apply sorting if available
    if (sort === 'recent') {
      endpoint = `${API_URL}/jobs/recent`;
    } else if (sort === 'highest-salary') {
      endpoint = `${API_URL}/jobs/highest-salary`;
    } else if (sort === 'most-relevant') {
      endpoint = `${API_URL}/jobs`; // Get all jobs by default
    }

    // Build the query string
    const queryParams = new URLSearchParams();

    if (query) {
      queryParams.set('query', query);
    }

    if (page && page !== '1') {
      queryParams.set('page', page);
    }

    // Append query parameters if any exist
    const queryString = queryParams.toString();
    if (queryString) {
      endpoint += `?${queryString}`;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch jobs' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in jobs API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
