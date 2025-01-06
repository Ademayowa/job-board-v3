import Link from 'next/link';
import { fetchJob } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Job } from '@/types';
import BaseLayout from '@/components/layouts/BaseLayout';
import { MapPin, DollarSign, ChevronsRight } from 'lucide-react';

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await fetchJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <section className='bg-[#F2F7FB]'>
      <BaseLayout>
        <div className='py-10 pb-10'>
          <div className='bg-white rounded-2xl drop-shadow-md w-full lg:w-10/12 mx-auto'>
            <div className='lg:px-10 px-6 py-10 pb-16'>
              <div>
                <h2 className='text-[#0F4A7B] text-lg md:text-2xl font-bold mt-2 capitalize'>
                  {job.Title}
                </h2>

                <div className='flex items-center pt-2'>
                  <MapPin className='w-5 h-5 text-blue-500' />
                  <p className='text-[#707071] mr-3'>{job.Location}</p>
                  <DollarSign className='w-5 h-5 text-blue-500' />
                  <p className='text-[#707071]'>{job.Salary}</p>
                </div>
              </div>
              <hr className='border-b border-red-200' />

              <div className='mt-5'>
                <h3 className='font-bold my-3 text-[#707071]'>Summary</h3>
                <p className='max-w-4xl sm:text-sm md:text-base text-[#707071] !leading-7'>
                  {job.Description}
                </p>

                <div className='max-w-4xl sm:text-sm md:text-base text-[#707071] !leading-7'>
                  <h3 className='font-bold !text-base my-3'>
                    Responsibilities
                  </h3>
                  {job.Duties.map((duty, index) => (
                    <ul key={index} className='flex items-center list-disc'>
                      <li>{duty}</li>
                    </ul>
                  ))}
                </div>

                <div className='flex mt-3'>
                  <button className='rounded bg-[#FF5555] px-10 py-4 text-white shadow-sm hover:bg-red-600'>
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </section>
  );
}
