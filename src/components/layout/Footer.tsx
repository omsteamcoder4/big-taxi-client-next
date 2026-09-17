"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail, ChevronRight, ArrowUp } from "lucide-react";
import { settingsAPI, type Settings } from "@/lib/settingsAPI";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetchSettings();

    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Book a Taxi" },
    { href: "/services", label: "Transfers & Tours" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blogs" },
  ];

  // Services links - all navigate to /services with hash
  const servicesLinks = [
    { href: "/services", label: "Tirupur Airport Taxi" },
    { href: "/services", label: "Tirupur Round Taxi" },
    { href: "/services", label: "Tirupur Outstation Taxi" },
    { href: "/services", label: "Tirupur Temple Tours" },
    { href: "/services", label: "Tirupur Corporate Taxi" },
    { href: "/services", label: "Tirupur Wedding Car Rental" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (loading) {
    return (
      <footer className="bg-gray-50 py-16 text-center border-t border-gray-200">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto" />
      </footer>
    );
  }

  return (
    <footer className="w-full font-sans relative">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Main Footer - Light Theme */}
      <div className="bg-white text-gray-800 pt-16 pb-6 border-t border-gray-200">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          
          {/* Top Grid - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-200">
            
            {/* Brand Column */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                Big<span className="text-emerald-600">Taxi</span> 
                <span className="text-sm font-medium text-gray-500 ml-1">Tirupur</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                Your trusted partner for comfortable and reliable taxi services across Tirupur and Tamil Nadu.
              </p>
           
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors duration-200 flex items-center gap-2 group ${
                        isActiveLink(link.href)
                          ? "text-emerald-600 font-medium"
                          : "text-gray-600 hover:text-emerald-600"
                      }`}
                    >
                      <ChevronRight className={`w-3 h-3 transition-transform group-hover:translate-x-1 ${
                        isActiveLink(link.href) ? "text-emerald-600" : "text-gray-400"
                      }`} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">
                Tirupur Services
              </h4>
              <ul className="space-y-2.5">
                {servicesLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-400 transition-transform group-hover:translate-x-1" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">
                Contact Info
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{settings?.address || "bigtaxi, Tirupur, 626745"}</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <a
                    href={`tel:${settings?.phone ? settings.phone.replace(/\D/g, "") : "7448899933"}`}
                    data-umami-event="phone_click"
                    data-umami-event-location="footer"
                    className="text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    {settings?.phone || "744 88 999 33"}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <a
                    href={`mailto:${settings?.email || "bigtaxicars@gmail.com"}`}
                    data-umami-event="email_click"
                    data-umami-event-location="footer"
                    className="text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    {settings?.email || "bigtaxicars@gmail.com"}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Big Taxi Tirupur. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <a
                href="https://orangemegasoftware.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-orange-500 hover:text-orange-600 transition-colors hover:underline underline-offset-2"
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