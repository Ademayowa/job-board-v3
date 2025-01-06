import { Job } from '@/types';
import Link from 'next/link';

export default function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {jobs?.map((job) => (
        <Link
          key={job.ID}
          href={`/job/${job.ID}`}
          className='rounded-lg p-6 shadow-md bg-white block'
        >
          <div>
            <h2 className='text-xl font-semibold'>{job.Title}</h2>
            <p className='mt-2 line-clamp-2'>{job.Description}</p>
            <div className='mt-4'>
              <p className='text-sm font-medium'>
                <span className='font-semibold'>Location:</span> {job.Location}
              </p>
              <p className='text-sm font-medium'>
                <span className='font-semibold'>Salary:</span> ${job.Salary}
              </p>
              {/* <div className='text-sm font-medium'>
                {job?.Duties?.map((duty, index) => (
                  <div key={index}>
                    <p>{duty}</p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
