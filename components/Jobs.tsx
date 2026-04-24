"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import JobList from "./JobList";
import Message from "./Message";
import Loading from "./Loading";

type JobsProps = {
  initialJobs: any[];
  filter: string;
  searchQuery: string;
};

export default function Jobs({ initialJobs }: JobsProps) {
  const [jobs, setJobs] = useState<any[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const sortFilter = searchParams.get("sort") || "";

  useEffect(() => {
    if (!searchQuery && !sortFilter) {
      setJobs(initialJobs);
      return;
    }

    const fetchFilteredJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set("query", searchQuery);
        if (sortFilter) params.set("sort", sortFilter);

        const response = await fetch(`/api/jobs?${params.toString()}`, {
          cache: "no-store",
        });

        const data = await response.json();
        setJobs(Array.isArray(data) ? data : data?.data || []);
      } catch (error) {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredJobs();
  }, [searchQuery, sortFilter, initialJobs]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : jobs.length > 0 ? (
        <JobList jobs={jobs} />
      ) : (
        <Message className="text-center" message="No jobs found" />
      )}
    </>
  );
}
