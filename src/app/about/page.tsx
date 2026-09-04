'use client';

import { useState, useEffect } from "react";
import SEOClient from "@/components/SEOClient";
import { seoAPI } from "@/lib/seoAPI";
import { 
  Shield, 
  Star, 
  Users, 
  Award, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Target,
  Eye,
  Heart,
  Sparkles,
  TrendingUp,
  Zap,
  Smile,
  Truck,
  Building2,
} from 'lucide-react';

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const refreshSeo = async () => {
      try {
        seoAPI.clearCache('about');
        setRefreshKey(prev => prev + 1);
      } catch (error) {
        console.error('Error refreshing SEO:', error);
      }
    };
    
    refreshSeo();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'seo_updated') {
        refreshSeo();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-800 rounded-full animate-ping opacity-25" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOClient 
        key={refreshKey}
        pageType="about"
        defaultTitle="About Us - Big Taxi Tiruppur | Our Story & Mission"
        defaultDescription="Learn about Big Taxi Tiruppur - our journey, mission, and commitment to providing safe, reliable, and affordable taxi services across Tiruppur and Tamil Nadu."
      />

      <div className="min-h-screen bg-white">
        
        {/* ===== HERO SECTION ===== */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden bg-gray-50">
          {/* Abstract background shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gray-100/80 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-100/50 to-transparent rounded-full blur-3xl" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-1.5 rounded-full mb-6 border border-gray-300">
                  <Sparkles className="w-4 h-4 text-gray-700" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">About Us</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                  Your Trusted
                  <span className="block text-gray-800 mt-1">Travel Partner</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
                  Safe, reliable, and comfortable travel across Tiruppur, Tamil Nadu, and beyond. 
                  We're here to make every journey effortless.
                </p>
                
                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { value: '10K+', label: 'Happy Riders', icon: Users },
                    { value: '99%', label: 'On-Time', icon: Clock },
                    { value: '4.9★', label: 'Rating', icon: Star },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-200">
                      <stat.icon className="w-5 h-5 text-gray-700 mx-auto mb-1" />
                      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Hero Image/Illustration */}
              <div className="relative hidden lg:block">
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Decorative rings */}
                  <div className="absolute inset-0 border-4 border-gray-300 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-8 border-4 border-gray-200 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-7xl">🚕</span>
                    </div>
                  </div>
                  
                  {/* Floating badges */}
                  {[
                    { icon: Shield, label: 'Safety', top: '5%', right: '5%', color: 'gray' },
                    { icon: Award, label: 'Quality', top: '5%', left: '5%', color: 'gray' },
                    { icon: Users, label: 'Trust', bottom: '5%', right: '5%', color: 'gray' },
                    { icon: Clock, label: 'Punctual', bottom: '5%', left: '5%', color: 'gray' },
                  ].map((badge, idx) => (
                    <div
                      key={idx}
                      className="absolute bg-white rounded-2xl shadow-lg p-3 border border-gray-200 animate-float"
                      style={{
                        top: badge.top || 'auto',
                        bottom: badge.bottom || 'auto',
                        left: badge.left || 'auto',
                        right: badge.right || 'auto',
                        animationDelay: `${idx * 0.5}s`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <badge.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-xs font-semibold text-gray-700">{badge.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== OUR STORY ===== */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
              {/* Decorative top bar */}
              <div className="h-1.5 bg-gradient-to-r from-gray-700 to-gray-900" />
              
              <div className="p-6 sm:p-10 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Story</h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-base sm:text-lg">
                    Welcome to <span className="font-bold text-gray-800">Big Taxi Tiruppur</span>, your trusted
                    partner for safe, reliable, and comfortable travel across Tiruppur, Tamil Nadu, and beyond. We were founded with a
                    clear purpose — to make long-distance and city-to-city travel more convenient, transparent, and
                    stress-free for everyone.
                  </p>
                  <p className="text-base sm:text-lg">
                    Whether it's a family trip, business travel, airport transfer, or an outstation journey, we are
                    committed to delivering the best ride experience at the most affordable prices.
                  </p>
                  <p className="text-base sm:text-lg">
                    At Big Taxi Tiruppur, we believe that every journey should be smooth from start to finish. That's why
                    we operate with a <span className="font-bold text-gray-800">customer-first approach</span>,
                    prioritizing safety, punctuality, and comfort above all.
                  </p>
                  
                  {/* Highlight cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                    {[
                      { icon: Shield, label: 'Safety First', color: 'gray' },
                      { icon: Star, label: 'Customer First', color: 'gray' },
                      { icon: Award, label: 'Quality Service', color: 'gray' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                        <item.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MISSION & VISION ===== */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mission */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    At Big Taxi Tiruppur, our mission is to provide{' '}
                    <span className="font-bold text-gray-800">safe, reliable, and affordable</span> travel experiences that customers can
                    trust every time. We aim to simplify long-distance and local transportation by offering transparent
                    pricing, comfortable rides, and exceptional service delivered by trained and responsible drivers.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3">
                    We strive to combine technology, customer care, and efficiency to ensure that every journey with us is{' '}
                    <span className="font-bold text-gray-800">smooth, timely, and worry-free</span>.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our vision is to become the <span className="font-bold text-gray-800">most trusted and customer-centric</span> drop
                    taxi service in South India, recognized for our dedication to safety, service quality, and innovation.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3">
                    We aspire to build a transportation ecosystem where every traveler—whether for business, family, or
                    leisure—can count on Big Taxi Tiruppur for dependable rides, consistent comfort, and excellent value.
                    As we grow, we aim to <span className="font-bold text-gray-800">set new industry standards</span> and make
                    stress-free travel accessible to everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CORE VALUES ===== */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full mb-4 border border-gray-200">
                <Heart className="w-4 h-4 text-gray-700" />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">What Drives Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Core Values</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                The principles that guide everything we do at Big Taxi Tiruppur
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Safety First", desc: "Your security is our top priority in every journey", color: "gray" },
                { icon: TrendingUp, title: "Transparency", desc: "Clear pricing with zero hidden charges, always", color: "gray" },
                { icon: Smile, title: "Customer Focus", desc: "Every decision is made with your satisfaction in mind", color: "gray" },
                { icon: CheckCircle, title: "Reliability", desc: "Consistent service you can depend on, every time", color: "gray" },
                { icon: Zap, title: "Innovation", desc: "Using technology to improve your travel experience", color: "gray" },
                { icon: Heart, title: "Care", desc: "Personal attention that makes you feel valued", color: "gray" },
              ].map((value, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-gray-300">
                    <value.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose Big Taxi Tiruppur?</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                What makes us different from the rest
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "Verified Drivers", desc: "All drivers are trained, experienced, and background-checked" },
                { icon: Clock, title: "On-Time Service", desc: "Punctuality is our promise to you" },
                { icon: Star, title: "Transparent Pricing", desc: "No hidden charges, no surprises" },
                { icon: Truck, title: "Well-Maintained Fleet", desc: "Clean, comfortable, and regularly serviced vehicles" },
              ].map((feature, idx) => (
                <div key={idx} className="text-center p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Location Badge */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
                <Building2 className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-semibold text-gray-700">Proudly Serving</span>
                <span className="text-sm font-bold text-gray-900">Tiruppur</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-600">Tamil Nadu</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION - Light White Background ===== */}
        <section className="relative py-16 px-4 overflow-hidden bg-white">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gray-100/50 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full mb-6 border border-gray-200">
              <Sparkles className="w-4 h-4 text-gray-700" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Ready to Ride?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Experience the Difference Today
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Big Taxi Tiruppur for their travel needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
              >
                Book Your Ride Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-100 text-gray-800 font-semibold rounded-2xl border-2 border-gray-300 hover:bg-gray-200 transition-all"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </a>
            </div>
            
            {/* Decorative bottom border */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-400">✓ No hidden charges • ✓ 24/7 support • ✓ Verified drivers</p>
            </div>
          </div>
        </section>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}