import Link from 'next/link';
import { fetchJob } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Job } from '@/types';
import BaseLayout from '@/components/layouts/BaseLayout';
import { MapPin, CircleDollarSign, ChevronsRight } from 'lucide-react';

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await fetchJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <section className='bg-[#F2F7FB]'>
      <BaseLayout>
        <div className='py-10 pb-10'>
          <div className='mt-20 lg:mt-24 bg-white rounded-2xl drop-shadow-md'>
            <div className='lg:px-8 px-6 py-10 pb-16'>
              <div>
                <h2 className='text-blueColor text-lg md:text-2xl font-bold mt-2'>
                  {job.Title}
                </h2>

                <div className='flex items-center mt-2 space-x-2'>
                  <MapPin className='w-5 h-5 text-blue-500' />
                  <p className='text-grayColor'>{job.Location}</p>
                </div>

                <div className='flex items-center my-2 space-x-2'>
                  <CircleDollarSign className='w-5 h-5 text-blue-500' />
                  <p className='text-grayColor'>{job.Salary}</p>
                </div>
              </div>
              <hr className='border-b border-red-200' />

              <div className='mt-5'>
                <h3 className='font-bold my-3 text-grayColor'>Summary</h3>
                <p className='max-w-4xl sm:text-sm md:text-base text-grayColor !leading-7'>
                  {job.Description}
                </p>

                <div className='max-w-4xl sm:text-sm md:text-base text-grayColor !leading-7'>
                  <h3 className='font-bold !text-base my-3'>
                    Responsibilities
                  </h3>
                  {job.Duties.map((duty, index) => (
                    <ul key={index} className='flex items-center list-disc'>
                      {/* <ChevronsRight /> */}
                      <li>{duty}</li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </section>
  );
}
