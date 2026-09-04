// app/fleet/[slug]/SingleFleetClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Fleet } from '@/lib/fleetsAPI';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '/placeholder-car.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_URL}${cleanPath}`;
};

interface SingleFleetClientProps {
  initialFleet: Fleet;
}

export default function SingleFleetClient({ initialFleet }: SingleFleetClientProps) {
  const [fleet] = useState<Fleet>(initialFleet);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = fleet.image ? [fleet.image, ...(fleet.images || [])] : (fleet.images || []);
  const hasGallery = allImages.length > 1;

  const nextImage = () => {
    if (allImages.length) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (allImages.length) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <div className="min-h-screen pt-16 xs:pt-20">
      <section className="bg-gradient-to-br from-[rgb(255,140,0)] to-[rgb(255,165,0)] py-8 xs:py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <Link href="/fleet" className="inline-flex items-center gap-2 text-white mb-4 hover:underline">
            <ArrowLeft size={20} />
            Back to Fleets
          </Link>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white">{fleet.type}</h1>
          <p className="text-white text-lg mt-2 max-w-2xl">{fleet.shortDescription || fleet.description}</p>
        </div>
      </section>

      <section className="py-8 xs:py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          {/* Image Gallery */}
          <div className="mb-8">
            {hasGallery ? (
              <div className="relative">
                <div className="relative h-64 xs:h-80 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden">
                  <Image
                    src={getImageUrl(allImages[currentImageIndex])}
                    alt={`${fleet.type} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
                {allImages.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx ? 'border-[rgb(255,128,0)]' : 'border-gray-200'
                        }`}
                      >
                        <Image src={getImageUrl(img)} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="64px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative h-64 xs:h-80 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={getImageUrl(fleet.image)}
                  alt={fleet.type}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>
            )}
          </div>

          {/* Fleet Details */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-[rgb(60,40,30)] mb-4">About {fleet.type}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{fleet.description}</p>
              
              <h3 className="text-xl font-bold text-[rgb(60,40,30)] mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {fleet.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[rgb(255,128,0)]">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[rgb(255,244,220)] to-[rgb(255,233,161)] p-6 rounded-2xl h-fit">
              <h3 className="text-xl font-bold text-[rgb(60,40,30)] mb-4">Vehicle Specifications</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[rgb(255,140,0)]/30">
                  <span className="text-gray-700 font-semibold">👥 Capacity</span>
                  <span className="text-[rgb(60,40,30)] font-bold">{fleet.capacity}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[rgb(255,140,0)]/30">
                  <span className="text-gray-700 font-semibold">🧳 Luggage</span>
                  <span className="text-[rgb(60,40,30)] font-bold">{fleet.luggage}</span>
                </div>
                {fleet.ideal && (
                  <div className="flex justify-between items-center pb-2 border-b border-[rgb(255,140,0)]/30">
                    <span className="text-gray-700 font-semibold">⭐ Ideal For</span>
                    <span className="text-[rgb(60,40,30)] font-bold">{fleet.ideal}</span>
                  </div>
                )}
              </div>
              
              <Link
                href="/booking"
                className="w-full block text-center mt-6 px-6 py-3 bg-gradient-to-r from-[rgb(255,128,0)] to-[rgb(255,94,135)] text-white font-bold rounded-lg hover:from-[rgb(255,94,135)] hover:to-[rgb(255,128,0)] transition-all duration-300"
              >
                Book This Vehicle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}