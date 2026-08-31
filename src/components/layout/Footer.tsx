"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { settingsAPI, type Settings } from "@/lib/settingsAPI";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    fetchSettings();
  }, []);

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

  // Navigation links matching header - FIXED: "/blog" instead of "/blogs"
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Book a Taxi" },
    { href: "/services", label: "Transfers and Tours" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blogs" },  // ← Fixed this line
  ];

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  if (loading) {
    return (
      <footer className="bg-slate-50 py-12 text-center border-t border-slate-200">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto" />
      </footer>
    );
  }

  return (
    <footer className="w-full font-sans border-t border-slate-200">
      {/* Top Bright Green Call-to-Action Bar */}
      <div className="bg-[#39E528] px-6 sm:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-tight text-center md:text-left">
          Travel Tamil Nadu in Comfort – Book Your Ride Today!
        </h2>
        <Link
          href="/booking"
          className="bg-black text-white hover:bg-slate-900 font-extrabold px-8 py-3.5 rounded-full transition-all text-sm uppercase tracking-wider shrink-0 shadow-md hover:scale-105 active:scale-95"
        >
          Book Now
        </Link>
      </div>

      {/* Main Light Footer Body */}
      <div className="bg-slate-50 text-slate-900 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Navigation Links - Same as Header with Blogs */}
          <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-sm font-medium border-b border-slate-200 pb-8">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-300 group ${
                    isActive 
                      ? "text-emerald-600 font-bold" 
                      : "text-slate-600 hover:text-emerald-600"
                  }`}
                >
                  {link.label}
                  {/* Animated underline for footer tabs */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-emerald-500 transition-all duration-300 ease-out ${
                      isActive 
                        ? "w-full" 
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10 max-w-5xl mx-auto text-center">
            {/* Address */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-emerald-100/70 rounded-xl flex items-center justify-center mb-4 border border-emerald-200 group hover:bg-emerald-200/70 transition-colors">
                <MapPin className="w-6 h-6 text-emerald-700 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed max-w-xs font-medium">
                {settings?.address || "bigtaxi, Thirupoor, 626745"}
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-emerald-100/70 rounded-xl flex items-center justify-center mb-4 border border-emerald-200 group hover:bg-emerald-200/70 transition-colors">
                <Phone className="w-6 h-6 text-emerald-700 group-hover:scale-110 transition-transform" />
              </div>
              <a
                href={`tel:${settings?.phone ? settings.phone.replace(/\D/g, "") : "7448899933"}`}
                className="text-sm text-slate-800 font-semibold hover:text-emerald-600 transition-colors"
              >
                {settings?.phone || "744 88 999 33"}
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-emerald-100/70 rounded-xl flex items-center justify-center mb-4 border border-emerald-200 group hover:bg-emerald-200/70 transition-colors">
                <Mail className="w-6 h-6 text-emerald-700 group-hover:scale-110 transition-transform" />
              </div>
              <a
                href={`mailto:${settings?.email || "bigtaxicars@gmail.com"}`}
                className="text-sm text-slate-800 font-semibold hover:text-emerald-600 transition-colors"
              >
                {settings?.email || "bigtaxicars@gmail.com"}
              </a>
            </div>
          </div>

          {/* Copyright Bottom Bar with Powered By */}
          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              Copyright © 2026 All rights reserved{" "}
              <span className="font-bold text-slate-900">Big Taxi</span>
            </p>
            
            {/* Powered by Orange Megs Softwares */}
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <a
                href="https://orangemegasoftware.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors hover:underline underline-offset-2"
              >
                OrangeMegaSoftware
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}