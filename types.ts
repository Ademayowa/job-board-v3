export type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  duties: string[];
  url?: string;
};

export type PaginationApiResponse = {
  data: Job[];
  meta: {
    current_page: number;
    total_pages: number;
    total: number;
    per_page: number;
  };
};
