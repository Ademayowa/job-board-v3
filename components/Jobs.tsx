import JobList from '@/components/JobList';
import { Job } from '@/types';

type Props = {
  jobs: Job[];
};

export default function Jobs({ jobs }: Props) {
  return (
    <>
      <JobList jobs={jobs} />
    </>
  );
}
