import type { Blog } from '@/types/blog';

interface BlogDetailProps {
  blog: Blog | null;
  isLoading: boolean;
}

const EmptyDetailState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <p className="text-gray-500">Select a blog to view details</p>
  </div>
);

const LoadingDetail = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-64 bg-gray-300 rounded-lg"></div>
    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
      ))}
    </div>
  </div>
);

export const BlogDetail = ({ blog, isLoading }: BlogDetailProps) => {
  if (isLoading) return <LoadingDetail />;
  if (!blog) return <EmptyDetailState />;

  const categoryTags = Array.isArray(blog.category)
    ? blog.category
    : [blog.category];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Cover Image */}
      <div className="mb-6">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/800x300?text=Blog+Cover';
          }}
        />
      </div>

      {/* Title and Meta */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {categoryTags.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {blog.title}
        </h1>
        {blog.date && (
          <p className="text-xs text-gray-500">
            {new Date(blog.date).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <p className="text-gray-700 leading-relaxed">
          {blog.description}
        </p>
      </div>

      {/* Full Content */}
      <div className="prose prose-sm max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-normal text-sm">
          {blog.content}
        </div>
      </div>
    </div>
  );
};
