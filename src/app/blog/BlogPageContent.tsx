'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BlogCard from '@/components/blog/BlogCard';
import { blogAPI, type Blog } from '@/lib/blogAPI';
import { Search, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import SEOClient from '@/components/SEOClient';

const POSTS_PER_PAGE = 9;

interface BlogQueryParams {
  page: number;
  limit: number;
  sort: string;
  category?: string;
  tag?: string;
  search?: string;
}

export default function BlogPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );
  const [selectedTag, setSelectedTag] = useState<string>(
    searchParams.get('tag') || ''
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('search') || ''
  );
  const [searchInput, setSearchInput] = useState(searchQuery);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params: BlogQueryParams = {
        page: currentPage,
        limit: POSTS_PER_PAGE,
        sort: '-publishedAt',
      };
      if (selectedCategory) params.category = selectedCategory;
      if (selectedTag) params.tag = selectedTag;
      if (searchQuery) params.search = searchQuery;

      const response = await blogAPI.getAllBlogs(params);
      const data = response.data;
      setBlogs(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedTag, searchQuery]);

  const fetchFilters = useCallback(async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        blogAPI.getBlogCategories(),
        blogAPI.getBlogTags(),
      ]);
      setCategories(categoriesRes.data.data || []);
      setTags(tagsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchFilters();
  }, [fetchBlogs, fetchFilters]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    if (searchQuery) params.set('search', searchQuery);
    if (currentPage > 1) params.set('page', currentPage.toString());

    const newUrl = params.toString() ? `/blog?${params.toString()}` : '/blog';
    router.replace(newUrl, { scroll: false });
  }, [selectedCategory, selectedTag, searchQuery, currentPage, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTag('');
    setSearchQuery('');
    setSearchInput('');
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCategory || selectedTag || searchQuery;
  const hasSidebarContent = categories.length > 0 || tags.length > 0;

  return (
    <>
      <SEOClient
        pageType="blog"
        defaultTitle="Blog - Big Taxi Tiruppur | Travel Tips & Updates"
        defaultDescription="Read our latest blog posts about travel tips, destination guides, and updates from Big Taxi Tiruppur. Stay informed for your next journey."
      />

      <div className="min-h-screen pt-16 bg-white">
        {/* Hero Section - Modern Minimal */}
        <section className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16 md:py-20 w-full overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-green-400 font-semibold text-sm tracking-widest uppercase mb-3 border border-green-400/30 px-4 py-1 rounded-full">
                Our Blog
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                Travel <span className="text-green-400">Insights</span> & Stories
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Discover travel tips, destination guides, and stories from the road
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <div className="sticky top-16 bg-white/95 backdrop-blur-md border-b border-gray-100 z-20">
          <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex-1 w-full sm:w-auto">
                <form onSubmit={handleSearch} className="flex gap-2 w-full sm:max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-5 py-2.5 rounded-xl hover:bg-green-600 transition-colors font-medium text-sm"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">Active filters:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                    #{selectedTag}
                    <button
                      onClick={() => setSelectedTag('')}
                      className="hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                    "{searchQuery}"
                    <button
                      onClick={() => { setSearchQuery(''); setSearchInput(''); }}
                      className="hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:text-red-600 ml-1 font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <section className="py-8 md:py-12 w-full">
          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Sidebar - Desktop */}
              {hasSidebarContent && (
                <aside className="hidden lg:block w-72 flex-shrink-0">
                  <div className="sticky top-24 space-y-6">
                    {/* Categories */}
                    {categories.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                          Categories
                        </h3>
                        <div className="space-y-1.5">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => {
                                setSelectedCategory(selectedCategory === category ? '' : category);
                                setCurrentPage(1);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl transition-all flex justify-between items-center text-sm ${
                                selectedCategory === category
                                  ? 'bg-green-500 text-white shadow-sm'
                                  : 'hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              <span>{category}</span>
                              {selectedCategory === category && <X size={14} />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                          Popular Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tags.slice(0, 15).map(({ tag }) => (
                            <button
                              key={tag}
                              onClick={() => {
                                setSelectedTag(selectedTag === tag ? '' : tag);
                                setCurrentPage(1);
                              }}
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                selectedTag === tag
                                  ? 'bg-green-500 text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </aside>
              )}

              {/* Blog Grid - Full Width */}
              <div className="flex-1 min-w-0">
                {/* Results Count */}
                {!loading && (
                  <div className="text-sm text-gray-500 mb-4">
                    Showing {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}
                  </div>
                )}

                {/* Cards - Full Width Grid */}
                {loading ? (
                  <div className="flex justify-center py-16">
                    <Loader2 className="w-10 h-10 animate-spin text-green-500" />
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg font-medium">No blog posts found</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 text-green-500 hover:text-green-600 font-medium"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                      <BlogCard key={blog._id} blog={blog} variant="default" />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-10 pt-6 border-t border-gray-100">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-xl border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      <ChevronLeft size={18} className="inline" /> Previous
                    </button>
                    <div className="flex items-center gap-2 px-4">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5) {
                          if (currentPage > 3) {
                            pageNum = currentPage - 2 + i;
                          }
                          if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                              currentPage === pageNum
                                ? 'bg-green-500 text-white shadow-sm'
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-xl border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Next <ChevronRight size={18} className="inline" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}