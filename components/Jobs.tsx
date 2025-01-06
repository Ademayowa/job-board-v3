import { fetchAllJobs } from '@/lib/api';
import JobList from '@/components/JobList';
import { Job } from '@/types';

async function Jobs() {
  let jobs: Job[] = [];

  try {
    jobs = await fetchAllJobs();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Fallback to an empty array in case of an error
    jobs = [];
  }

  return (
    <div className='mx-auto w-10/12 py-10'>
      <h1 className='text-2xl font-bold text-center mb-6'>Available Jobs</h1>
      {jobs?.length === 0 ? (
        <p className='text-center text-gray-600'>No jobs available</p>
      ) : (
        <JobList jobs={jobs} />
      )}
    </div>
  );
}

export default Jobs;
