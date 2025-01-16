import Hero from '@/components/Hero';
import Jobs from '@/components/Jobs';
import BaseLayout from '@/components/layouts/BaseLayout';
import Title from '@/components/Title';

type SearchProps = {
  searchParams: {
    title?: string;
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

async function fetchJobs(searchParams: { title?: string }) {
  const query = new URLSearchParams(searchParams).toString();

  const res = await fetch(`${API_URL}/jobs?${query}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export default async function HomePage({ searchParams }: SearchProps) {
  const jobs = await fetchJobs(searchParams);

  return (
    <>
      <Hero />

      <BaseLayout>
        <div className='pt-20'>
          <Title title='Latest Jobs' />
        </div>

        {jobs?.length > 0 ? (
          <Jobs jobs={jobs} />
        ) : (
          <div className='text-center py-20'>
            <p className='text-xl font-semibold text-[#707071]'>
              No jobs found matching your search criteria
            </p>
          </div>
        )}
      </BaseLayout>
    </>
  );
}
