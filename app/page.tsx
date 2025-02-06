import Hero from '@/components/Hero';
import Jobs from '@/components/Jobs';
import BaseLayout from '@/components/layouts/BaseLayout';
import Pagination from '@/components/Pagination';
import fetchJobs from '@/lib/fetchJobs';
import Message from '@/components/Message';

type SearchProps = {
  searchParams: {
    query?: string;
    page?: string;
  };
};

export const revalidate = 60; // Revalidate the entrire page every 60secs

export default async function HomePage({ searchParams }: SearchProps) {
  const data = await fetchJobs(searchParams);

  if (!data) {
    // Handle API failure from the backend if the server is down
    return (
      <>
        <Hero />
        <Message
          className='py-16 flex justify-center'
          message='Service is temporarily down, please try again later.'
        />
      </>
    );
  }

  const { data: jobs, metadata } = data;

  return (
    <main>
      <Hero />

      <BaseLayout className='px-5'>
        {jobs?.length > 0 ? (
          <div className='my-20'>
            <p className='text-lg text-[#707071]'>
              {metadata?.total} jobs found
            </p>
            <Jobs jobs={jobs} />
            {/* <Pagination
              currentPage={metadata.current_page}
              totalPages={metadata.total_pages}
            /> */}
          </div>
        ) : (
          // Response for an unmatch job search to a user
          <Message className='py-16 text-center' message='No jobs found' />
        )}
      </BaseLayout>
    </main>
  );
}
