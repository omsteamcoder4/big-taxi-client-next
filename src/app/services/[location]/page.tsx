// app/services/[location]/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { servicesAPI, type Service } from '@/lib/servicesAPI';
import { locationAPI, type Location } from '@/lib/locationAPI';
import SEOClient from '@/components/SEOClient';
import { ArrowRight, MapPin, Star, Sparkles } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_URL}${cleanPath}`;
};

export default function LocationServicesPage() {
  const params = useParams();
  const locationSlug = params?.location as string;
  
  const [services, setServices] = useState<Service[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const fetchLocationAndServices = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      try {
        const locRes = await locationAPI.getBySlug(locationSlug);
        setLocation(locRes.data);
      } catch (locErr) {
        console.error('Location not found:', locErr);
        setError('Location not found');
        setLoading(false);
        return;
      }
      
      const servicesRes = await servicesAPI.getAll({ 
        location: locationSlug 
      });
      
      let servicesData: Service[] = [];
      if (servicesRes && servicesRes.data && Array.isArray(servicesRes.data)) {
        servicesData = servicesRes.data;
      } else if (servicesRes && Array.isArray(servicesRes)) {
        servicesData = servicesRes;
      }
      
      setServices(servicesData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  }, [locationSlug]);

  useEffect(() => {
    if (locationSlug) {
      fetchLocationAndServices();
    }
  }, [locationSlug, fetchLocationAndServices]);

  if (loading) {
    return (
      <>
        <SEOClient 
          pageType="services"
          defaultTitle={`Services in ${locationSlug?.charAt(0).toUpperCase() + locationSlug?.slice(1) || ''}`}
          defaultDescription={`Explore our taxi services available in ${locationSlug?.charAt(0).toUpperCase() + locationSlug?.slice(1) || ''}`}
        />
        <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading services...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !location) {
    return (
      <>
        <SEOClient 
          pageType="services"
          defaultTitle="Location Not Found"
          defaultDescription="The requested location could not be found"
        />
        <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50">
          <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto border border-green-100">
            <div className="text-6xl mb-4">📍</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Location Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The location you are looking for does not exist.'}</p>
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOClient 
        pageType="services"
        defaultTitle={`${location.name} Services - Big Taxi Tiruppur`}
        defaultDescription={`Explore our comprehensive taxi services in ${location.name}. One-way drops, round trips, airport transfers, and local travel.`}
      />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
        {/* Hero Section - Location Specific */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-green-100/50 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-100/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-200/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-1.5 rounded-full mb-6 border border-green-200">
                <MapPin className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                  Services in {location.name}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {location.name}
                <span className="block text-green-500 mt-1">Taxi Services</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Reliable premium taxi services available in {location.name}. Book your ride today!
              </p>
              {location.address && (
                <div className="mt-4 inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-green-100">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">{location.address}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Services in {location.name}
              </h2>
              <span className="text-sm text-gray-500 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-200">
                {services.length} Services
              </span>
            </div>

            {services.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl shadow-lg border border-green-100">
                <div className="text-6xl mb-4">🚗</div>
                <p className="text-xl font-semibold text-gray-800">
                  No services available in {location.name}
                </p>
                <p className="text-gray-500 mt-2">Check back soon for our services in this location.</p>
                <Link 
                  href="/services"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  View All Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                  const isHovered = hoveredId === service._id;
                  
                  return (
                    <Link
                      key={service._id}
                      href={`/services/${locationSlug}/${service.slug}`}
                      className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-green-200"
                      onMouseEnter={() => setHoveredId(service._id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
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
                        
                        <div className="absolute bottom-4 left-4 z-10">
                          <div className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
                            <MapPin className="w-3 h-3 text-green-400" />
                            {location.name}
                          </div>
                        </div>
                      </div>

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

        {/* CTA Section - Location Specific */}
        <section className="relative overflow-hidden py-16 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600" />
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-white/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-white/30">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Ready to Travel?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your {location.name} Ride Today!
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Experience reliable premium taxi services in {location.name}. Book now for a hassle-free journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-green-500 font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
              >
                Book Now 🚗
              </a>
              <a
                href={`/contact?location=${location.slug}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-400/30 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/50 hover:bg-white/20 transition-all hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}