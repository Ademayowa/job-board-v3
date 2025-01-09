'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      router.push(`/?title=${encodeURIComponent(title)}`);
    } else {
      router.push('/'); // Clear the URL when input is empty
    }
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setTitle(value);

      if (!value.trim()) {
        router.push('/'); // Clear the URL immediately when input is cleared
      }
    },
    [router]
  );

  return (
    <form
      onSubmit={handleSearch}
      className='flex flex-col md:flex-row gap-3 items-center bg-white px-5 md:py-5 py-8 rounded-lg md:w-10/12 w-full'
    >
      <div className='flex items-center w-full rounded-md'>
        <Search className='h-5 w-5 text-blue-500 hidden md:block mr-2' />

        <input
          type='text'
          placeholder='Search a job by title'
          value={title}
          onChange={handleInputChange}
          className='w-full h-14 rounded-md border border-slate-500 outline-none md:border-none'
        />
      </div>

      <button
        type='submit'
        className='h-14 px-6 sm:w-full md:w-2/12 bg-[#FF5555]  hover:bg-red-600 text-white rounded-md shadow-sm'
      >
        Search
      </button>
    </form>
  );
}
