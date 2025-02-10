// app/api/jobs/[filter]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: { filter: string } }
) {
  try {
    let endpoint = `${API_URL}/jobs`;

    // Determine the endpoint based on the filter
    switch (params.filter) {
      case 'most-recent':
        endpoint = `${API_URL}/jobs/recent`;
        break;
      case 'highest-salary':
        endpoint = `${API_URL}/jobs/highest-salary`;
        break;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
