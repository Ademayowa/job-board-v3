import { PaginationApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function fetchJobs(searchParams: {
  query?: string;
  page?: string;
}): Promise<PaginationApiResponse | null> {
  // Fetch 10 jobs per page
  const query = new URLSearchParams({
    ...searchParams,
    limit: '10',
  }).toString();

  try {
    const res = await fetch(`${API_URL}/jobs?${query}`);

    if (!res.ok) throw new Error('Failed to fetch jobs');

    return res.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return null;
  }
}
