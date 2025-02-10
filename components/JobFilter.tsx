// 'use client';

// type JobFilterProps = {
//   filter: string;
//   setFilter: (filter: string) => void;
// };

// export default function JobFilter({ filter, setFilter }: JobFilterProps) {
//   return (
//     <div className='mb-6'>
//       <select
//         className='p-2 border rounded-md w-full'
//         value={filter} // Controlled component
//         onChange={(e) => setFilter(e.target.value)}
//       >
//         <option value=''>Sort By</option>
//         <option value='most-recent'>Most Recent</option>
//         <option value='highest-salary'>Highest Salary</option>
//       </select>
//     </div>
//   );
// }

'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type JobFilterProps = {
  filter: string;
};

export default function JobFilter({ filter }: JobFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (selectedFilter: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedFilter) {
      params.set('sort', selectedFilter);
    } else {
      params.delete('sort');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='mb-6'>
      <select
        className='p-2 border rounded-md w-full'
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option value=''>Sort By</option>
        <option value='most-recent'>Most Recent</option>
        <option value='highest-salary'>Highest Salary</option>
      </select>
    </div>
  );
}
