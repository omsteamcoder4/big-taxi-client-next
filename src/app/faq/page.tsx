"use client"

import { useState, useEffect } from "react"
import { settingsAPI, type Settings } from "@/lib/settingsAPI"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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

  const faqs = [
    {
      question: "What is a one-way drop taxi service?",
      answer:
        "One-way drop taxi service means you pay only for the distance traveled from your pickup point to your destination. Unlike traditional taxi services, there are no return charges, making it a cost-effective option for outstation travel.",
    },
    {
      question: "How do I book a taxi with Big Taxi Tiruppur?",
      answer:
        "You can book a taxi through our website booking form, by calling us, or via WhatsApp. We offer 24/7 booking support for your convenience.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations made before driver dispatch may be free or charged minimally. If the driver has been assigned or has reached the pickup point, a cancellation fee applies. Please contact us for specific cancellation terms.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "No! We believe in complete transparency. The fare you see is the fare you pay. Additional charges like toll fees, state permit fees, and parking fees (if applicable) will be clearly communicated upfront.",
    },
    {
      question: "How much luggage can I carry?",
      answer:
        "Luggage capacity depends on the vehicle type. Hatchbacks can accommodate 2 bags, Sedans can hold 3 bags, and SUVs can carry 4-5 bags. Excess or oversized luggage may require a vehicle upgrade.",
    },
    {
      question: "Are your drivers verified and trained?",
      answer:
        "Yes! All our drivers are thoroughly verified, experienced, and trained in safety, courtesy, and professional driving. Your safety and comfort are our top priorities.",
    },
    {
      question: "Do you provide service 24/7?",
      answer:
        "Big Taxi Tiruppur operates 24/7, 365 days a year. Whether it's an early morning flight or a late-night journey, we're always ready to serve you.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, UPI, and other digital payment methods. Payment details will be confirmed during booking.",
    },
    {
      question: "Do you track flights for airport pickups?",
      answer:
        "Yes! For airport transfers, our drivers track flight schedules in real-time to ensure timely pickups, even if your flight is delayed.",
    },
    {
      question: "Can I request a specific vehicle type?",
      answer:
        "Yes! You can choose from Hatchback, Sedan, SUV, or Premium Sedan based on your comfort and passenger requirements during booking.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We primarily serve Tamil Nadu and surrounding regions, including major cities, towns, and airports. For specific destination queries, please contact us directly.",
    },
    {
      question: "Is my ride insured?",
      answer: "Yes, all our vehicles are fully insured, providing you peace of mind throughout your journey.",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen pt-16 xs:pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(255,128,0)]" />
      </div>
    )
  }

  const phoneLink = settings?.phone?.replace(/\D/g, '') || "916381188591"

  return (
    <div className="min-h-screen pt-16 xs:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[rgb(255,140,0)] to-[rgb(255,165,0)] py-8 xs:py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-3 xs:mb-4 sm:mb-6">
              <span className="px-4 xs:px-6 py-2 xs:py-3 bg-white text-[rgb(255,140,0)] font-black text-xs xs:text-sm uppercase tracking-wider rounded-full shadow-xl">
                Got Questions?
              </span>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 xs:mb-4 sm:mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xs xs:text-sm sm:text-base md:text-2xl text-white font-bold max-w-3xl mx-auto px-3 xs:px-0">
              Find answers to common questions about our services, booking process, and policies.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-[rgba(255,233,161,1)]">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 xs:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl xs:rounded-3xl border-3 xs:border-4 border-[rgb(255,140,0)] shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-4 xs:px-6 sm:px-8 py-4 xs:py-6 flex items-center justify-between text-left cursor-pointer group gap-2 xs:gap-4"
                >
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-black text-[rgb(64,39,0)] group-hover:text-[rgb(255,140,0)] transition-colors">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 xs:w-8 h-6 xs:h-8 rounded-full bg-gradient-to-br from-[rgb(255,140,0)] to-[rgb(255,165,0)] flex items-center justify-center text-white font-black text-lg xs:text-xl transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    {openIndex === index ? "−" : "+"}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-4 xs:px-6 sm:px-8 pb-4 xs:pb-6 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-[rgb(64,39,0)] mb-4 xs:mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-xl text-[rgb(120,80,20)] font-semibold mb-6 xs:mb-8">
            We're here to help! Reach out to us anytime for personalized assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center">
            <a
              href={`tel:${phoneLink}`}
              className="inline-block px-6 xs:px-8 sm:px-10 py-3 xs:py-4 sm:py-5 bg-gradient-to-r from-[rgb(255,140,0)] to-[rgb(255,165,0)] text-white text-sm xs:text-base sm:text-lg md:text-xl font-black rounded-lg xs:rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transform transition-all duration-300 cursor-pointer"
            >
              📞 Call Us Now
            </a>
            <a
              href="/contact"
              className="inline-block px-6 xs:px-8 sm:px-10 py-3 xs:py-4 sm:py-5 bg-white text-[rgb(255,140,0)] text-sm xs:text-base sm:text-lg md:text-xl font-black rounded-lg xs:rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transform transition-all duration-300 cursor-pointer border-4 border-[rgb(255,140,0)]"
            >
              Contact Us 📧
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}