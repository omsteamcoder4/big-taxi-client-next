import { Suspense } from 'react';
import BlogPageContent from './BlogPageContent';

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[rgb(255,140,0)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BlogPageContent />
    </Suspense>
  );
}