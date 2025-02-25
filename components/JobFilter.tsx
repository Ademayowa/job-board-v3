'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function JobFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') || '';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;

    // Preserve the existing query search in the form when a dropdown is selected
    const params = new URLSearchParams(window.location.search);

    if (newSort) {
      params.set('sort', newSort);
    }

    router.push(`/?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <>
      <select
        className='border p-2 rounded-md lg:text-lg text-[#707071]'
        onChange={handleSortChange}
        value={currentSort}
      >
        <option value=''>Sort By</option>
        <option value='most-recent'>Most Recent</option>
        <option value='highest-salary'>Highest Salary</option>
      </select>
    </>
  );
}
