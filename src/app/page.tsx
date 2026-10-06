// app/page.tsx
'use client';

import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/HeroSection"
// import AboutSection from "@/components/sections/AboutSection"
import ServicesSection from "@/components/sections/ServicesSection"
// import PricingSection from "@/components/sections/PricingSection"
import FleetSection from "@/components/sections/FleetSection"
// import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection"
// import FAQSection from "@/components/sections/FAQSection"
// import ContactSection from "@/components/sections/ContactSection"
import ExpectExcellence from "@/components/sections/ExpectExcellence"
import CTASection from "@/components/sections/CTASection"
import BookingSection from "@/components/sections/BookingSection"
import SEOClient from "@/components/SEOClient"
import { seoAPI } from "@/lib/seoAPI"

export default function HomePage() {
  const [localSeo, setLocalSeo] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Force refresh SEO data when page loads
  useEffect(() => {
    const refreshSeo = async () => {
      setIsLoading(true);
      try {
        // Clear cache and force refresh
        seoAPI.clearCache('homepage');
        setRefreshKey(prev => prev + 1);
        
        // Fetch fresh SEO data
        const response = await seoAPI.getByPage('homepage', 'default', true);
        if (response.data) {
          setLocalSeo(response.data);
          
          // Update document title and meta tags dynamically
          if (response.data.metaTitle) {
            document.title = response.data.metaTitle;
          }
          
          // Update meta description
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc && response.data.metaDescription) {
            metaDesc.setAttribute('content', response.data.metaDescription);
          }
          
          // Update OG tags
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          
          // Update OG:Title
          const ogTitle = document.querySelector('meta[property="og:title"]');
          if (ogTitle) {
            ogTitle.setAttribute('content', response.data.ogTitle || response.data.metaTitle || 'Big Taxi Tiruppur - Reliable Taxi Services Across Tamil Nadu');
          }
          
          // Update OG:Description
          const ogDescription = document.querySelector('meta[property="og:description"]');
          if (ogDescription) {
            ogDescription.setAttribute('content', response.data.ogDescription || response.data.metaDescription || '');
          }
          
          // Update OG:Image with cache busting
          if (response.data.ogImage && response.data.ogImage !== 'null' && response.data.ogImage !== 'undefined') {
            let imageUrl = response.data.ogImage;
            if (!imageUrl.startsWith('http')) {
              imageUrl = `${API_URL}${imageUrl}`;
            }
            const cacheBuster = `?t=${Date.now()}`;
            imageUrl = imageUrl.includes('?') ? `${imageUrl}&cb=${Date.now()}` : `${imageUrl}${cacheBuster}`;
            
            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage) {
              ogImage.setAttribute('content', imageUrl);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    refreshSeo();
    
    // Listen for storage events (if SEO updated in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'seo_updated') {
        refreshSeo();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <>
        <SEOClient 
          key={refreshKey}
          pageType="homepage"
          defaultTitle="Big Taxi Tiruppur - Reliable Taxi Services Across Tamil Nadu"
          defaultDescription="Big Taxi Tiruppur makes long-distance travel feel lighter. Safe, reliable, and affordable taxi services for outstation, airport, and local travel across Tamil Nadu."
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(255,128,0)]" />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOClient 
        key={refreshKey}
        pageType="homepage"
        defaultTitle="Big Taxi Tiruppur - Reliable Taxi Services Across Tamil Nadu"
        defaultDescription="Big Taxi Tiruppur makes long-distance travel feel lighter. Safe, reliable, and affordable taxi services for outstation, airport, and local travel across Tamil Nadu."
      />
      
      {/* Local Business Schema - Only show if we have data */}
      {localSeo?.businessName && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxiService",
              "name": localSeo.businessName,
              "description": localSeo.metaDescription || "Big Taxi Tiruppur - Reliable taxi services",
              "url": typeof window !== 'undefined' ? window.location.href : "https://bigtaxitiruppur.com",
              "telephone": localSeo.businessPhone || "+916379828716",
              "email": localSeo.businessEmail || "info@bigtaxitiruppur.com",
              "openingHours": localSeo.businessHours || "Mo-Su 00:00-23:59",
              ...(localSeo.businessAddress && {
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": localSeo.businessAddress,
                  "addressLocality": "Salem",
                  "addressRegion": "Tamil Nadu",
                  "addressCountry": "IN"
                }
              }),
              ...(localSeo.businessLatitude && localSeo.businessLongitude && {
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": localSeo.businessLatitude,
                  "longitude": localSeo.businessLongitude
                }
              }),
              "areaServed": localSeo.serviceArea?.length ? localSeo.serviceArea : ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh"],
              "priceRange": "$$",
              "image": localSeo.ogImage ? (localSeo.ogImage.startsWith('http') ? localSeo.ogImage : `${process.env.NEXT_PUBLIC_API_URL}${localSeo.ogImage}`) : undefined
            })
          }}
        />
      )}
      
      {/* Organization Schema (Fallback if no business data) */}
      {!localSeo?.businessName && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Big Taxi Tiruppur",
              "url": typeof window !== 'undefined' ? window.location.href : "https://bigtaxitiruppur.com",
              "logo": "https://bigtaxitiruppur.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/bigtaxitiruppur",
                "https://www.instagram.com/bigtaxitiruppur"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+916379828716",
                "contactType": "customer service",
                "availableLanguage": ["English", "Tamil"],
                "areaServed": "IN"
              }
            })
          }}
        />
      )}
      
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Big Taxi Tiruppur",
            "url": typeof window !== 'undefined' ? window.location.origin : "https://bigtaxitiruppur.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://bigtaxitiruppur.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      <div className="min-h-screen">
        <HeroSection />
        {/* <AboutSection /> */}
        <BookingSection/>
        <FleetSection />
        <ExpectExcellence />
        <ServicesSection />
        {/* <PricingSection /> */}
        
        {/* <WhyChooseUsSection /> */}
        {/* <FAQSection /> */}
        {/* <ContactSection /> */}
        
        <CTASection />
      </div>
    </>
  )
}