"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { settingsAPI, type Settings } from "@/lib/settingsAPI"

// Get R2 public URL from environment
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_URL || ''

export default function BookingSection() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await settingsAPI.getPublic()
      setSettings(res.data)
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#b2d3f7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  // Get phone number from settings or use fallback
  const phoneNumber = settings?.phone || "02 6572 1133"
  const rawPhone = phoneNumber.replace(/\D/g, "")

  return (
    <section className="group bg-[#b2d3f7] py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-20 min-h-screen flex items-center overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 items-center">
        
        {/* Left Side Content - Slides in from Left on Hover */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6 lg:space-y-8 transform lg:-translate-x-12 opacity-80 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 transition-all duration-700 ease-out">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 tracking-tight leading-tight sm:leading-none">
            We move <br className="hidden sm:inline" /> with you.
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-800 font-normal leading-relaxed max-w-md">
            Have all your journeys in the palm of your hand with Big Taxi Tiruppur.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <a
              href="/booking"
              className="w-full sm:w-auto px-6 py-3.5 bg-black text-white font-medium text-sm rounded-lg hover:bg-slate-800 transition-colors shadow-lg text-center"
            >
              Book Now
            </a>
            <a
              href={`tel:${rawPhone}`}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/80 border border-slate-300 text-slate-900 font-medium text-sm rounded-lg hover:bg-white transition-colors shadow-sm text-center"
            >
              Call Support
            </a>
          </div>
        </div>

        {/* Right Side Content - Image */}
        <div className="lg:col-span-7 transform lg:translate-x-12 opacity-80 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 transition-all duration-700 ease-out">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60 aspect-[4/3] bg-slate-200">
            <Image
              src={`${R2_PUBLIC_URL}/public/images/B1.jpg`}
              alt="Big Taxi Tiruppur - Book your ride"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            {/* Optional overlay with booking CTA */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4 sm:p-6 md:p-8">
              <div className="text-white">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-80">Book Now</p>
                <h3 className="text-xl sm:text-2xl font-serif">Your ride awaits</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}