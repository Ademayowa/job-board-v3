import { Job } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

// Fetch single job
export async function fetchJob(id: string): Promise<Job | null> {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching job', error);
    return null;
  }
}

// Fetch all jobs
export async function fetchAllJobs(): Promise<Job[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch jobs');
  }
}
