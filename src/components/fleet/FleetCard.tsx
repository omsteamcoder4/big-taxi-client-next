'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Luggage } from 'lucide-react';
import type { Fleet } from '@/lib/fleetsAPI';
import { useState } from 'react';

interface FleetCardProps {
  vehicle: Fleet;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '/placeholder-car.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_URL}${cleanPath}`;
};

export default function FleetCard({ vehicle }: FleetCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      {/* Vehicle Image */}
      <Link href={`/fleet/${vehicle.slug}`} className="block relative h-48 overflow-hidden flex-shrink-0">
        {!imgError ? (
          <Image
            src={getImageUrl(vehicle.image)}
            alt={vehicle.type}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => {
              setImgError(true);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-5xl">🚗</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </Link>

      {/* Content - Flex column to push button to bottom */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {vehicle.type}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-green-500" />
            {vehicle.capacity}
          </span>
          <span className="flex items-center gap-1.5">
            <Luggage className="w-4 h-4 text-green-500" />
            {vehicle.luggage}
          </span>
        </div>

        {/* Features - Show first 2 - flex-1 to push button down */}
        {vehicle.features && vehicle.features.length > 0 && (
          <div className="space-y-1 mb-4 flex-1">
            {vehicle.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
            {vehicle.features.length > 2 && (
              <span className="text-xs text-gray-400">
                +{vehicle.features.length - 2} more features
              </span>
            )}
          </div>
        )}

        {/* View Details Button - Fixed Height */}
        <Link
          href={`/fleet/${vehicle.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 bg-green-500 text-white font-semibold text-sm rounded-xl hover:bg-green-600 transition-all duration-300 group-hover:shadow-lg h-[44px] min-h-[44px] max-h-[44px] flex-shrink-0"
        >
          View Details
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}