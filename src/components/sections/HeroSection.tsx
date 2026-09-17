"use client"

import { useState, useRef } from "react"
import type { RefObject } from "react"
import { Calendar, Clock, MapPin, Send, CheckCircle, User, Phone } from "lucide-react"

// Get environment variables (must have NEXT_PUBLIC_ prefix for client components)
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_URL || ''
const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || ''

export default function HeroSection() {
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    vehicleType: "",
    tripType: ""
  })

  const [isBookingSent, setIsBookingSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Refs for date/time inputs so we can open their native pickers
  // from anywhere in the field, not just the tiny icon
  const dateInputRef = useRef<HTMLInputElement>(null)
  const timeInputRef = useRef<HTMLInputElement>(null)

  // Opens the native picker for a given input ref.
  // Falls back to .focus() on browsers that don't support showPicker()
  // (e.g. Safari/iOS), which still opens the native wheel picker on tap.
  const openPicker = (ref: RefObject<HTMLInputElement | null>) => {
    if (!ref.current) return
    if (typeof ref.current.showPicker === "function") {
      try {
        ref.current.showPicker()
      } catch (err) {
        ref.current.focus()
      }
    } else {
      ref.current.focus()
    }
  }

  // Generate Telegram message
  const generateTelegramMessage = () => {
    const message = `🚗 *New Booking Request - Big Taxi Tiruppur* 🚗

*Personal Information:*
👤 Name: ${formData.name || "Not specified"}
📞 Phone: ${formData.phone || "Not specified"}

*Trip Details:*
📍 Pickup: ${formData.pickup || "Not specified"}
🎯 Drop: ${formData.dropoff || "Not specified"}
📅 Date: ${formData.date || "Not specified"}
⏰ Time: ${formData.time || "Not specified"}
🚙 Vehicle: ${formData.vehicleType || "Not specified"}
🛣️ Trip Type: ${formData.tripType || "Not specified"}

Please confirm this booking at your earliest. Thank you!`

    return message
  }

  // Handle booking submission via Telegram
  const handleBooking = async () => {
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.pickup || !formData.dropoff || !formData.date || !formData.time) {
      alert("Please fill all required fields: Name, Phone, Pickup, Dropoff, Date, and Time")
      return
    }

    // Check if Telegram credentials are configured
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      alert("Telegram bot not configured. Please check your environment variables.")
      console.error("Missing Telegram credentials. BOT_TOKEN:", !!TELEGRAM_BOT_TOKEN, "CHAT_ID:", !!TELEGRAM_CHAT_ID)
      return
    }

    setIsLoading(true)

    try {
      const message = generateTelegramMessage()

      console.log("Sending to Telegram...")

      // Send message to Telegram via Bot API
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      })

      const data = await response.json()

      if (!data.ok) {
        console.error("Telegram API Error:", data)
        throw new Error(data.description || 'Failed to send message')
      }

      console.log("Booking sent successfully!", data)

      // ============ UMAMI EVENT TRACKING ============
      if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track('hero_booking_submitted', {
          trip_type: formData.tripType || 'unknown',
          vehicle_type: formData.vehicleType || 'unknown',
        });
      }

      setIsBookingSent(true)
      setShowSuccess(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          pickup: "",
          dropoff: "",
          date: "",
          time: "",
          vehicleType: "",
          tripType: ""
        })
        setIsBookingSent(false)
        setShowSuccess(false)
      }, 5000)

    } catch (error) {
      console.error('Error sending booking:', error)
      alert("Failed to send booking. Please try again or contact us directly.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen w-full bg-slate-900 text-white font-sans antialiased pt-20 flex items-center justify-center overflow-x-hidden">
      {/* Background Hero Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${R2_PUBLIC_URL}/public/images/Hero2.png)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Hero Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4 py-8 text-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-slate-100 max-w-4xl leading-tight mb-8">
          Your Comfort Ride Awaits.
        </h1>

        {/* Booking Form Card - Always Visible */}
        <div className="relative w-full max-w-3xl">
          <div className="bg-black/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl w-full">
            {/* Success Message */}
            {showSuccess && (
              <div className="mb-3 p-2.5 bg-green-600/30 border border-green-500/50 rounded-xl flex items-center gap-3 animate-fadeIn">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-green-300 text-xs">Booking Sent!</p>

                </div>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }} className="space-y-2.5">
              {/* Personal Information - 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 z-10" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Full Name *"
                    className="w-full pl-8 pr-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 z-10" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Phone Number *"
                    className="w-full pl-8 pr-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Pickup & Dropoff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-400 z-10" />
                  <input
                    type="text"
                    required
                    value={formData.pickup}
                    onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                    placeholder="Pickup Location *"
                    className="w-full pl-8 pr-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-400 z-10" />
                  <input
                    type="text"
                    required
                    value={formData.dropoff}
                    onChange={(e) => setFormData({...formData, dropoff: e.target.value})}
                    placeholder="Drop-off Location *"
                    className="w-full pl-8 pr-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Date, Time, Vehicle, Trip Type */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Date field - entire box opens native calendar picker */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => openPicker(dateInputRef)}
                >
                  <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-400 z-10 pointer-events-none" />
                  <input
                    ref={dateInputRef}
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full pl-8 pr-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  />
                </div>

                {/* Time field - entire box opens native clock picker */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => openPicker(timeInputRef)}
                >
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-400 z-10 pointer-events-none" />
                  <input
                    ref={timeInputRef}
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full pl-8 pr-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  />
                </div>

                <div>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none"
                  >
                    <option value="">Vehicle Type</option>
                    <option value="Hatchback (4 Seats)">Hatchback</option>
                    <option value="Sedan (4 Seats)">Sedan</option>
                    <option value="SUV (6-7 Seats)">SUV</option>
                    <option value="Premium Sedan">Premium</option>
                  </select>
                </div>
                <div>
                  <select
                    value={formData.tripType}
                    onChange={(e) => setFormData({...formData, tripType: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none"
                  >
                    <option value="">Trip Type</option>
                    <option value="One-Way Drop">One-Way</option>
                    <option value="Round Trip">Round Trip</option>
                    <option value="Airport Transfer">Airport</option>
                    <option value="Local City Travel">Local</option>
                  </select>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                type="submit"
                disabled={isLoading || isBookingSent}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  isBookingSent
                    ? "bg-green-600 text-white"
                    : isLoading
                    ? "bg-slate-600 text-slate-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isBookingSent ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Booking Sent! ✅
                  </>
                ) : isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Book Now
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}