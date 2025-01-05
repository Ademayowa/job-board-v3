import { Job } from '@/types';
import Link from 'next/link';

async function fetchJob(id: string): Promise<Job | null> {
  try {
    const response = await fetch(`http://localhost:8080/jobs/${id}`, {
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
    console.error('Error fetching job:', error);
    return null;
  }
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await fetchJob(params.id);

  if (!job) {
    return (
      <div className='mx-auto w-10/12 py-10'>
        <h1 className='text-2xl font-bold text-center mb-6'>Job Details</h1>
        <div className='rounded-lg shadow-lg p-6 bg-white text-center'>
          <h2 className='text-xl font-semibold text-red-600'>
            Job cannot be found
          </h2>
          <p className='mt-4 text-gray-600'>
            It seems the job you're looking for does not exist or the server is
            currently unavailable.
          </p>
          <Link href='/'>Go Back Home</Link>
        </div>
      </div>
    );
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
