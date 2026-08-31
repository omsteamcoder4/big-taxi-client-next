'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fleetsAPI } from '@/lib/fleetsAPI';
import FleetCard from '@/components/fleet/FleetCard';
import type { Fleet, FleetsResponse } from '@/lib/fleetsAPI';
import { Car, ArrowRight } from 'lucide-react';

export default function FleetSection() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFleets();
  }, []);

  const fetchFleets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching fleets...');
      const res: FleetsResponse = await fleetsAPI.getAll();
      console.log('API Response:', res);
      
      let fleetsData: Fleet[] = [];
      
      if (res && res.data && Array.isArray(res.data)) {
        fleetsData = res.data;
        console.log('Fleets found in res.data:', fleetsData.length);
      } else if (res && Array.isArray(res)) {
        fleetsData = res;
        console.log('Fleets found as direct array:', fleetsData.length);
      } else {
        console.log('No fleets data found, response structure:', res);
        fleetsData = [];
      }
      
      const activeFleets = fleetsData.filter(f => f.active === true);
      console.log('Active fleets:', activeFleets.length);
      setFleets(activeFleets);
    } catch (error) {
      console.error('Error fetching fleets:', error);
      setError('Failed to load fleets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const displayFleets = fleets.slice(0, 4);

  if (loading) {
    return (
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto" />
          <p className="mt-4 text-gray-600">Loading our fleet...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchFleets}
            className="mt-4 px-6 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium h-11"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (displayFleets.length === 0) {
    return (
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">No vehicles available</p>
          <p className="text-sm text-gray-400 mt-1">Check back soon for our fleet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-green-600 font-semibold text-sm tracking-widest uppercase mb-3 border border-green-500/30 px-4 py-1 rounded-full">
            Our Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium <span className="text-green-500">Vehicles</span> for Every Journey
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Choose from our range of clean, comfortable, and regularly serviced vehicles
          </p>
        </div>

        {/* Fleet Grid - 4 cards max on homepage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayFleets.map((vehicle) => (
            <FleetCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>

        {/* View All Button - Shows if there are more than 4 fleets */}
        {fleets.length > 4 && (
          <div className="text-center mt-10 md:mt-12">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 h-12"
            >
              View All Vehicles
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}