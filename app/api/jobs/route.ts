import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const sort = searchParams.get('sort') || '';

    let endpoint = `${API_URL}/jobs`;

    // Apply sorting if available
    if (sort === 'most-recent') {
      endpoint = `${API_URL}/jobs/recent`;
    } else if (sort === 'highest-salary') {
      endpoint = `${API_URL}/jobs/highest-salary`;
    } else if (sort === 'all-jobs') {
      endpoint = `${API_URL}/jobs`; // Get all jobs by default
    }

    // Append search query if provided
    if (query) {
      endpoint += `?query=${encodeURIComponent(query)}`;
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
