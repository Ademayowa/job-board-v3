import Hero from '@/components/Hero';
import Jobs from '@/components/Jobs';
import BaseLayout from '@/components/layouts/BaseLayout';
import Pagination from '@/components/Pagination';
import Title from '@/components/Title';
import { PaginationApiResponse } from '@/types';

type SearchProps = {
  searchParams: {
    title?: string;
    page?: string;
  };
};

export const revalidate = 60; // Revalidate the entrire page every 60secs

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

async function fetchJobs(searchParams: {
  title?: string;
  page?: string;
}): Promise<PaginationApiResponse | null> {
  const query = new URLSearchParams({ ...searchParams, limit: '6' }).toString(); // Fetch 6 jobs per page

  try {
    const res = await fetch(`${API_URL}/jobs?${query}`);

    if (!res.ok) throw new Error('Failed to fetch jobs');

    return res.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return null;
  }
}

export default async function HomePage({ searchParams }: SearchProps) {
  const data = await fetchJobs(searchParams);

  if (!data) {
    // Handle API failure from the backend
    return (
      <>
        <Hero />
        <div className='py-10 flex justify-center'>
          <p className='text-lg text-[#707071]'>
            Service is temporarily down, please try again later. 🙏
          </p>
        </div>
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
          <div className='pt-10 pb-20'>
            <p className='text-lg text-[#707071]'>
              No jobs found for your search criteria
            </p>
          </div>
        )}
      </BaseLayout>
    </main>
  );
}
