// client/lib/blogAPI.ts
import apiClient from './axiosConfig';

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  imageUrl: string;
  imageAlt: string;
  excerpt: string;
  author: {
    _id: string;
    name: string;
    username: string;
  };
  authorName: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  readTime: number;
  views: number;
  likes: string[];
  likesCount?: number;
  isLiked?: boolean;
  // SEO fields
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageUrl: string;
  // Timestamps
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogsResponse {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  data: Blog[];
}

export interface BlogResponse {
  success: boolean;
  data: Blog;
}

export interface CategoriesResponse {
  success: boolean;
  count: number;
  data: string[];
}

export interface TagsResponse {
  success: boolean;
  count: number;
  data: { tag: string; count: number }[];
}

export const blogAPI = {
  // =============== PUBLIC ROUTES ===============
  
  // GET /api/blogs - Get all published blogs with pagination
  getAllBlogs: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
    search?: string;
    sort?: string;
  }) => {
    return apiClient.get<BlogsResponse>('/blogs', { params });
  },
  
  // GET /api/blogs/:slug - Get blog by slug
  getBlogBySlug: (slug: string) => {
    return apiClient.get<BlogResponse>(`/blogs/${slug}`);
  },
  
  // GET /api/blogs/categories - Get all categories
  getBlogCategories: () => {
    return apiClient.get<CategoriesResponse>('/blogs/categories');
  },
  
  // GET /api/blogs/tags - Get all tags with counts
  getBlogTags: () => {
    return apiClient.get<TagsResponse>('/blogs/tags');
  },
  
  // GET /api/blogs/:id/related - Get related blogs
  getRelatedBlogs: (id: string, limit?: number) => {
    return apiClient.get<BlogsResponse>(`/blogs/${id}/related`, { params: { limit } });
  },
  
  // =============== PROTECTED ROUTES (require auth) ===============
  
  // POST /api/blogs/:id/like - Toggle like on blog
  toggleLike: (id: string) => {
    return apiClient.post<{ success: boolean; message: string; likesCount: number; isLiked: boolean }>(
      `/blogs/${id}/like`
    );
  },
};

export default blogAPI;