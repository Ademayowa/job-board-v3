import { PaginationApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export default async function fetchJobs(searchParams: {
  query?: string;
  page?: string;
  sort?: string;
}): Promise<PaginationApiResponse | null> {
  const query = new URLSearchParams({
    ...searchParams,
    limit: '10',
  }).toString();

  try {
    const res = await fetch(`${API_URL}/jobs?${query}`);

    if (!res.ok) throw new Error('Failed to fetch jobs');

    const responseData = await res.json();

    return responseData;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return null;
  }
}
