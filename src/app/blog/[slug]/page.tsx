// client/app/blog/[slug]/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogAPI, type Blog } from '@/lib/blogAPI';
import BlogCard from '@/components/blog/BlogCard';
import { Calendar, Clock, ArrowLeft, Loader2, ArrowUpRight } from 'lucide-react';
import SEOClient from '@/components/SEOClient';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlog = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const response = await blogAPI.getBlogBySlug(slug);
      const blogData = response.data.data;
      setBlog(blogData);
      
      const relatedRes = await blogAPI.getRelatedBlogs(blogData._id, 3);
      setRelatedBlogs(relatedRes.data.data || []);
    } catch (error) {
      console.error('Error fetching blog:', error);
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const createMarkup = (content: string) => {
    return { __html: content };
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-green-500" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Blog post not found.</p>
          <Link href="/blog" className="mt-4 inline-block text-green-500 hover:text-green-600 font-medium">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const getImageUrl = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const imagePath = blog.imageUrl || blog.image;
    if (imagePath?.startsWith('http')) return imagePath;
    return `${API_URL}${imagePath}`;
  };

  return (
    <>
      <SEOClient
        pageType="blog-post"
        blog={blog}
        defaultTitle="Big Taxi Tiruppur Blog"
        defaultDescription="Read our latest travel tips and updates"
      />

      <div className="min-h-screen pt-16 bg-white">
        {/* Back Button */}
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            data-umami-event="blog_back_click"
            data-umami-event-location="blog_post_top"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>

        {/* Blog Content - Full Width */}
        <article className="max-w-full px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            {blog.category && (
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-600 text-sm font-semibold px-3 py-1.5 rounded-full">
                  {blog.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-gray-400" />
                {formatDate(blog.publishedAt || blog.createdAt)}
              </div>
              {blog.readTime > 0 && (
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-gray-400" />
                  {blog.readTime} min read
                </div>
              )}
            </div>

            {/* Featured Image */}
            {blog.image && (
              <div className="relative w-full aspect-video mb-8 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <Image
                  src={getImageUrl()}
                  alt={blog.imageAlt || blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
              </div>
            )}

            {/* Description */}
            {blog.description && (
              <div className="text-lg text-gray-700 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                {blog.description}
              </div>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    data-umami-event="blog_tag_click"
                    data-umami-event-tag={tag}
                    data-umami-event-location="blog_post"
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-green-500 hover:text-white transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Main Content */}
            <div 
              className="blog-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={createMarkup(blog.content)}
            />
          </div>
        </article>

        {/* Related Posts - Full Width */}
        {relatedBlogs.length > 0 && (
          <section className="bg-gray-50 py-12 w-full border-t border-gray-100">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Related Posts</h2>
                <Link
                  href="/blog"
                  data-umami-event="blog_view_all_click"
                  data-umami-event-location="blog_post_related"
                  className="text-green-500 hover:text-green-600 text-sm font-medium flex items-center gap-1"
                >
                  View All <ArrowUpRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCard key={relatedBlog._id} blog={relatedBlog} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Full Width */}
        <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-16 w-full">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready for Your Next Journey?
            </h2>
            <p className="text-gray-300 mb-6">
              Book your ride with Big Taxi Tiruppur for a safe, comfortable, and affordable travel experience.
            </p>
            <Link
              href="/booking"
              data-umami-event="cta_click"
              data-umami-event-location="blog_post_bottom"
              data-umami-event-text="Book Now"
              className="inline-block bg-green-500 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-green-600 shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all"
            >
              Book Now
            </Link>
          </div>
        </section>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .blog-content {
          word-wrap: break-word;
          color: #374151;
        }
        
        .blog-content > *:first-child {
          margin-top: 0;
        }
        
        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-content ul {
          list-style-type: disc;
        }
        
        .blog-content ol {
          list-style-type: decimal;
        }
        
        .blog-content li {
          margin: 0.5rem 0;
          line-height: 1.8;
        }
        
        .blog-content h1 {
          font-size: 2.25rem;
          font-weight: 800;
          margin: 2.5rem 0 1.25rem;
          color: #111827;
        }
        
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: #111827;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem;
          color: #1f2937;
        }
        
        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem;
          color: #1f2937;
        }
        
        .blog-content p {
          margin: 1.25rem 0;
          line-height: 1.8;
          color: #4b5563;
        }
        
        .blog-content strong {
          font-weight: 700;
          color: #111827;
        }
        
        .blog-content a {
          color: #f97316;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .blog-content a:hover {
          color: #ea580c;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #f97316;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
          background: #f9fafb;
          padding: 1rem 1.5rem;
          border-radius: 0 0.75rem 0.75rem 0;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }
        
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }
        
        .blog-content th,
        .blog-content td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem 1rem;
          text-align: left;
        }
        
        .blog-content th {
          background-color: #f9fafb;
          font-weight: 600;
        }
        
        .blog-content tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        .blog-content code {
          background-color: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 0.375rem;
          font-family: monospace;
          font-size: 0.875rem;
        }
        
        .blog-content pre {
          background-color: #1e293b;
          color: #e2e8f0;
          padding: 1.25rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }
        
        .blog-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
        
        .blog-content hr {
          margin: 2.5rem 0;
          border: 0;
          border-top: 2px solid #e5e7eb;
        }
      `}</style>
    </>
  );
}