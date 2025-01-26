import Hero from '@/components/Hero';
import Jobs from '@/components/Jobs';
import BaseLayout from '@/components/layouts/BaseLayout';
import Pagination from '@/components/Pagination';
import fetchJobs from '@/lib/fetchJobs';
import Message from '@/components/Message';

type SearchProps = {
  searchParams: {
    title?: string;
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
          className='py-10 flex justify-center'
          message='Service is temporarily down, please try again later.'
        />
      </>
    );
  }

  const { data: jobs, meta } = data;

  return (
    <main>
      <Hero />

      <BaseLayout className='px-5'>
        {jobs?.length > 0 ? (
          <div className='mt-20'>
            <Jobs jobs={jobs} />
            <Pagination
              currentPage={meta.current_page}
              totalPages={meta.total_pages}
            />
          </div>
        ) : (
          // Response for an unmatch job search to a user
          <Message
            className='pt-10 pb-20'
            message='No jobs found for your search criteria'
          />
        )}
      </BaseLayout>
    </main>
  );
}
