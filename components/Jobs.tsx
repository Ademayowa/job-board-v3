import { fetchAllJobs } from '@/lib/api';
import JobList from '@/components/JobList';
import { Job } from '@/types';

export default async function Jobs() {
  try {
    const jobs: Job[] = await fetchAllJobs();

    if (jobs.length === 0) {
      return (
        <div className='mx-auto w-10/12 py-10'>
          <p className='text-center text-[#707071]'>No jobs available</p>
        </div>
      );
    }

    return <JobList jobs={jobs} />;
  } catch (error) {
    console.error('Error fetching jobs:', error);

    return (
      <div className='mx-auto w-10/12 py-10'>
        <p className='text-center text-red-600'>
          Failed to load jobs. Please try again later.
        </p>
      </div>
    );
  }
}
