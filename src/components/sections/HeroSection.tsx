"use client"

import { useState, useRef } from "react"
import { Calendar, Clock, MapPin, Search, Send, CheckCircle, User, Phone } from "lucide-react"

// Get R2 public URL from environment
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_URL || ''

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [stayOpen, setStayOpen] = useState(false)
  
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
  
  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
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

    return encodeURIComponent(message)
  }

  // Handle booking submission
  const handleBooking = () => {
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.pickup || !formData.dropoff || !formData.date || !formData.time) {
      alert("Please fill all required fields: Name, Phone, Pickup, Dropoff, Date, and Time")
      return
    }

    setIsLoading(true)

    try {
      const whatsappNumber = "916381188591" // Replace with your admin number
      const message = generateWhatsAppMessage()
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

      window.open(whatsappUrl, '_blank')

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
      alert("Failed to send booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle hover events
  const handleMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    setIsHovered(true)
    setStayOpen(true)
  }

  const handleMouseLeave = () => {
    // Don't close if there's interaction with form inputs
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'SELECT') {
      return
    }
    
    // Delay closing to allow for interaction
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(false)
      setStayOpen(false)
    }, 300)
  }

  const handleFormInteraction = () => {
    // Keep the card open when user interacts with form
    setStayOpen(true)
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
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

        {/* Hover Area for Booking Form */}
        <div 
          className="relative w-full max-w-3xl flex items-center justify-center min-h-[60px] sm:min-h-[70px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main "Book Your Ride" Button */}
          <div
            className={`transition-all duration-500 transform z-30 ${
              isHovered || stayOpen
                ? "opacity-0 scale-90 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
          >
            <button
              className="px-8 py-4 bg-green-500 hover:bg-blue-700 text-white font-semibold text-lg rounded-full shadow-2xl backdrop-blur-md border border-white/20 transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Book Your Ride</span>
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Booking Form Card - Appears on Hover */}
          <div
            className={`absolute left-0 right-0 z-20 transition-all duration-500 ease-out ${
              isHovered || stayOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
            style={{
              top: '50%',
              transform: isHovered || stayOpen ? 'translateY(-50%) scale(1)' : 'translateY(-40%) scale(0.95)',
            }}
          >
            <div 
              className="bg-black/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl w-full max-h-[80vh] overflow-y-auto"
              onMouseEnter={handleFormInteraction}
            >
              {/* Success Message */}
              {showSuccess && (
                <div className="mb-3 p-2.5 bg-green-600/30 border border-green-500/50 rounded-xl flex items-center gap-3 animate-fadeIn">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-green-300 text-xs">Booking Sent!</p>
                    <p className="text-xs text-green-200/80">Check WhatsApp for confirmation</p>
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
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-400 z-10" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full pl-8 pr-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-400 z-10" />
                    <input
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
                      <Send className="w-4 h-4" /> Book Now via WhatsApp
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}