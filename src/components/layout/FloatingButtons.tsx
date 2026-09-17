"use client"

import { useState, useEffect } from "react"
import { settingsAPI, type Settings } from "@/lib/settingsAPI"

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Format WhatsApp number (remove any non-digit characters)
  const formatWhatsAppUrl = (whatsapp: string) => {
    const cleaned = whatsapp.replace(/\D/g, '')
    return `https://wa.me/${cleaned}`
  }

  if (loading) {
    return (
      <div className="fixed bottom-4 xs:bottom-6 right-3 xs:right-6 flex flex-col gap-3 xs:gap-4 z-40">
        <div className="w-14 h-14 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-14 h-14 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-14 h-14 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-14 h-14 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 xs:bottom-6 right-3 xs:right-6 flex flex-col gap-3 xs:gap-4 z-40">
      {/* AI Assistant Button - Bigxi */}
      {/* <button
        onClick={openAIAssistant}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transform transition-all duration-300 cursor-pointer flex-shrink-0 border-4 border-blue-500 group"
        aria-label="Chat with Bigxi AI Assistant"
      >
        <Bot className="w-7 h-7 text-white" /> */}
        
        {/* Pulse animation ring */}
         {/* <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-75"></span> */}
        
        {/* AI Badge */}
        {/* <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
          AI
        </span> */} 
        
        {/* Tooltip on hover */}
        {/* {isHovered && (
          <div className="absolute -top-12 right-0 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg border border-white/10">
            Chat with Bigxi 🤖
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-slate-800 rotate-45 border-r border-b border-white/10"></div>
          </div>
        )}
      </button> */}

      {/* WhatsApp Button */}
      {settings?.whatsapp && (
        <a
          href={formatWhatsAppUrl(settings.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="whatsapp_click"
          data-umami-event-location="floating_button"
          className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transform transition-all duration-300 cursor-pointer group flex-shrink-0 border-4 border-green-500"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      )}

      {/* Call Button */}
      {settings?.phone && (
        <a
          href={`tel:${settings.phone.replace(/\D/g, '')}`}
          data-umami-event="phone_click"
          data-umami-event-location="floating_button"
          className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transform transition-all duration-300 cursor-pointer flex-shrink-0 border-4 border-pink-500"
          aria-label="Call us"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </a>
      )}

      {/* Book Now Button */}
      {/* <a
        href="/booking"
        className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transform transition-all duration-300 cursor-pointer flex-shrink-0 border-4 border-orange-500"
        aria-label="Book Taxi"
      >
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" fill="none" />
          <line x1="4" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="2.2" />
          <line x1="8.5" y1="5" x2="8.5" y2="9" stroke="currentColor" strokeWidth="2.2" />
          <line x1="15.5" y1="5" x2="15.5" y2="9" stroke="currentColor" strokeWidth="2.2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 14l2 2 4-4" stroke="white" />
        </svg>
      </a> */}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transform transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-4 flex-shrink-0 border-4 border-gray-800"
          aria-label="Scroll to top"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  )
}