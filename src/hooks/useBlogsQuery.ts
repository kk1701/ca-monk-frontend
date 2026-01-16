import { useQuery } from '@tanstack/react-query';
import type { Blog, BlogResponse } from '@/types/blog';

const API_BASE_URL = 'http://localhost:3001';

const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  if (!response.ok) {
    throw new Error(`Failed to fetch blogs: ${response.statusText}`);
  }
  const data: Blog[] = await response.json();
  return data;
};

export const useBlogsQuery = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
  });
};

export const fetchBlogById = async (id: string | number): Promise<Blog> => {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch blog: ${response.statusText}`);
  }
  return response.json();
};

export const createBlog = async (blog: Omit<Blog, 'id'>): Promise<Blog> => {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    throw new Error(`Failed to create blog: ${response.statusText}`);
  }
  return response.json();
};
