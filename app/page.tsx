import Hero from '@/components/Hero';
import Jobs from '@/components/Jobs';
import BaseLayout from '@/components/layouts/BaseLayout';
import Title from '@/components/Title';

// const API_URL = 'https://go-restapi-v2.onrender.com/jobs';

// const API_URL = 'http://localhost:8080';

async function fetchJobs(searchParams: { title?: string; location?: string }) {
  const query = new URLSearchParams(searchParams).toString();
  const res = await fetch(`https://go-restapi-v2.onrender.com/jobs?${query}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { title?: string; location?: string };
}) {
  const jobs = await fetchJobs(searchParams);

  return (
    <>
      <Hero />

      <BaseLayout>
        <div className='pt-20'>
          <Title title='Latest Jobs' />
        </div>

        <Jobs jobs={jobs} />
      </BaseLayout>
    </>
  );
}
