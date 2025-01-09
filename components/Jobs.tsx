import JobList from '@/components/JobList';
import { Job } from '@/types';

type Props = {
  jobs: Job[];
};

export default function Jobs({ jobs }: Props) {
  return (
    <>
      {jobs?.length === 0 ? (
        <p className='text-center text-[#707071]'>No jobs found</p>
      ) : (
        <JobList jobs={jobs} />
      )}
    </>
  );
}
