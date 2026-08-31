// client/components/blog/BlogCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ChevronRight, ArrowUpRight } from 'lucide-react';
import type { Blog } from '@/lib/blogAPI';

interface BlogCardProps {
  blog: Blog;
  variant?: 'default' | 'compact' | 'featured' | 'list';
  showExcerpt?: boolean;
  showReadTime?: boolean;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  variant = 'default',
  showExcerpt = true,
  showReadTime = true,
  className = '',
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getImageUrl = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const imagePath = blog.imageUrl || blog.image;
    if (imagePath?.startsWith('http')) return imagePath;
    return `${API_URL}${imagePath}`;
  };

  // List variant - Horizontal layout
  if (variant === 'list') {
    return (
      <Link
        href={`/blog/${blog.slug}`}
        className={`group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 w-full ${className}`}
      >
        <div className="flex flex-col sm:flex-row gap-6 p-5">
          {/* Image */}
          <div className="relative w-full sm:w-64 h-48 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
            {blog.image && (
              <Image
                src={getImageUrl()}
                alt={blog.imageAlt || blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 256px"
              />
            )}
            {blog.category && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {blog.category}
              </span>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
              {showReadTime && blog.readTime > 0 && (
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {blog.readTime} min read
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-500 transition-colors mb-2 line-clamp-2">
              {blog.title}
            </h3>
            
            {showExcerpt && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {blog.excerpt || blog.description}
              </p>
            )}
            
            <div className="flex items-center text-green-500 font-semibold text-sm mt-3 group-hover:gap-2 transition-all">
              Read More <ArrowUpRight size={14} className="ml-1" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Compact variant - Small card
  if (variant === 'compact') {
    return (
      <Link
        href={`/blog/${blog.slug}`}
        className={`group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 w-full ${className}`}
      >
        <div className="flex items-start gap-4 p-4">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            {blog.image && (
              <Image
                src={getImageUrl()}
                alt={blog.imageAlt || blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="80px"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-500 transition-colors line-clamp-2">
              {blog.title}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Featured variant - Large hero card
  if (variant === 'featured') {
    return (
      <Link
        href={`/blog/${blog.slug}`}
        className={`group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 w-full ${className}`}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden bg-gray-100">
            {blog.image && (
              <Image
                src={getImageUrl()}
                alt={blog.imageAlt || blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            {blog.category && (
              <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {blog.category}
              </span>
            )}
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
              {showReadTime && blog.readTime > 0 && (
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {blog.readTime} min read
                </span>
              )}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-green-500 transition-colors mb-3 line-clamp-2">
              {blog.title}
            </h2>
            
            {showExcerpt && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {blog.excerpt || blog.description}
              </p>
            )}
            
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex items-center text-green-500 font-semibold group-hover:gap-2 transition-all">
              Read More <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant - Grid card
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 w-full h-full flex flex-col ${className}`}
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
        {blog.image && (
          <Image
            src={getImageUrl()}
            alt={blog.imageAlt || blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {blog.category && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {blog.category}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(blog.publishedAt || blog.createdAt)}
          </span>
          {showReadTime && blog.readTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {blog.readTime} min read
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-500 transition-colors mb-2 line-clamp-2">
          {blog.title}
        </h3>
        
        {showExcerpt && (
          <p className="text-gray-600 text-sm line-clamp-3 flex-1">
            {blog.excerpt || blog.description}
          </p>
        )}
        
        <div className="flex items-center text-green-500 font-semibold text-sm mt-4 group-hover:gap-2 transition-all">
          Read More <ArrowUpRight size={14} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;