'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      setLoading(true); // Loading when search begins
      router.push(`/?title=${encodeURIComponent(title)}`);
    } else {
      router.push('/'); // Clear the URL when input is empty
    }

    setTimeout(() => setLoading(false), 1000);
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

  // Clear URL & form using the close button
  const handleClear = () => {
    setTitle('');
    router.push('/');
  };

  return (
    <form
      onSubmit={handleSearch}
      className='flex flex-col md:flex-row gap-3 items-center bg-white px-5 md:py-4 py-8 rounded-lg md:w-10/12 w-full'
    >
      <div className='flex items-center w-full rounded-md relative'>
        <Search
          aria-hidden='true'
          className='h-6 w-6 text-blue-500 hidden md:block mr-2'
        />

        <input
          type='text'
          required
          placeholder='Search jobs by title'
          value={title}
          onChange={handleInputChange}
          className='w-full h-14 mt-2 md:mt-0 pl-4 md:pl-0 lg:pl-0 rounded-md border border-slate-500 outline-none md:border-none'
        />

        {title.trim() && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute right-5 text-blue-500 hover:text-gray-700 text-2xl'
          >
            ×
          </button>
        )}
      </div>

      <button
        type='submit'
        className={`h-14 px-6 sm:w-full md:w-2/12 rounded-md shadow-md flex items-center justify-center ${
          loading
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-[#EA5566] hover:bg-red-500 text-white'
        }`}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
