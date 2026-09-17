"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, MessageSquare, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import settingsAPI from "@/lib/settingsAPI"

// Get R2 public URL from environment
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_URL || ''

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settings, setSettings] = useState<{
    phone: string
    whatsapp: string
  }>({
    phone: "02 6572 1133",
    whatsapp: "916381188591"
  })
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // Fetch settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.getPublic()
        if (response.success && response.data) {
          setSettings({
            phone: response.data.phone || "02 6572 1133",
            whatsapp: response.data.whatsapp || "916381188591"
          })
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error)
        // Keep default values if API fails
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const phoneNumber = settings.phone
  const whatsappNumber = settings.whatsapp

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Book a Taxi" },
    { href: "/fleet", label: "fleets" },
    { href: "/services", label: "Transfers and Tours" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  // Show loading state or default values while fetching
  const displayPhone = loading ? "02 6572 1133" : phoneNumber
  const displayRawPhone = displayPhone.replace(/\D/g, "")
  const displayWhatsApp = loading ? "916381188591" : whatsappNumber

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#E5DED0] border-b border-white/10 font-sans">
        <div className="flex items-center justify-between pl-6 lg:pl-12 pr-0 h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center shrink-0 py-2">
            <Image
              src={`${R2_PUBLIC_URL}/public/images/i5.png`}
              alt="Big Taxi Tiruppur"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-black">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-300 group ${
                    isActive ? "text-black" : "text-black/70 hover:text-black"
                  }`}
                >
                  {link.label}
                  {/* Animated underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#FFB800] transition-all duration-500 ease-out ${
                      isActive 
                        ? "w-full" 
                        : "w-0 group-hover:w-full group-hover:bg-[#FFB800]/60"
                    }`}
                  />
                  {/* Scale animation on active tab */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 w-1 h-1 bg-[#FFB800] rounded-full transform -translate-x-1/2 animate-pulse" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Action Buttons Container */}
          <div className="flex items-center h-full">
            {/* WhatsApp Quick Action Button */}
            <a
              href={`https://wa.me/${displayWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="whatsapp_click"
              data-umami-event-location="header"
              className="hidden sm:flex items-center gap-2 px-5 h-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Bright Yellow 24-Hour Call Block */}
            <a
              href={`tel:${displayRawPhone}`}
              data-umami-event="phone_click"
              data-umami-event-location="header"
              className="hidden md:flex flex-col justify-center px-8 h-full bg-[#FFB800] hover:bg-[#e0a200] text-black font-extrabold transition-colors shrink-0 leading-tight"
            >
              <span className="text-[11px] tracking-wider uppercase font-bold text-black/80">
                CALL 24 HOURS
              </span>
              <div className="flex items-center gap-2 text-base sm:text-lg tracking-tight font-black mt-0.5">
                <Phone className="w-4 h-4 fill-black text-black shrink-0" />
                <span>{displayPhone}</span>
              </div>
            </a>

            {/* Mobile Hamburger Trigger */}
            <div className="lg:hidden flex items-center pr-6">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-black hover:bg-black/10 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#2A2A2A] md:hidden flex flex-col p-6 overflow-y-auto font-sans text-white">
          
          {/* Header Row */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src={`${R2_PUBLIC_URL}/public/images/l2.png`}
                alt="Big Taxi Tiruppur"
                width={120}
                height={35}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 max-w-sm w-full mx-auto">
            <div className="bg-neutral-900 rounded-2xl border border-white/10 divide-y divide-white/10 overflow-hidden text-white font-medium">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block p-4 text-base hover:bg-white/5 transition-colors relative ${
                      isActive ? "text-[#FFB800] font-bold" : ""
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#FFB800] rounded-full animate-ping" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-3">
              <a
                href={`tel:${displayRawPhone}`}
                data-umami-event="phone_click"
                data-umami-event-location="header_mobile"
                className="w-full py-3.5 rounded-xl bg-[#FFB800] text-black font-extrabold text-base flex flex-col items-center justify-center transition-colors shadow-lg"
              >
                <span className="text-[10px] tracking-widest uppercase opacity-80">
                  CALL 24 HOURS
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 fill-black" />
                  {displayPhone}
                </span>
              </a>

              <a
                href={`https://wa.me/${displayWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="whatsapp_click"
                data-umami-event-location="header_mobile"
                className="w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-base flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}