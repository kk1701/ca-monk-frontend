import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useBlogsQuery } from '@/hooks/useBlogsQuery';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import { CreateBlogModal } from '@/components/CreateBlogModal';
import type { Blog } from '@/types/blog';

const queryClient = new QueryClient();

function AppContent() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: blogs = [], isLoading, error } = useBlogsQuery();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Blog List */}
      <div className="w-[30%] bg-white border-r border-gray-200 shadow-sm overflow-scroll flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Blogs</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Blog
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <BlogList
              blogs={blogs}
              selectedBlog={selectedBlog}
              onSelectBlog={setSelectedBlog}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Blog Detail */}
      <div className="flex-1 bg-white overflow-hidden flex flex-col">
        <div className="p-8 overflow-y-auto flex-1">
          <BlogDetail blog={selectedBlog} isLoading={isLoading} />
        </div>
      </div>

      {/* Create Blog Modal */}
      <CreateBlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
