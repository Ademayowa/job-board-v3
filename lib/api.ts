import { Job } from '@/types';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://job-board-v3.vercel.app';
// const API_URL = 'https://go-restapi-v2.onrender.com/jobs';

// const API_URL = 'http://localhost:8080/jobs';

// Fetch single job
export async function fetchJob(id: string): Promise<Job | null> {
  try {
    const response = await fetch(
      `https://go-restapi-v2.onrender.com/jobs/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Ensure fresh data for each request
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching job...:', error);
    return null;
  }
}

// Fetch all jobs
export async function fetchAllJobs(): Promise<Job[]> {
  try {
    const response = await fetch(`https://job-board-v3.vercel.app/api/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs...api route');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch jobs');
  }
}
