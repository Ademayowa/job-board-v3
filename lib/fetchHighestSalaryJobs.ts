export default async function fetchHighestSalaryJobs() {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/jobs/highest-salary`;
  console.log('Fetching highest salary jobs from:', API_URL);

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      credentials: 'include', // Include cookies/auth credentials
      headers: {
        'Content-Type': 'application/json', // Ensures JSON response handling
        Accept: 'application/json', // Ensures the server responds with JSON
      },
    });

    if (!response.ok)
      throw new Error(`Failed to fetch: ${response.statusText}`);

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching highest salary jobs:', error);
    return [];
  }
}
