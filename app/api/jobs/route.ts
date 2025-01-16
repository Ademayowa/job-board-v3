import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function GET(req: NextRequest) {
  try {
    // Make GET request to the external API
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the external API request failed
    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json(
        { error: 'Failed to fetch jobs', err },
        { status: 500 }
      );
    }

    // Respond with the fetched jobs if the API request was successful
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
}
