import { fetchJob } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Job } from '@/types';
import Link from 'next/link';

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await fetchJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className='mx-auto w-10/12 py-10'>
      <h1 className='text-2xl font-bold text-center mb-6'>Job Details</h1>
      <div className='rounded-lg shadow-lg p-6 bg-white'>
        <h2 className='text-3xl font-semibold'>{job.Title}</h2>
        <p className='mt-4 text-gray-600'>{job.Description}</p>
        <div className='mt-6'>
          <p className='text-lg'>
            <span className='font-semibold'>Location:</span> {job.Location}
          </p>
          <p className='text-lg'>
            <span className='font-semibold'>Salary:</span> ${job.Salary}
          </p>
        </div>
      </div>
    </div>
  );
}
