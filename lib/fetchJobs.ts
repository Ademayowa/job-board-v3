import { PaginationApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function fetchJobs(searchParams: {
  query?: string;
  page?: string;
}): Promise<PaginationApiResponse | null> {
  const query = new URLSearchParams({ ...searchParams, limit: '8' }).toString(); // Fetch 8 jobs per page

  try {
    const res = await fetch(`${API_URL}/jobs?${query}`);

    if (!res.ok) throw new Error('Failed to fetch jobs');

    return res.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return null;
  }
}
