// app/services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { servicesAPI, type Service } from '@/lib/servicesAPI';
import SEOClient from '@/components/SEOClient';
import { ArrowRight, MapPin, Star, Sparkles, Award, Shield, Clock, Users } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_URL}${cleanPath}`;
};

// Stats data
const stats = [
  { icon: Users, label: 'Happy Customers', value: '10K+' },
  { icon: Clock, label: 'On-Time Rides', value: '99.9%' },
  { icon: Shield, label: 'Safety Guaranteed', value: '24/7' },
  { icon: Award, label: 'Award Winning', value: '5 Stars' },
];

export default function AllServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await servicesAPI.getAll();
      let servicesData: Service[] = [];
      if (res && res.data && Array.isArray(res.data)) {
        servicesData = res.data;
      }
      setServices(servicesData.filter(s => s.active === true));
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOClient 
        pageType="services"
        defaultTitle="All Services - Big Taxi Tiruppur"
        defaultDescription="Explore our comprehensive taxi services including one-way drops, round trips, airport transfers, and local travel."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
        {/* Hero Section - New Design */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-green-100/50 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-100/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-200/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-1.5 rounded-full mb-6 border border-green-200">
                <Sparkles className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                  Premium Taxi Services
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Explore Our
                <span className="block text-green-500 mt-1">Taxi Services</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our wide range of premium taxi services designed for your comfort, safety, and convenience.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center border border-green-100 shadow-sm hover:shadow-lg transition-all">
                  <stat.icon className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid - New Card Design */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">All Services</h2>
              <span className="text-sm text-gray-500 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-200">
                {services.length} Services
              </span>
            </div>

            {services.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl shadow-lg border border-green-100">
                <div className="text-6xl mb-4">🚗</div>
                <p className="text-xl font-semibold text-gray-800">No services available</p>
                <p className="text-gray-500 mt-2">Check back soon for our services.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                  const locationSlug = service.location || 'all';
                  const isHovered = hoveredId === service._id;
                  
                  return (
                    <Link
                      key={service._id}
                      href={`/services/${locationSlug}/${service.slug}`}
                      className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-green-200"
                      onMouseEnter={() => setHoveredId(service._id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Image Container */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                        {service.image ? (
                          <Image
                            src={getImageUrl(service.image)}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50">
                            <span className="text-6xl opacity-30">🚕</span>
                          </div>
                        )}
                        
                        {service.isFeatured && (
                          <div className="absolute top-4 right-4 z-10">
                            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                              <Star className="w-3 h-3 fill-white" />
                              Featured
                            </div>
                          </div>
                        )}
                        
                        {service.location && (
                          <div className="absolute bottom-4 left-4 z-10">
                            <div className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
                              <MapPin className="w-3 h-3 text-green-400" />
                              {service.location}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-500 transition-colors line-clamp-1 mb-2">
                          {service.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {service.description}
                        </p>
                        
                        {service.features && service.features.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2.5 py-1 bg-green-50 text-green-600 font-medium rounded-full border border-green-100"
                              >
                                {feature}
                              </span>
                            ))}
                            {service.features.length > 3 && (
                              <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 font-medium rounded-full">
                                +{service.features.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-sm font-semibold text-green-500 group-hover:text-green-600 transition-colors flex items-center gap-1">
                            View Details
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className={`w-8 h-8 rounded-full bg-green-50 flex items-center justify-center transition-all ${isHovered ? 'bg-green-500 scale-110' : ''}`}>
                            <div className={`w-2 h-2 rounded-full transition-all ${isHovered ? 'bg-white' : 'bg-green-500'}`} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}