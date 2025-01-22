import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchJob } from '@/lib/api';
import { MapPin, DollarSign, ChevronLeft } from 'lucide-react';
import BaseLayout from '@/components/layouts/BaseLayout';
import { Button } from '@/components/ui/button';

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

// Generate metadata for job title
export async function generateMetadata({ params }: Props) {
  const { id } = params;
  const job = await fetchJob(id);

  if (job) {
    return {
      title: `${job.title}`,
    };
  }
}

export default async function JobPage({ params }: Props) {
  const { id, slug } = params;
  const job = await fetchJob(id);

  if (!job) {
    notFound();
  }

  // Validate slug
  const expectedSlug = job.title.toLowerCase().replace(/\s+/g, '-');
  if (slug !== expectedSlug) {
    notFound();
  }

  return (
    <section className='bg-[#F2F7FB]'>
      <BaseLayout>
        <div className='py-10 pb-10'>
          <div className='bg-white rounded-2xl drop-shadow-md w-full lg:w-10/12 mx-auto'>
            <div className='lg:px-10 px-6'>
              <Button variant='ghost' asChild>
                <Link
                  href='/'
                  className='text-[#707071] mt-7 !text-sm -ml-1 hover:text-[#0F4A7B] hover:underline'
                >
                  <ChevronLeft /> Back to jobs
                </Link>
              </Button>
            </div>

            <div className='lg:px-10 px-6 pb-14'>
              <div>
                <h2 className='text-[#0F4A7B] text-2xl font-bold ml-1 capitalize mt-2'>
                  {job.title}
                </h2>

                <div className='flex items-center pt-4 pb-3'>
                  <MapPin className='w-5 h-5 text-blue-500 mr-1' />
                  <p className='text-[#707071] mr-3'>{job.location}</p>
                  <DollarSign className='w-5 h-5 text-blue-500' />
                  <p className='text-[#707071]'>{job.salary}</p>
                </div>
              </div>
              <hr className='border-b border-red-200' />

              <div className='mt-7'>
                <h3 className='font-bold my-5 text-lg text-[#707071]'>
                  Summary
                </h3>
                <p className='max-w-3xl text-[#707071] leading-loose'>
                  {job.description}
                </p>

                <div className='max-w-3xl text-[#707071] leading-loose'>
                  <h3 className='font-bold text-lg mt-10 mb-5'>
                    Responsibilities
                  </h3>
                  {job.duties.map((duty, index) => (
                    <ul
                      key={index}
                      className='flex items-center pl-4 list-disc'
                    >
                      <li>{duty}</li>
                    </ul>
                  ))}
                </div>

                <Button
                  asChild
                  className='mt-5 bg-[#FF5555] text-white shadow-sm hover:bg-red-600'
                >
                  <Link target='_blank' href={`${job.url}`}>
                    Apply for this position
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </section>
  );
}
