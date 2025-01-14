import { Job } from '@/types';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://job-board-v3.vercel.app/';
const API_URL = 'https://go-restapi-prod.onrender.com';

// const API_URL = 'http://localhost:8080';

// Fetch single job
export async function fetchJob(id: string): Promise<Job | null> {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data for each request
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
      cache: 'no-store', // Ensure fresh data on each request
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
