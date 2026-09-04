'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronLeft, ChevronRight, Users, Luggage, Check, Car } from 'lucide-react';
import { fleetsAPI, type Fleet } from '@/lib/fleetsAPI';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '/placeholder-car.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_URL}${cleanPath}`;
};

export default function SingleFleetPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [fleet, setFleet] = useState<Fleet | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedFleets, setRelatedFleets] = useState<Fleet[]>([]);

  const fetchFleetAndRelated = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fleetsAPI.getBySlug(slug as string);
      const currentFleet = res.data;
      setFleet(currentFleet);
      
      const allFleetsRes = await fleetsAPI.getAll();
      let allFleets: Fleet[] = [];
      
      if (allFleetsRes && allFleetsRes.data && Array.isArray(allFleetsRes.data)) {
        allFleets = allFleetsRes.data;
      } else if (allFleetsRes && Array.isArray(allFleetsRes)) {
        allFleets = allFleetsRes;
      }
      
      const related = allFleets
        .filter(f => f._id !== currentFleet._id && f.active === true)
        .slice(0, 4);
      
      setRelatedFleets(related);
    } catch (error) {
      console.error('Error fetching fleet:', error);
      router.push('/fleet');
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    if (slug) {
      fetchFleetAndRelated();
    }
  }, [slug, fetchFleetAndRelated]);

  const nextImage = () => {
    if (fleet?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % fleet.images.length);
    }
  };

  const prevImage = () => {
    if (fleet?.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + fleet.images.length) % fleet.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  if (!fleet) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Fleet not found</h2>
          <Link href="/fleet" className="mt-4 inline-block text-green-600 hover:text-green-700 font-medium">
            Back to Fleets
          </Link>
        </div>
      </div>
    );
  }

  const allImages = fleet.image ? [fleet.image, ...(fleet.images || [])] : (fleet.images || []);
  const hasGallery = allImages.length > 1;

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section - Modern Minimal with Green */}
      <section className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-12 md:py-16 w-full overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/fleet" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Fleets
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{fleet.type}</h1>
          <p className="text-gray-300 text-lg mt-2 max-w-2xl">
            {fleet.shortDescription || fleet.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Gallery */}
          <div className="mb-8">
            {hasGallery ? (
              <div className="relative">
                <div className="relative h-64 xs:h-80 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
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
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-all hover:scale-110"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-all hover:scale-110"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  )}
                </div>
                {allImages.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx ? 'border-green-500' : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <Image src={getImageUrl(img)} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="64px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative h-64 xs:h-80 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
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
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {fleet.type}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{fleet.description}</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {fleet.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Vehicle Specifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Capacity</span>
                  </div>
                  <span className="font-bold text-gray-900">{fleet.capacity}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Luggage className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Luggage</span>
                  </div>
                  <span className="font-bold text-gray-900">{fleet.luggage}</span>
                </div>
                {fleet.ideal && (
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Ideal For</span>
                    <span className="font-bold text-gray-900">{fleet.ideal}</span>
                  </div>
                )}
              </div>
              
              <Link
                href="/booking"
                className="w-full block text-center mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/25 h-12 flex items-center justify-center"
              >
                Book This Vehicle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Fleets Section */}
      {relatedFleets.length > 0 && (
        <section className="py-12 md:py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Similar Vehicles You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedFleets.map((vehicle) => (
                <Link 
                  key={vehicle._id} 
                  href={`/fleet/${vehicle.slug}`} 
                  className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    <Image
                      src={getImageUrl(vehicle.image)}
                      alt={vehicle.type}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-center">
                      {vehicle.type}
                    </h3>
                    <p className="text-sm text-gray-500 text-center mt-1">
                      {vehicle.capacity} • {vehicle.luggage}
                    </p>
                    <div className="mt-3 text-center">
                      <span className="text-green-600 text-sm font-semibold hover:underline">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}