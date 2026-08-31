'use client';

import { useState, useEffect } from 'react';
import { fleetsAPI } from '@/lib/fleetsAPI';
import FleetCard from '@/components/fleet/FleetCard';
import type { Fleet } from '@/lib/fleetsAPI';
import SEOClient from '@/components/SEOClient';
import { seoAPI } from '@/lib/seoAPI';
import { Car, Sparkles, Shield, Clock } from 'lucide-react';

export default function FleetsPage() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const refreshSeo = async () => {
      seoAPI.clearCache('fleet');
      setRefreshKey(prev => prev + 1);
    };
    
    refreshSeo();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'seo_updated') {
        refreshSeo();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    fetchFleets();
  }, []);

  const fetchFleets = async () => {
    try {
      setLoading(true);
      const res = await fleetsAPI.getAll();
      setFleets(res.data || []);
    } catch (error) {
      console.error('Error fetching fleets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <SEOClient 
          key={refreshKey}
          pageType="fleet"
          defaultTitle="Our Fleet - Big Taxi Tiruppur | Well-Maintained Vehicles"
          defaultDescription="Choose from our range of clean, comfortable, and regularly serviced vehicles including hatchbacks, sedans, SUVs, and premium cars for every travel need."
        />
        <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOClient 
        key={refreshKey}
        pageType="fleet"
        defaultTitle="Our Fleet - Big Taxi Tiruppur | Well-Maintained Vehicles"
        defaultDescription="Choose from our range of clean, comfortable, and regularly serviced vehicles including hatchbacks, sedans, SUVs, and premium cars for every travel need."
      />

      <div className="min-h-screen pt-16 bg-gray-50">
        {/* Hero Section - Modern Minimal with Green */}
        <section className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16 md:py-20 w-full overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-green-400 font-semibold text-sm tracking-widest uppercase mb-3 border border-green-400/30 px-4 py-1 rounded-full">
                Our Fleet
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                Premium <span className="text-green-400">Vehicles</span> for Every Journey
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Choose from our range of clean, comfortable, and regularly serviced vehicles
              </p>
            </div>
          </div>
        </section>

        {/* Fleet Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {fleets.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">No vehicles available</p>
                <p className="text-gray-400 text-sm mt-1">Check back soon for our fleet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {fleets.map((vehicle) => (
                  <FleetCard key={vehicle._id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features Section - Modern with Green */}
        <section className="py-12 md:py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our <span className="text-green-500">Fleet</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every vehicle is maintained to the highest standards for your comfort and safety
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Regular Maintenance</h3>
                <p className="text-gray-600 text-sm">All vehicles undergo regular servicing and safety checks</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Clean & Hygienic</h3>
                <p className="text-gray-600 text-sm">Deep cleaning and sanitization after every trip</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Availability</h3>
                <p className="text-gray-600 text-sm">Book your ride anytime, anywhere with real-time tracking</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Green Gradient */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-green-500 to-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Book Your Ride?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Choose your preferred vehicle and experience comfortable travel with Big Taxi Tiruppur
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-12"
              >
                Book Now
                <Car className="w-5 h-5 ml-2" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 border-2 border-white/30 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-12"
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