import { Job } from "@/types";

const API_URL = process.env.API_URL as string;

export async function fetchJob(id: string): Promise<Job | null> {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    console.error("Error fetching job", error);
    return null;
  }
}
