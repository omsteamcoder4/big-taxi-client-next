// client/src/components/SEOClient.tsx
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { seoAPI } from '@/lib/seoAPI';
import apiClient from '@/lib/axiosConfig';

interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  metaKeywords?: string | string[];
  canonicalUrl?: string;
  robots?: string;
  headerScripts?: string;
}

interface BlogData {
  metaTitle?: string;
  title?: string;
  metaDescription?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
  ogImage?: string;
  imageUrl?: string;
  image?: string;
  status?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  author?: { name?: string };
  tags?: string[];
  category?: string;
  metaKeywords?: string | string[];
  canonicalUrl?: string;
}

interface SEOClientProps {
  pageType: 'homepage' | 'about' | 'services' | 'fleet' | 'contact' | 'booking' | 'blog' | 'blog-post' | 'packages';
  slug?: string;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  blog?: BlogData; // For blog posts
  defaultTitle: string;
  defaultDescription: string;
  forceRefresh?: boolean;
}

export default function SEOClient({ 
  pageType, 
  customTitle, 
  customDescription, 
  customImage, 
  blog,
  defaultTitle, 
  defaultDescription, 
  forceRefresh = false 
}: SEOClientProps) {
  const fetchInProgress = useRef(false);
  const lastFetchRef = useRef<number>(0);
  const initialLoadDone = useRef(false);

  const updateSEOTags = useCallback((seoData: SEOData | null) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    // For blog posts, use blog data instead of seoData
    const isBlogPost = pageType === 'blog-post' && blog;
    
    // Determine final SEO values
    const finalTitle = customTitle || (isBlogPost ? blog?.metaTitle || blog?.title : seoData?.metaTitle) || defaultTitle;
    const finalDescription = customDescription || (isBlogPost ? blog?.metaDescription || blog?.description : seoData?.metaDescription) || defaultDescription;
    const finalOgTitle = customTitle || (isBlogPost ? blog?.ogTitle || blog?.title : seoData?.ogTitle || seoData?.metaTitle) || defaultTitle;
    const finalOgDescription = customDescription || (isBlogPost ? blog?.ogDescription || blog?.description : seoData?.ogDescription || seoData?.metaDescription) || defaultDescription;
    const finalKeywords = isBlogPost ? blog?.metaKeywords : seoData?.metaKeywords;
    const finalCanonicalUrl = isBlogPost ? blog?.canonicalUrl : seoData?.canonicalUrl;
    const finalOgImage = customImage || (isBlogPost ? blog?.ogImageUrl || blog?.ogImage || blog?.imageUrl || blog?.image : seoData?.ogImage);
    const finalRobots = isBlogPost ? (blog?.status === 'published' ? 'index,follow' : 'noindex,nofollow') : seoData?.robots;
    
    // Update document title
    if (finalTitle) {
      document.title = finalTitle;
    }
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDescription);
    
    // Update or create meta keywords
    if (finalKeywords && finalKeywords.length) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', Array.isArray(finalKeywords) ? finalKeywords.join(', ') : finalKeywords);
    } else {
      const existingKeywords = document.querySelector('meta[name="keywords"]');
      if (existingKeywords) existingKeywords.remove();
    }
    
    // Update or create canonical URL
    if (finalCanonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', finalCanonicalUrl);
    } else {
      // Use current URL as canonical if not specified
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', typeof window !== 'undefined' ? window.location.href : '');
    }
    
    // Update OG:Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', finalOgTitle);
    
    // Update OG:Description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', finalOgDescription);
    
    // Update OG:Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', isBlogPost ? 'article' : 'website');
    
    // Update OG:Site Name
    let ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!ogSiteName) {
      ogSiteName = document.createElement('meta');
      ogSiteName.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute('content', 'Big Taxi Tiruppur');
    
    // Update OG:Image with cache busting
    if (finalOgImage && finalOgImage.trim() && finalOgImage !== 'null' && finalOgImage !== 'undefined') {
      let imageUrl = finalOgImage;
      if (!imageUrl.startsWith('http')) {
        imageUrl = `${API_URL}${imageUrl}`;
      }
      const cacheBuster = `?t=${Date.now()}`;
      imageUrl = imageUrl.includes('?') ? `${imageUrl}&cb=${Date.now()}` : `${imageUrl}${cacheBuster}`;
      
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', imageUrl);
    } else {
      const existingOgImage = document.querySelector('meta[property="og:image"]');
      if (existingOgImage) existingOgImage.remove();
    }
    
    // For blog posts, add article specific meta tags
    if (isBlogPost && blog) {
      // Article published time
      let articlePublishedTime = document.querySelector('meta[property="article:published_time"]');
      if (!articlePublishedTime) {
        articlePublishedTime = document.createElement('meta');
        articlePublishedTime.setAttribute('property', 'article:published_time');
        document.head.appendChild(articlePublishedTime);
      }
      articlePublishedTime.setAttribute('content', blog.publishedAt || blog.createdAt || new Date().toISOString());
      
      // Article modified time
      let articleModifiedTime = document.querySelector('meta[property="article:modified_time"]');
      if (!articleModifiedTime) {
        articleModifiedTime = document.createElement('meta');
        articleModifiedTime.setAttribute('property', 'article:modified_time');
        document.head.appendChild(articleModifiedTime);
      }
      articleModifiedTime.setAttribute('content', blog.updatedAt || blog.publishedAt || blog.createdAt || new Date().toISOString());
      
      // Article author
      let articleAuthor = document.querySelector('meta[property="article:author"]');
      if (!articleAuthor) {
        articleAuthor = document.createElement('meta');
        articleAuthor.setAttribute('property', 'article:author');
        document.head.appendChild(articleAuthor);
      }
      articleAuthor.setAttribute('content', blog.authorName || blog.author?.name || 'Admin');
      
      // Article tags
      if (blog.tags && blog.tags.length) {
        // Remove existing article:tag meta tags
        const existingTags = document.querySelectorAll('meta[property="article:tag"]');
        existingTags.forEach(tag => tag.remove());
        
        // Add new tags
        blog.tags.forEach((tag: string) => {
          const articleTag = document.createElement('meta');
          articleTag.setAttribute('property', 'article:tag');
          articleTag.setAttribute('content', tag);
          document.head.appendChild(articleTag);
        });
      }
      
      // Article section (category)
      if (blog.category) {
        let articleSection = document.querySelector('meta[property="article:section"]');
        if (!articleSection) {
          articleSection = document.createElement('meta');
          articleSection.setAttribute('property', 'article:section');
          document.head.appendChild(articleSection);
        }
        articleSection.setAttribute('content', blog.category);
      }
    } else {
      // Remove article-specific meta tags for non-blog pages
      const articleTags = document.querySelectorAll('meta[property^="article:"]');
      articleTags.forEach(tag => tag.remove());
    }
    
    // Update Twitter Cards
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');
    
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', finalOgTitle);
    
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', finalOgDescription);
    
    if (finalOgImage && finalOgImage.trim() && finalOgImage !== 'null' && finalOgImage !== 'undefined') {
      let imageUrl = finalOgImage;
      if (!imageUrl.startsWith('http')) {
        imageUrl = `${API_URL}${imageUrl}`;
      }
      let twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (!twitterImage) {
        twitterImage = document.createElement('meta');
        twitterImage.setAttribute('name', 'twitter:image');
        document.head.appendChild(twitterImage);
      }
      twitterImage.setAttribute('content', imageUrl);
    } else {
      const existingTwitterImage = document.querySelector('meta[name="twitter:image"]');
      if (existingTwitterImage) existingTwitterImage.remove();
    }
    
    // Update robots meta
    if (finalRobots) {
      let robots = document.querySelector('meta[name="robots"]');
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', finalRobots);
    }
    
    // Update header scripts (only for non-blog pages)
    if (!isBlogPost && seoData?.headerScripts && seoData.headerScripts.trim()) {
      const payload = seoData.headerScripts.trim();

      // Remove any previously injected header scripts before re-injecting.
      document.querySelectorAll('[data-seo-header-script]').forEach(el => el.remove());

      // Case 1: payload is a full HTML snippet containing <script> tags.
      // Parse it with DOMParser, then import the nodes into document.head.
      // Imported <script> nodes DO execute (unlike innerHTML).
      const containsScriptTags = /<script[\s>]/i.test(payload);

      if (containsScriptTags) {
        try {
          const doc = new DOMParser().parseFromString(
            `<!DOCTYPE html><html><head>${payload}</head></html>`,
            'text/html',
          );

          doc.head.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            // Copy every attribute (src, async, defer, type, data-*, etc.)
            for (const attr of Array.from(oldScript.attributes)) {
              newScript.setAttribute(attr.name, attr.value);
            }
            // Inline body vs external src
            if (!oldScript.src && oldScript.textContent) {
              newScript.textContent = oldScript.textContent;
            }
            newScript.setAttribute('data-seo-header-script', 'true');
            document.head.appendChild(newScript);
          });

          // Also import any non-script nodes that were in the snippet
          // (rare, but harmless — e.g. <link rel="preload">).
          doc.head.querySelectorAll('link,meta,style').forEach(node => {
            const imported = document.importNode(node, true);
            imported.setAttribute('data-seo-header-script', 'true');
            document.head.appendChild(imported);
          });
        } catch (err) {
          console.warn('[SEO] Failed to parse headerScripts HTML:', err);
        }
      } else {
        // Case 2: payload is raw JavaScript (no <script> wrapper).
        // Inject it as a plain inline script element.
        const script = document.createElement('script');
        script.id = 'seo-header-script';
        script.setAttribute('data-seo-header-script', 'true');
        script.textContent = payload;
        document.head.appendChild(script);
      }
    } else if (!isBlogPost) {
      // No header scripts on this page — clean up anything we injected before.
      document.querySelectorAll('[data-seo-header-script], #seo-header-script').forEach(el => el.remove());
    }
  }, [pageType, blog, customTitle, customDescription, customImage, defaultTitle, defaultDescription]);

  const fetchSEO = useCallback(async () => {
    // For blog posts, use blog data directly instead of fetching from SEO API
    if (pageType === 'blog-post' && blog) {
      updateSEOTags(null);
      return;
    }
    
    if (fetchInProgress.current) return;
    
    const now = Date.now();
    if (now - lastFetchRef.current < 1000) return;
    
    fetchInProgress.current = true;
    lastFetchRef.current = now;
    
    try {
      const response = await seoAPI.getByPage(pageType, 'default', forceRefresh);
      if (response.data) {
        updateSEOTags(response.data);
      } else {
        // Use defaults if no SEO data
        document.title = defaultTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', defaultDescription);
        }
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      document.title = defaultTitle;
    } finally {
      fetchInProgress.current = false;
    }
  }, [pageType, blog, forceRefresh, defaultTitle, defaultDescription, updateSEOTags]);

  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      fetchSEO();
    }
    
    // Listen for storage events (if SEO updated in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'seo_updated' && pageType !== 'blog-post') {
        seoAPI.clearCache(pageType);
        fetchSEO();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [pageType, blog, fetchSEO]);
  
  // Re-run when blog data changes
  useEffect(() => {
    if (pageType === 'blog-post' && blog) {
      updateSEOTags(null);
    }
  }, [blog, pageType, updateSEOTags]);

  // ============ UMAMI ANALYTICS (config fetched from server) ============
  // Fetches Umami config from the server (single source of truth) and
  // injects the tracking script once. Umami auto-tracks SPA route changes,
  // so no manual pushState hooks are needed.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cancelled = false;

    const loadUmami = async () => {
      // Prevent double-injection across re-renders / route changes
      if (document.getElementById('umami-script')) return;

      try {
        const res = await apiClient.get('/analytics/config');
        const config = res.data?.data;

        if (cancelled) return;

        if (!config?.enabled || !config.host || !config.websiteId) {
          // Analytics disabled on server — silently skip
          return;
        }

        // Inject Umami script
        const script = document.createElement('script');
        script.id = 'umami-script';
        script.defer = true;
        script.src = `${config.host}/script.js`;
        script.setAttribute('data-website-id', config.websiteId);
        script.setAttribute('data-host-url', config.host); // Required for self-hosted
        document.head.appendChild(script);
      } catch (err) {
        // Analytics failure must never break the page
        console.warn('⚠️ Umami config fetch failed (analytics disabled):', err);
      }
    };

    loadUmami();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}