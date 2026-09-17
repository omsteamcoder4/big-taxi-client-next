import apiClient from './axiosConfig';

export interface SeoData {
  _id?: string;
  pageType: 'homepage' | 'about' | 'services' | 'fleet' | 'contact' | 'booking' | 'blog' | 'blog-post';
  pageIdentifier: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  businessHours: string;
  businessLatitude: string;
  businessLongitude: string;
  serviceArea: string[];
  robots: string;
  schemaType: string;
  headerScripts: string;
  footerScripts: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SeoResponse {
  success: boolean;
  data: SeoData | null;
  message?: string;
  timestamp?: number;
}

export interface SeoQueryParams {
  pageType?: string;
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: string | number | boolean | undefined;
}

// Cache for SEO data with TTL
const seoCache = new Map<string, { data: SeoData; timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds TTL for SEO data

export const seoAPI = {
  getByPage: async (pageType: string, identifier: string = 'default', forceRefresh: boolean = false): Promise<SeoResponse> => {
    const cacheKey = `${pageType}/${identifier}`;
    const now = Date.now();
    const cached = seoCache.get(cacheKey);

    if (!forceRefresh && cached && (now - cached.timestamp) < CACHE_TTL) {
      console.log(`📦 Using cached SEO for ${cacheKey}`);
      return { success: true, data: cached.data };
    }

    const url = `/seo/page/${pageType}/${identifier}`;

    try {
      const timestamp = Date.now();
      const response = await apiClient.get(`${url}?_cb=${timestamp}`);

      if (response.data?.success && response.data?.data) {
        seoCache.set(cacheKey, {
          data: response.data.data,
          timestamp: now
        });
      }

      return response.data as SeoResponse;
    } catch (error: any) {
      const status = error?.response?.status;

      // 400/404 = no SEO record for this page. Not a real error — just skip.
      if (status === 400 || status === 404) {
        console.warn(`[SEO] No SEO data for ${url} (HTTP ${status}). Skipping.`);
        return { success: false, data: null, message: `No SEO data (HTTP ${status})` };
      }

      // Anything else (500, network, etc.) is a real problem — log it loudly.
      console.error(`[SEO] Request failed for ${url}:`, error);
      return { success: false, data: null, message: 'Failed to fetch SEO data' };
    }
  },

  clearCache: (pageType?: string, identifier?: string) => {
    if (pageType && identifier) {
      const cacheKey = `${pageType}/${identifier}`;
      seoCache.delete(cacheKey);
      console.log(`🗑️ Cleared SEO cache for ${cacheKey}`);
    } else {
      seoCache.clear();
      console.log('🗑️ Cleared all SEO cache');
    }
  },

  getAll: async (params?: SeoQueryParams) => {
    const timestamp = Date.now();
    return apiClient.get('/seo', { params: { ...params, _cb: timestamp } });
  },

  createOrUpdate: async (seoData: FormData) => {
    return apiClient.post('/seo', seoData);
  },

  delete: async (id: string) => {
    return apiClient.delete(`/seo/${id}`);
  },

  bulkUpdate: async (seoEntries: Partial<SeoData>[]) => {
    return apiClient.post('/seo/bulk', { seoEntries });
  }
};

export default seoAPI;