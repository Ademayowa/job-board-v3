export default async function fetchMostRecentJobs() {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/jobs/recent`;
  console.log('Fetching most recent jobs from:', API_URL);

  try {
    const response = await fetch(API_URL, { credentials: 'include' });

    if (!response.ok)
      throw new Error(`Failed to fetch: ${response.statusText}`);

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching most recent jobs:', error);
    return [];
  }
}
