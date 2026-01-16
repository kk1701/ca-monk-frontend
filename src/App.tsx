import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useBlogsQuery } from '@/hooks/useBlogsQuery';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import type { Blog } from '@/types/blog';

const queryClient = new QueryClient();

function AppContent() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const { data: blogs = [], isLoading, error } = useBlogsQuery();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Blog List */}
      <div className="w-[30%] bg-white border-r border-gray-200 shadow-sm overflow-hidden flex flex-col overflow-scroll">
        <div className="p-6 flex-1">
          <BlogList
            blogs={blogs}
            selectedBlog={selectedBlog}
            onSelectBlog={setSelectedBlog}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>

      {/* Right Panel - Blog Detail */}
      <div className="flex-1 bg-white overflow-hidden flex flex-col">
        <div className="p-8 overflow-y-auto flex-1">
          <BlogDetail blog={selectedBlog} isLoading={isLoading} />
        </div>
      </div>
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
