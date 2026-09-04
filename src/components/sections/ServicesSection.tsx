"use client"

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { servicesAPI, type Service } from '@/lib/servicesAPI';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathname = usePathname();

  const getLocationSlug = () => {
    const parts = pathname?.split('/') || [];
    const servicesIndex = parts.indexOf('services');
    if (servicesIndex !== -1 && parts[servicesIndex + 1]) {
      return parts[servicesIndex + 1];
    }
    return null;
  };

  const locationSlug = getLocationSlug();

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: { includeInactive?: boolean; location?: string } = {};
      if (locationSlug) {
        params.location = locationSlug;
      }

      const res = await servicesAPI.getAll(params);

      let servicesData: Service[] = [];

      if (res && res.data && Array.isArray(res.data)) {
        servicesData = res.data;
      } else if (res && Array.isArray(res)) {
        servicesData = res;
      }

      const activeServices = servicesData.filter((s) => s.active === true);
      setServices(activeServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [locationSlug]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${API_URL}${cleanPath}`;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(Math.max(0, services.length - 2), prev + 1));
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-12 h-12 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-500 font-medium">Loading services...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-red-600 font-medium">{error}</p>
          <button
            onClick={fetchServices}
            className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full text-xs font-semibold hover:bg-gray-800 transition-all"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-base font-medium text-gray-900">No services available</p>
          <p className="text-xs text-gray-500 mt-1">Check back soon for our services.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        {/* Card Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.slice(currentIndex, currentIndex + 2).map((service) => {
            const detailUrl = locationSlug
              ? `/services/${locationSlug}/${service.slug}`
              : `/services/${service.location || 'all'}/${service.slug}`;

            return (
              <div key={service._id} className="flex flex-col">
                {/* Image Container with Rounded Corners */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                  {service.image ? (
                    <Image
                      src={getImageUrl(service.image)}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <span className="text-4xl opacity-30">🚗</span>
                    </div>
                  )}

                  {/* Optional Metadata Badges */}
                  {service.location && (
                    <span className="absolute top-4 left-4 bg-black/60 text-white text-[11px] px-3 py-1 rounded-full backdrop-blur-sm">
                      {service.location}
                    </span>
                  )}
                  {service.isFeatured && (
                    <span className="absolute top-4 right-4 bg-white/90 text-gray-900 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="flex flex-col flex-grow items-start">
                  <span className="text-xs text-gray-500 mb-1 capitalize tracking-wide font-normal">
                    {service.location ? service.location : 'Service'}
                  </span>

                  <h3 className="text-2xl md:text-[28px] font-semibold text-gray-900 tracking-tight leading-snug mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-xl line-clamp-2">
                    {service.description}
                  </p>

                  {/* Service Features Tag Pills */}
                  {service.features && service.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="mt-auto pt-2">
                    <Link
                      href={detailUrl}
                      className="inline-block px-5 py-2 border border-sky-400 text-sky-600 text-xs font-medium rounded-full hover:bg-sky-50 transition-colors"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Buttons - Always Rendered */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1 bg-white p-1 rounded-full border border-gray-200/80 shadow-sm">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2.5 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-600 transition-colors rounded-full"
              aria-label="Previous services"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= Math.max(0, services.length - 2)}
              className="p-2.5 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-600 transition-colors rounded-full"
              aria-label="Next services"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}