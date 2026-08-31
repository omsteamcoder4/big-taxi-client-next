'use client';

import type React from "react"
import { useState, useEffect } from "react"
import { settingsAPI, type Settings } from "@/lib/settingsAPI"
import SEOClient from "@/components/SEOClient"
import { seoAPI } from "@/lib/seoAPI"

export default function ContactPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    fetchSettings()
    
    // Refresh SEO data when page loads
    const refreshSeo = async () => {
      seoAPI.clearCache('contact');
      setRefreshKey(prev => prev + 1);
    };
    
    refreshSeo();
    
    // Listen for storage events (if SEO updated in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'seo_updated') {
        seoAPI.clearCache('contact');
        setRefreshKey(prev => prev + 1);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await settingsAPI.getPublic()
      setSettings(res.data)
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateWhatsAppMessage = () => {
    const message = `📞 *New Contact Form Submission - Big Taxi Tiruppur* 📞

*Personal Information:*
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}

*Message:*
${formData.message}

Please respond to this inquiry at your earliest convenience. Thank you!`

    return encodeURIComponent(message)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert("Please fill all required fields")
      return
    }

    const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || "916381188591"
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    window.open(whatsappUrl, "_blank")
    
    alert("Opening WhatsApp to send your message. Please confirm the message to contact us!")

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  if (loading) {
    return (
      <>
        <SEOClient 
          key={refreshKey}
          pageType="contact"
          defaultTitle="Contact Us - Big Taxi Tiruppur | 24/7 Support"
          defaultDescription="Get in touch with Big Taxi Tiruppur for bookings, queries, or assistance. Call, WhatsApp, or visit us. 24/7 customer support available."
        />
        <div className="min-h-screen pt-16 xs:pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" />
        </div>
      </>
    )
  }

  const formattedPhone = settings?.phone || "+91 6381188591"
  const phoneLink = settings?.phone?.replace(/\D/g, '') || "916381188591"
  const whatsappLink = settings?.whatsapp?.replace(/\D/g, '') || "916381188591"
  const formattedAddress = settings?.address || "No-44, Ezhil Nagar, Konerikuppam Main Road, Kudapakkam, Villiyanur, Puducherry - 605502, India"

  return (
    <>
      <SEOClient 
        key={refreshKey}
        pageType="contact"
        defaultTitle="Contact Us - Big Taxi Tiruppur | 24/7 Support"
        defaultDescription="Get in touch with Big Taxi Tiruppur for bookings, queries, or assistance. Call, WhatsApp, or visit us. 24/7 customer support available."
      />

      <div className="min-h-screen pt-16 xs:pt-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <section className="py-8 xs:py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl" />
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-block mb-3 xs:mb-4 px-4 py-1.5 bg-blue-100/80 backdrop-blur-sm rounded-full text-blue-600 text-xs xs:text-sm font-semibold tracking-wide">
                📞 24/7 Support Available
              </div>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4 xs:mb-6">
                Get in Touch
              </h1>
              <p className="text-xs xs:text-sm sm:text-base md:text-xl text-gray-700 font-medium max-w-3xl mx-auto px-3 xs:px-0">
                We're here to help! Reach out to us for bookings, queries, or any assistance you need.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-8 xs:py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-blue-700 mb-4 xs:mb-6 sm:mb-8 flex items-center gap-2">
                  <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  Contact Information
                </h2>

                <div className="space-y-4 xs:space-y-6">
                  {/* Address */}
                  <div className="bg-white/80 backdrop-blur-sm p-4 xs:p-6 rounded-2xl xs:rounded-3xl shadow-lg shadow-blue-100/50 border border-blue-100/30 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start gap-3 xs:gap-4">
                      <div className="text-3xl xs:text-4xl flex-shrink-0">📍</div>
                      <div className="min-w-0">
                        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-blue-600 mb-2 xs:mb-2">
                          Our Address
                        </h3>
                        <p className="text-xs xs:text-sm sm:text-base text-gray-700 font-medium leading-relaxed whitespace-pre-line">
                          {formattedAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="bg-white/80 backdrop-blur-sm p-4 xs:p-6 rounded-2xl xs:rounded-3xl shadow-lg shadow-blue-100/50 border border-blue-100/30 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start gap-3 xs:gap-4">
                      <div className="text-3xl xs:text-4xl flex-shrink-0">📞</div>
                      <div className="min-w-0">
                        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-blue-600 mb-2 xs:mb-2">
                          Call Us
                        </h3>
                        <a
                          href={`tel:${phoneLink}`}
                          className="text-gray-800 font-bold text-lg xs:text-xl sm:text-2xl hover:text-blue-600 transition-colors cursor-pointer break-all"
                        >
                          {formattedPhone}
                        </a>
                        <p className="text-xs xs:text-sm text-gray-500 font-medium mt-1">
                          Available 24/7 for your convenience
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-white/80 backdrop-blur-sm p-4 xs:p-6 rounded-2xl xs:rounded-3xl shadow-lg shadow-green-100/50 border border-green-100/30 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start gap-3 xs:gap-4">
                      <div className="text-3xl xs:text-4xl flex-shrink-0">💬</div>
                      <div className="min-w-0">
                        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-emerald-600 mb-2 xs:mb-2">
                          WhatsApp
                        </h3>
                        <a
                          href={`https://wa.me/${whatsappLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-800 font-bold text-lg xs:text-xl sm:text-2xl hover:text-emerald-600 transition-colors cursor-pointer break-all"
                        >
                          {formattedPhone}
                        </a>
                        <p className="text-xs xs:text-sm text-gray-500 font-medium mt-1">
                          Quick response on WhatsApp
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 xs:p-6 rounded-2xl xs:rounded-3xl border border-blue-100/50 shadow-lg shadow-blue-100/30">
                    <div className="flex items-start gap-3 xs:gap-4">
                      <div className="text-3xl xs:text-4xl flex-shrink-0">🕐</div>
                      <div>
                        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-blue-700 mb-2 xs:mb-2">
                          Service Hours
                        </h3>
                        <p className="text-gray-800 font-bold text-base xs:text-lg sm:text-xl">
                          24/7 - Always Available
                        </p>
                        <p className="text-xs xs:text-sm text-gray-500 font-medium mt-1">
                          Round-the-clock service for all your travel needs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-white/80 backdrop-blur-sm p-4 xs:p-6 sm:p-8 rounded-3xl shadow-xl shadow-blue-100/50 border border-blue-100/30">
                  <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-700 mb-4 xs:mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white placeholder:text-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white placeholder:text-gray-400"
                        placeholder="your.email@example.com"
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
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white placeholder:text-gray-400"
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-xs xs:text-sm">
                        Your Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-200 font-medium text-xs xs:text-sm md:text-base text-gray-700 bg-white/50 hover:bg-white placeholder:text-gray-400 resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 xs:py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-sm xs:text-base sm:text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-200/50 hover:scale-[1.02] transform transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Send via WhatsApp</span>
                      <span className="text-xl">📱</span>
                    </button>

                    <p className="text-center text-xs xs:text-sm text-gray-500 font-medium">
                      We'll open WhatsApp to send your message. Please confirm to contact us!
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 xs:mb-8 sm:mb-12">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-800 mb-3 xs:mb-4">
                Need Immediate Assistance?
              </h2>
              <p className="text-xs xs:text-sm sm:text-base md:text-xl text-gray-600 font-medium">
                Choose the fastest way to reach us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
              <a
                href={`tel:${phoneLink}`}
                className="bg-white/80 backdrop-blur-sm p-6 xs:p-8 rounded-3xl shadow-lg shadow-blue-100/50 border border-blue-100/30 hover:shadow-xl hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300 text-center cursor-pointer group"
              >
                <div className="text-5xl xs:text-6xl mb-3 xs:mb-4 group-hover:scale-110 transform transition-transform duration-300">
                  📞
                </div>
                <h3 className="text-lg xs:text-2xl font-bold text-blue-600 mb-2 xs:mb-2">Call Now</h3>
                <p className="text-xs xs:text-sm sm:text-base text-gray-600 font-medium">Instant phone support</p>
              </a>

              <a
                href={`https://wa.me/${whatsappLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 backdrop-blur-sm p-6 xs:p-8 rounded-3xl shadow-lg shadow-green-100/50 border border-green-100/30 hover:shadow-xl hover:shadow-green-200/50 hover:scale-105 transition-all duration-300 text-center cursor-pointer group"
              >
                <div className="text-5xl xs:text-6xl mb-3 xs:mb-4 group-hover:scale-110 transform transition-transform duration-300">
                  💬
                </div>
                <h3 className="text-lg xs:text-2xl font-bold text-emerald-600 mb-2 xs:mb-2">WhatsApp</h3>
                <p className="text-xs xs:text-sm sm:text-base text-gray-600 font-medium">Quick chat support</p>
              </a>

              <a
                href="/booking"
                className="bg-white/80 backdrop-blur-sm p-6 xs:p-8 rounded-3xl shadow-lg shadow-blue-100/50 border border-blue-100/30 hover:shadow-xl hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300 text-center cursor-pointer group"
              >
                <div className="text-5xl xs:text-6xl mb-3 xs:mb-4 group-hover:scale-110 transform transition-transform duration-300">
                  📅
                </div>
                <h3 className="text-lg xs:text-2xl font-bold text-blue-600 mb-2 xs:mb-2">Book Online</h3>
                <p className="text-xs xs:text-sm sm:text-base text-gray-600 font-medium">Fast online booking</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}