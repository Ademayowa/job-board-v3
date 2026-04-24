import Link from "next/link";
import { Job } from "@/types";
import { DollarSign, MapPin } from "lucide-react";

type JobListProps = {
  jobs: Job[];
};

const formatSalary = (salary: number) => `${(salary / 1000).toFixed(0)}k/yr`;

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
      {jobs?.map((job) => (
        <Link
          key={job.id}
          href={`/job/${job.id}`}
          className="block rounded-2xl bg-white border border-gray-300 p-7 cardAnimation"
        >
          <div className="flex items-center">
            <h2 className="flex flex-1 text-[#0F4A7B] text-lg lg:text-xl font-bold capitalize">
              {job.title}
            </h2>
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex items-center pt-4 space-x-1">
              <MapPin className="w-5 h-5 text-[#62BECB] -ml-1" />
              <p className="text-[#707071] mr-2">{job.location}</p>
              <DollarSign className="w-5 h-5 text-[#62BECB]" />
              <p className="text-[#707071]">{formatSalary(job.salary)}</p>
            </div>
          </div>

          <p className="text-[#707071] mt-5 !w-full md:w-4/5 leading-8 line-clamp-3">
            {job.description}
          </p>
          <div className="flex mt-3">
            <button className="rounded-md bg-[#EA5566] px-5 py-3 text-white shadow-md hover:bg-red-500">
              view job
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
