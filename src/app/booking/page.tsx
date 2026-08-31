'use client';

import type React from "react";
import { useState, useEffect } from "react";
import { settingsAPI, type Settings } from "@/lib/settingsAPI";
import { seoAPI } from "@/lib/seoAPI";
import SEOClient from "@/components/SEOClient";

export default function BookingPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    date: "",
    time: "",
    vehicleType: "",
    tripType: "",
  });

  useEffect(() => {
    fetchSettings();
    refreshSeo();

    // Listen for storage events (if SEO updated in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "seo_updated") {
        refreshSeo();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const refreshSeo = async () => {
    seoAPI.clearCache("booking");
    setRefreshKey((prev) => prev + 1);
  };

  const fetchSettings = async () => {
    try {
      const res = await settingsAPI.getPublic();
      setSettings(res.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const message = `🚗 *New Booking Request - Big Taxi Tiruppur* 🚗

*Personal Information:*
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}

*Trip Details:*
📍 Pickup: ${formData.pickupLocation}
🎯 Drop: ${formData.dropLocation}
📅 Date: ${formData.date}
⏰ Time: ${formData.time}
🚙 Vehicle: ${formData.vehicleType}
🛣️ Trip Type: ${formData.tripType}

Please confirm this booking at your earliest. Thank you!`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.pickupLocation ||
      !formData.dropLocation ||
      !formData.date ||
      !formData.time ||
      !formData.vehicleType ||
      !formData.tripType
    ) {
      alert("Please fill all required fields marked with *");
      return;
    }

    const whatsappNumber =
      settings?.whatsapp?.replace(/\D/g, "") || "916381188591";
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");

    alert(
      "Opening WhatsApp to send your booking details. Please confirm the message to complete your booking!"
    );

    setFormData({
      name: "",
      phone: "",
      pickupLocation: "",
      dropLocation: "",
      date: "",
      time: "",
      vehicleType: "",
      tripType: "",
    });
  };

  if (loading) {
    return (
      <>
        <SEOClient
          key={refreshKey}
          pageType="booking"
          defaultTitle="Book Your Ride - Big Taxi Tiruppur | Quick Online Booking"
          defaultDescription="Book your taxi online with Big Taxi Tiruppur. Fill in your details and we'll get you on the road in no time. Affordable rates, safe travel."
        />
        <div className="min-h-screen pt-16 xs:pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" />
        </div>
      </>
    );
  }

  const formattedPhone = settings?.phone || "+91 6381188591";
  const phoneLink = settings?.phone?.replace(/\D/g, "") || "916381188591";
  const whatsappLink = settings?.whatsapp?.replace(/\D/g, "") || "916381188591";

  return (
    <>
      <SEOClient
        key={refreshKey}
        pageType="booking"
        defaultTitle="Book Your Ride - Big Taxi Tiruppur | Quick Online Booking"
        defaultDescription="Book your taxi online with Big Taxi Tiruppur. Fill in your details and we'll get you on the road in no time. Affordable rates, safe travel."
        forceRefresh={refreshKey > 0}
      />

      <div className="min-h-screen pt-16 xs:pt-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <section className="py-8 xs:py-12 sm:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl" />
          <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-block mb-3 xs:mb-4 px-4 py-1.5 bg-blue-100/80 backdrop-blur-sm rounded-full text-blue-600 text-xs xs:text-sm font-semibold tracking-wide">
              ✨ Quick & Easy Booking
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-3 xs:mb-4">
              Book Your Ride
            </h1>
            <p className="text-xs xs:text-sm sm:text-base md:text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Fill in your details and we'll get you on the road in no time! 🚗
            </p>
          </div>
        </section>

        {/* Speakable Content Section for Voice Assistants */}
        <div className="speakable-content hidden">
          <div itemScope itemType="https://schema.org/HowTo">
            <div itemProp="name">How to Book a Taxi with Big Taxi Tiruppur</div>
            <div itemProp="step">
              Step 1: Fill in your personal information including name and phone
              number
            </div>
            <div itemProp="step">
              Step 2: Select your trip type and vehicle preference
            </div>
            <div itemProp="step">
              Step 3: Enter pickup and drop locations
            </div>
            <div itemProp="step">
              Step 4: Choose date and time for pickup
            </div>
            <div itemProp="step">
              Step 5: Submit your booking and confirm via WhatsApp
            </div>
            <div itemProp="totalTime">PT5M</div>
          </div>
        </div>

        {/* Booking Form */}
        <section className="py-6 xs:py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-sm p-4 xs:p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl shadow-blue-100/50 border border-blue-100/30">
              <form onSubmit={handleSubmit} className="space-y-6 xs:space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-700 mb-4 xs:mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white placeholder:text-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white placeholder:text-gray-400"
                        placeholder="+91 1234567890"
                      />
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div>
                  <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-700 mb-4 xs:mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    Trip Details
                  </h2>
                  <div className="space-y-4 xs:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                          Trip Type <span className="text-red-400">*</span>
                        </label>
                        <select
                          required
                          value={formData.tripType}
                          onChange={(e) =>
                            setFormData({ ...formData, tripType: e.target.value })
                          }
                          className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white cursor-pointer appearance-none"
                        >
                          <option value="">Select trip type</option>
                          <option value="One-Way Drop">One-Way Drop</option>
                          <option value="Round Trip">Round Trip</option>
                          <option value="Airport Transfer">Airport Transfer</option>
                          <option value="Local City Travel">
                            Local City Travel
                          </option>
                          <option value="Corporate Service">
                            Corporate Service
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                          Vehicle Type <span className="text-red-400">*</span>
                        </label>
                        <select
                          required
                          value={formData.vehicleType}
                          onChange={(e) =>
                            setFormData({ ...formData, vehicleType: e.target.value })
                          }
                          className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white cursor-pointer appearance-none"
                        >
                          <option value="">Select vehicle type</option>
                          <option value="Hatchback (4 Seats)">
                            Hatchback (4 Seats)
                          </option>
                          <option value="Sedan (4 Seats)">Sedan (4 Seats)</option>
                          <option value="SUV (6-7 Seats)">SUV (6-7 Seats)</option>
                          <option value="Premium Sedan">Premium Sedan</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                        Pickup Location <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pickupLocation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pickupLocation: e.target.value,
                          })
                        }
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white placeholder:text-gray-400"
                        placeholder="Enter pickup address"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                        Drop Location <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.dropLocation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dropLocation: e.target.value,
                          })
                        }
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white placeholder:text-gray-400"
                        placeholder="Enter destination address"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                          Date <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                          Time <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="time"
                          required
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                          className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 xs:py-4 sm:py-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-sm xs:text-base sm:text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-200/50 hover:scale-[1.02] transform transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Send Booking via WhatsApp</span>
                  <span className="text-lg xs:text-xl sm:text-2xl">📱</span>
                </button>

                <p className="text-center text-xs xs:text-sm text-gray-500 font-medium">
                  We'll open WhatsApp to send your booking details. Please confirm
                  the message to complete your booking!
                </p>
              </form>
            </div>

            {/* Contact Options */}
            <div className="mt-6 xs:mt-8 sm:mt-10 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 xs:p-6 sm:p-8 rounded-3xl text-center shadow-lg shadow-blue-100/30 border border-blue-100/30">
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-800 mb-3 xs:mb-4">
                Need Help with Booking?
              </h3>
              <p className="text-gray-600 font-medium mb-4 xs:mb-6 text-xs xs:text-sm sm:text-base">
                Call us directly for immediate assistance
              </p>
              <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center">
                <a
                  href={`tel:${phoneLink}`}
                  className="inline-block px-5 xs:px-6 sm:px-8 py-3 xs:py-4 bg-white text-blue-600 text-sm xs:text-base sm:text-lg md:text-xl font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transform transition-all duration-300 cursor-pointer border border-blue-100"
                >
                  📞 {formattedPhone}
                </a>
                <a
                  href={`https://wa.me/${whatsappLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 xs:px-6 sm:px-8 py-3 xs:py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm xs:text-base sm:text-lg md:text-xl font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-green-200/50 hover:scale-105 transform transition-all duration-300 cursor-pointer"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}