// app/services/[location]/[slug]/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { servicesAPI, type Service } from '@/lib/servicesAPI';
import { settingsAPI, type Settings } from '@/lib/settingsAPI';
import SEOClient from '@/components/SEOClient';
import { 
  CheckCircle, MapPin, ArrowLeft, Sparkles, 
  Clock, Users, Shield, Phone, Mail,
  Star, ArrowRight, Car, Fuel, Wifi,
  type LucideIcon
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_URL}${cleanPath}`;
};

// Feature icons mapping
const featureIcons: Record<string, LucideIcon> = {
  'wifi': Wifi,
  'ac': Car,
  'fuel': Fuel,
  'clock': Clock,
  'shield': Shield,
  'users': Users,
  'star': Star,
};

export default function ServiceDetailPage() {
  const params = useParams();
  const locationSlug = params?.location as string;
  const serviceSlug = params?.slug as string;

  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'features'>('details');
  const [settings, setSettings] = useState<Settings | null>(null);

  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingsAPI.getPublic();
        if (res.success && res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const fetchServiceAndRelated = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const res = await servicesAPI.getBySlug(serviceSlug);
      if (res?.data) {
        setService(res.data);
        
        try {
          const relatedRes = await servicesAPI.getAll({
            location: res.data.location || locationSlug,
            includeInactive: false
          });
          
          let relatedData: Service[] = [];
          if (relatedRes && relatedRes.data && Array.isArray(relatedRes.data)) {
            relatedData = relatedRes.data;
          }
          
          const filtered = relatedData
            .filter(s => s.slug !== serviceSlug && s._id !== res.data._id)
            .slice(0, 3);
          
          setRelatedServices(filtered);
        } catch (relatedErr) {
          console.error('Error fetching related services:', relatedErr);
        }
        
      } else {
        setError('Service not found');
      }
    } catch (err) {
      console.error('Error fetching service:', err);
      setError('Service not found');
    } finally {
      setLoading(false);
    }
  }, [serviceSlug, locationSlug]);

  useEffect(() => {
    if (serviceSlug) {
      fetchServiceAndRelated();
    }
  }, [serviceSlug, fetchServiceAndRelated]);

  // Get phone number from settings or use fallback
  const phoneNumber = settings?.phone || '';
  const rawPhone = phoneNumber.replace(/\D/g, '');
  const email = settings?.email || '';

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <>
        <SEOClient
          pageType="services"
          defaultTitle="Service Not Found"
          defaultDescription="The requested service could not be found."
        />
        <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-green-50">
          <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto border border-green-100">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The service you are looking for does not exist.'}</p>
            <Link
              href={locationSlug ? `/services/${locationSlug}` : '/services'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
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
        defaultTitle={service.metaTitle || `${service.title} - Big Taxi Tiruppur`}
        defaultDescription={service.metaDescription || service.description}
      />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
        {/* Hero Section - New Design */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-100/50 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-amber-100/30 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8 text-gray-500 flex-wrap">
              <Link href="/services" className="hover:text-green-500 transition-colors">Services</Link>
              <span>/</span>
              {locationSlug && locationSlug !== 'all' && (
                <>
                  <Link href={`/services/${locationSlug}`} className="hover:text-green-500 transition-colors capitalize">
                    {locationSlug}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{service.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* Image - Left */}
              <div className="lg:col-span-2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  {service.image ? (
                    <Image
                      src={getImageUrl(service.image)}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                      <span className="text-8xl opacity-30">🚕</span>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {service.isFeatured && (
                      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        Featured
                      </div>
                    )}
                  </div>
                  
                  {service.location && (
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
                        <MapPin className="w-3 h-3 text-green-400" />
                        {service.location}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content - Right */}
              <div className="lg:col-span-3 space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h1>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                  {service.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span>{service.location}</span>
                    </div>
                  )}
                  {service.isFeatured && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>Featured Service</span>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="/booking"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Book Now 🚗
                  </a>
                  <a
                    href={`/contact?service=${service.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 transition-all hover:border-green-300"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Tabs */}
                <div className="flex gap-2 bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      activeTab === 'details'
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      activeTab === 'features'
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Features
                  </button>
                </div>

                {/* Details Tab */}
                {activeTab === 'details' && (
                  <>
                    {service.bulletPoints && service.bulletPoints.length > 0 && (
                      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          What's Included
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.bulletPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle
                                size={18}
                                className="text-green-500 flex-shrink-0 mt-0.5"
                              />
                              <span className="text-gray-700 text-sm leading-relaxed">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <>
                    {service.features && service.features.length > 0 && (
                      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-green-500" />
                          Features
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.features.map((feature, idx) => {
                            const Icon = featureIcons[feature.toLowerCase()] || Sparkles;
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-50 to-amber-50 rounded-xl border border-green-100"
                              >
                                <Icon className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium text-gray-700">{feature}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Booking Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-xl p-6 text-white sticky top-24">
                  <h3 className="text-xl font-bold mb-2">Book This Service</h3>
                  <p className="text-white/80 text-sm mb-5">
                    Ready to travel? Book now for a hassle-free experience.
                  </p>
                  <a
                    href="/booking"
                    className="block w-full py-3 bg-white text-green-500 font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 text-center"
                  >
                    Book Now 🚗
                  </a>
                  <div className="mt-4 text-center text-white/60 text-xs">
                    Instant confirmation • 24/7 support
                  </div>
                </div>

                {/* Quick Contact - Using settings from API */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Need Help?</h4>
                  <div className="space-y-3">
                    {phoneNumber && (
                      <a 
                        href={`tel:${rawPhone}`} 
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-green-500 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{phoneNumber}</span>
                      </a>
                    )}
                    {email && (
                      <a 
                        href={`mailto:${email}`} 
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-green-500 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{email}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Services Section */}
            {relatedServices.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="w-6 h-6 text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Related Services
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedServices.map((related) => (
                    <Link
                      key={related._id}
                      href={`/services/${related.location || locationSlug || 'all'}/${related.slug}`}
                      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-green-200"
                    >
                      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                        {related.image ? (
                          <Image
                            src={getImageUrl(related.image)}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center">
                            <span className="text-4xl opacity-30">🚕</span>
                          </div>
                        )}
                        {related.isFeatured && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                              ⭐
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 group-hover:text-green-500 transition-colors text-sm line-clamp-1">
                          {related.title}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                          {related.description}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-gray-600">
                              {related.location || 'All Locations'}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-green-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            View
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}