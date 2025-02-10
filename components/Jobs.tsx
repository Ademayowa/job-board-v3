'use client';

import { useEffect, useState } from 'react';
import JobList from '@/components/JobList';
import JobFilter from '@/components/JobFilter';
import { Job } from '@/types';

type JobsProps = {
  initialJobs: Job[];
  filter: string;
};

export default function Jobs({ initialJobs, filter }: JobsProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/${filter}`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data.data || []);
      } catch (error) {
        console.error('Error fetching filtered jobs:', error);
      }
    };

    if (filter) {
      fetchFilteredJobs();
    } else {
      setJobs(initialJobs);
    }
  }, [filter, initialJobs]);

  return (
    <>
      <JobFilter filter={filter} />
      <JobList jobs={jobs} />
    </>
  );
}
