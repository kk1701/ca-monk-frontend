import type { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
  isSelected: boolean;
  onClick: (blog: Blog) => void;
}

export const BlogCard = ({ blog, isSelected, onClick }: BlogCardProps) => {
  const categoryLabel = Array.isArray(blog.category)
    ? blog.category[0]
    : blog.category;

  return (
    <div
      onClick={() => onClick(blog)}
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full mb-2">
            {categoryLabel}
          </span>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-xs text-gray-600 mt-2 line-clamp-2">
            {blog.description}
          </p>
        </div>
      </div>
    </div>
  );
};
