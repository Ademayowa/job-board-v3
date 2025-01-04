import { Job } from '@/types';

export default function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {jobs.map((job) => (
        <div key={job.ID} className='rounded-lg shadow-lg p-6'>
          <h2 className='text-xl font-semibold'>{job.Title}</h2>
          <p className='mt-2'>{job.Description}</p>
          <div className='mt-4'>
            <p className='text-sm font-medium'>
              <span className='font-semibold'>Location:</span> {job.Location}
            </p>
            <p className='text-sm font-medium'>
              <span className='font-semibold'>Salary:</span> ${job.Salary}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
