// hooks/useJobs.ts
import { useState, useEffect } from 'react';
import { Job } from '@/types';
import fetchMostRecentJobs from '@/lib/fetchMostRecentJobs';
import fetchHighestSalaryJobs from '@/lib/fetchHighestSalaryJobs';

export function useJobs(initialJobs: Job[], filter: string) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        let newJobs;
        switch (filter) {
          case 'most-recent':
            newJobs = await fetchMostRecentJobs();
            break;
          case 'highest-salary':
            newJobs = await fetchHighestSalaryJobs();
            break;
          default:
            newJobs = initialJobs;
        }
        setJobs(newJobs);
      } catch (error) {
        setError('Failed to fetch jobs');
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (filter) {
      fetchJobs();
    } else {
      setJobs(initialJobs);
    }
  }, [filter, initialJobs]);

  return { jobs, loading, error };
}
