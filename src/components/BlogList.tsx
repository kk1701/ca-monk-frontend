import type { Blog } from '@/types/blog';
import { BlogCard } from './BlogCard';

interface BlogListProps {
  blogs: Blog[];
  selectedBlog: Blog | null;
  onSelectBlog: (blog: Blog) => void;
  isLoading: boolean;
  error: Error | null;
}

const LoadingSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="p-4 rounded-lg bg-gray-100 animate-pulse space-y-2"
      >
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
      </div>
    ))}
  </div>
);

const ErrorMessage = ({ error }: { error: Error }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-800 font-semibold">Error loading blogs</p>
    <p className="text-red-600 text-sm mt-1">{error.message}</p>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-48 text-center">
    <p className="text-gray-500 text-sm">No blogs found</p>
  </div>
);

export const BlogList = ({
  blogs,
  selectedBlog,
  onSelectBlog,
  isLoading,
  error,
}: BlogListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Blogs</h2>
        {blogs.length > 0 && (
          <p className="text-xs text-gray-500">{blogs.length} blogs available</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : blogs.length === 0 ? (
          <EmptyState />
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              isSelected={selectedBlog?.id === blog.id}
              onClick={onSelectBlog}
            />
          ))
        )}
      </div>
    </div>
  );
};
