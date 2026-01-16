export interface Blog {
  id: string | number;
  title: string;
  description: string;
  category: string[];
  content: string;
  coverImage: string;
  date: string;
  author?: string;
}

export interface BlogResponse {
  blogs: Blog[];
  total?: number;
}
