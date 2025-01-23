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

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

async function fetchJobs(searchParams: {
  title?: string;
  page?: string;
}): Promise<PaginationApiResponse> {
  const query = new URLSearchParams({ ...searchParams, limit: '6' }).toString(); // Fetch 6 jobs per page

  const res = await fetch(`${API_URL}/jobs?${query}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) throw new Error('Failed to fetch jobs');

  return res.json();
}

export default async function HomePage({ searchParams }: SearchProps) {
  const data = await fetchJobs(searchParams);
  const { data: jobs, meta } = data;

  return (
    <main>
      <Hero />
      <BaseLayout className='px-5'>
        <div className='pt-20'>
          <Title title='Latest Jobs' />
        </div>

        {jobs?.length > 0 ? (
          <>
            <Jobs jobs={jobs} />
            <Pagination
              currentPage={meta.current_page}
              totalPages={meta.total_pages}
            />
          </>
        ) : (
          <div className='pt-5 pb-20'>
            <p className='text-lg text-[#707071]'>
              No jobs found for your search criteria
            </p>
          </div>
        )}
      </BaseLayout>
    </main>
  );
}
