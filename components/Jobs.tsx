import { Job } from '@/types';
import JobList from '@/components/JobList';

const BASE_URL = 'http://localhost:3000';
async function fetchAllJobs(): Promise<Job[]> {
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

async function Jobs() {
  let jobs: Job[] = [];

  try {
    jobs = await fetchAllJobs();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className='mx-auto w-10/12 py-10'>
      <h1 className='text-2xl font-bold text-center mb-6'>Available Jobs</h1>
      {jobs.length === 0 ? (
        <p className='text-center text-gray-600'>No jobs available</p>
      ) : (
        <JobList jobs={jobs} />
      )}
    </div>
  );
}

export default Jobs;
