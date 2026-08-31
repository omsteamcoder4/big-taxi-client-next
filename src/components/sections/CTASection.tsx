"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { settingsAPI, type Settings } from "@/lib/settingsAPI"

// Get R2 public URL from environment
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_URL || ''

export default function StackedCardsSection() {
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await settingsAPI.getPublic()
      setSettings(res.data)
    } catch (error) {
      console.error("Error fetching settings:", error)
    }
  }

  const formattedPhone = settings?.phone || "+91 63811 88591"
  const phoneLink = settings?.phone?.replace(/\D/g, "") || "916381188591"

  const slides = [
    {
      id: "01",
      title: "A welcome like no other",
      description: "Our professional drivers carry your luggage and handle every single detail of your route with utmost care.",
      bgImage: `${R2_PUBLIC_URL}/public/images/j3.jpg`,
    },
    {
      id: "02",
      title: "You set the tone",
      description: "In-car temperature, preferred music, and route options are strictly tailored to your personal preferences.",
      bgImage: `${R2_PUBLIC_URL}/public/images/j2.jpg`,
    },
    {
      id: "03",
      title: "Recharge & Relax",
      description: "Stay connected throughout your journey with high-speed onboard charging and comfortable seating.",
      bgImage: `${R2_PUBLIC_URL}/public/images/j4.jpg`,
    },
  ]

  return (
    <section className="w-full bg-white text-slate-900 py-16 font-sans">
      {/* Heading Section */}
      <div className="w-full max-w-5xl mx-auto text-center px-4 sm:px-6 mb-16">
        <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 tracking-tight mb-4">
          Step in. Breathe out.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
          Thoughtful details and dedicated driver service transform every journey into your personal sanctuary.
        </p>
      </div>

      {/* Full-Width Stacked Cards Pin Container */}
      <div className="relative w-full px-4 sm:px-8 lg:px-12 pb-24">
        {slides.map((slide, index) => {
          const topOffset = 100 + index * 20

          return (
            <div
              key={slide.id}
              className="sticky top-0 mb-12"
              style={{
                top: `${topOffset}px`,
              }}
            >
              <div
                className="relative w-full min-h-[480px] sm:min-h-[720px] rounded-3xl overflow-hidden shadow-2xl bg-black flex flex-col justify-end p-8 sm:p-14"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80 z-0"
                  style={{ backgroundImage: `url('${slide.bgImage}')` }}
                />

                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-1" />

                {/* Card Content */}
                <div className="relative z-10 max-w-3xl">
                  <span className="text-xs font-bold text-[#39E528] uppercase tracking-widest block mb-2">
                    Feature {slide.id}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif text-white mb-4">
                    {slide.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-8">
                    {slide.description}
                  </p>

                  {/* Dynamic CTA on final slide */}
                  {index === slides.length - 1 && (
                    <div className="flex flex-wrap gap-4 items-center pt-2">
                      <Link
                        href="/booking"
                        className="py-3 px-6 bg-[#39E528] hover:bg-emerald-500 text-black font-extrabold text-sm rounded-xl shadow-md transition-all uppercase tracking-wider"
                      >
                        Book Your Ride Now
                      </Link>
                      <a
                        href={`tel:${phoneLink}`}
                        className="py-3 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm rounded-xl transition-all"
                      >
                        Call Us: {formattedPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}