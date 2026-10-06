"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { settingsAPI, type Settings } from "@/lib/settingsAPI"

export default function ContactSection() {
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
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const phone = formData.get("phone")
    const pickup = formData.get("pickup")
    const drop = formData.get("drop")
    const message = formData.get("message")

    const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || "916379828716"
    const whatsappMessage = `Hello! I'm ${name}. I'd like to book a taxi.%0A%0APhone: ${phone}%0APickup: ${pickup}%0ADrop: ${drop}${message ? `%0AMessage: ${message}` : ""}`
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")
  }

  if (loading) {
    return (
      <section className="py-8 xs:py-12 sm:py-20 px-3 xs:px-4 sm:px-6 lg:px-8 bg-[rgb(250,242,228)]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(255,128,0)] mx-auto" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 xs:py-12 sm:py-20 px-3 xs:px-4 sm:px-6 lg:px-8 bg-[rgb(250,242,228)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 xs:mb-12 sm:mb-16">
          <h2
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black mb-2 xs:mb-3 sm:mb-4"
            style={{
              color: "rgb(60, 40, 30)",
              textShadow: "3px 3px 0px rgba(255,128,0,0.3)",
            }}
          >
            Get In Touch
          </h2>
          <p className="text-xs xs:text-sm sm:text-xl text-[rgb(60,40,30)]">
            We're here to help 24/7. Reach out anytime!
          </p>
          <div className="w-20 xs:w-24 h-1 bg-[rgb(255,128,0)] mx-auto mt-2 xs:mt-3 sm:mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-12">
          {/* Contact Info */}
          <div className="space-y-4 xs:space-y-6 sm:space-y-8">
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-black text-[rgb(60,40,30)] mb-4 xs:mb-6">
              Contact Information
            </h3>

            {/* Phone */}
            <div className="flex items-start gap-3 xs:gap-4 bg-white p-3 xs:p-4 sm:p-6 rounded-xl xs:rounded-2xl shadow-lg border-4 border-[rgb(255,193,7)]">
              <div className="w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 bg-[rgb(255,193,7)] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 xs:w-6 sm:w-7 h-5 xs:h-6 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <h4 className="font-black text-[rgb(60,40,30)] mb-0.5 xs:mb-1 text-sm xs:text-base">Phone</h4>
                <a
                  href={`tel:${settings?.phone?.replace(/\D/g, '') || "916379828716"}`}
                  className="text-[rgb(255,128,0)] font-semibold hover:underline cursor-pointer text-xs xs:text-sm sm:text-base"
                >
                  {settings?.phone || "+91 6379828716"}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-3 xs:gap-4 bg-white p-3 xs:p-4 sm:p-6 rounded-xl xs:rounded-2xl shadow-lg border-4 border-[rgb(255,128,0)]">
              <div className="w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 bg-[rgb(255,128,0)] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 xs:w-6 sm:w-7 h-5 xs:h-6 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <h4 className="font-black text-[rgb(60,40,30)] mb-0.5 xs:mb-1 text-sm xs:text-base">WhatsApp</h4>
                <a
                  href={`https://wa.me/${settings?.whatsapp?.replace(/\D/g, '') || "916379828716"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgb(255,128,0)] font-semibold hover:underline cursor-pointer text-xs xs:text-sm sm:text-base"
                >
                  Chat with us
                </a>
              </div>
            </div>

            {/* Address - Dynamic */}
            <div className="flex items-start gap-3 xs:gap-4 bg-white p-3 xs:p-4 sm:p-6 rounded-xl xs:rounded-2xl shadow-lg border-4 border-[rgb(255,94,135)]">
              <div className="w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 bg-[rgb(255,94,135)] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 xs:w-6 sm:w-7 h-5 xs:h-6 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-black text-[rgb(60,40,30)] mb-0.5 xs:mb-1 text-sm xs:text-base">Address</h4>
                <p className="text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)] whitespace-pre-line">
                  {settings?.address || "No-44, Ezhil Nagar,\nKonerikuppam Main Road,\nKudapakkam, Villiyanur,\nPuducherry - 605502, India"}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-3 xs:p-4 sm:p-6 rounded-xl xs:rounded-2xl shadow-lg border-4 border-[rgb(179,98,155)]">
              <h4 className="font-black text-[rgb(60,40,30)] mb-3 xs:mb-4 text-sm xs:text-base sm:text-lg">
                Quick Actions
              </h4>
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-2 sm:gap-3">
                <a
                  href={`tel:${settings?.phone?.replace(/\D/g, '') || "916379828716"}`}
                  className="cursor-pointer px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-[rgb(255,193,7)] text-white font-bold text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  📞 Call Now
                </a>
                <a
                  href={`https://wa.me/${settings?.whatsapp?.replace(/\D/g, '') || "916379828716"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-[rgb(37,211,102)] text-white font-bold text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  💬 WhatsApp
                </a>
                <a
                  href="/booking"
                  className="cursor-pointer px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-[rgb(255,128,0)] text-white font-bold text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  🚕 Book Now
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl shadow-2xl border-4 border-[rgb(255,128,0)]">
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-black text-[rgb(60,40,30)] mb-4 xs:mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-[rgb(255,193,7)] rounded-lg xs:rounded-xl focus:outline-none focus:border-[rgb(255,128,0)] text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)]"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-[rgb(255,193,7)] rounded-lg xs:rounded-xl focus:outline-none focus:border-[rgb(255,128,0)] text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)]"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="pickup"
                  placeholder="Pickup Location"
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-[rgb(255,193,7)] rounded-lg xs:rounded-xl focus:outline-none focus:border-[rgb(255,128,0)] text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)]"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="drop"
                  placeholder="Drop Location"
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-[rgb(255,193,7)] rounded-lg xs:rounded-xl focus:outline-none focus:border-[rgb(255,128,0)] text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)]"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message (Optional)"
                  rows={3}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border-2 border-[rgb(255,193,7)] rounded-lg xs:rounded-xl focus:outline-none focus:border-[rgb(255,128,0)] text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg xs:rounded-xl text-white font-bold text-xs xs:text-base sm:text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgb(255, 128, 0) 0%, rgb(255, 94, 135) 100%)",
                }}
              >
                Send Message via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}