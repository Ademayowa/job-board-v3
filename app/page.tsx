import Hero from '@/components/Hero';
import Jobs from '@/components/Jobs';

export default function HomePage() {
  return (
    <>
      <Hero
        title='The easiest way to Get your golang dream job is here'
        description='Searching and finding your dream job is now easier. Browse latest jobs and apply with ease on our platform. All jobs posted on our platform are verified.'
      />
      <Jobs />
    </>
  );
}
