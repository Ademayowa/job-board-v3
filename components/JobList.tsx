import Link from 'next/link';
import { Job } from '@/types';
import { MapPin } from 'lucide-react';

type Props = {
  jobs: Job[];
};

export default function JobList({ jobs }: Props) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 pb-20'>
      {jobs.map((job) => (
        <Link
          key={job.ID}
          href={`/job/${job.ID}`}
          className='rounded-lg shadow-md bg-white p-7 cardAnimation'
        >
          <div className='flex items-center'>
            <h3 className='flex flex-1 text-[#0F4A7B] text-lg font-bold'>
              {job.Title}
            </h3>
            <p className='text-[#0F4A7B] font-bold'>${job.Salary}</p>
          </div>

          <div className='flex items-center space-x-1 mt-2'>
            <MapPin className='h-5 w-5 text-sky-500 -ml-1' />
            <p className='text-[#707071]'>{job.Location}</p>
          </div>

          <p className='text-[#707071] mt-5 !w-full md:w-4/5 leading-8 line-clamp-3'>
            {job.Description}
          </p>

          <div className='flex mt-2.5'>
            <button className='rounded bg-[#FF5555] px-5 py-2.5 text-white shadow-sm hover:bg-red-600'>
              View job
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
