"use client"

import { useState } from "react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What is one-way drop taxi service?",
      answer:
        "One-way drop taxi service means you pay only for your journey from point A to point B. Unlike regular taxi services, you don't have to pay for the driver's return journey. This makes it much more affordable for long-distance travel.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "Absolutely not. At Big Taxi Tiruppur, we believe in 100% transparent billing. All charges are clearly mentioned upfront. Additional costs like tolls, parking, and state permit fees (if applicable) are always communicated beforehand.",
    },
    {
      question: "How do I book a taxi?",
      answer:
        "Booking is simple! You can call us at +91 6379828716, WhatsApp us, or use our online booking form. Just provide your pickup location, destination, date, and preferred vehicle type. We'll confirm your booking immediately.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations made before driver dispatch may be free or minimally charged. If the driver has been assigned or has reached the pickup point, cancellation charges apply. Contact us immediately if you need to cancel or reschedule.",
    },
    {
      question: "Do you provide 24/7 service?",
      answer:
        "Yes! Big Taxi Tiruppur operates round-the-clock. Whether you need an early morning airport transfer or a midnight outstation ride, we're always available to serve you.",
    },
    {
      question: "How are your drivers verified?",
      answer:
        "All our drivers undergo thorough background checks and verification processes. They're trained for safety, professional behavior, and customer service. Every vehicle is GPS-enabled for your security.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, UPI, and other digital payment methods. You can choose your preferred mode at the time of booking or payment.",
    },
    {
      question: "Can I carry luggage?",
      answer:
        "Yes, all our vehicles have adequate luggage space. For excessive or oversized luggage, we recommend choosing an SUV or informing us beforehand so we can arrange a suitable vehicle.",
    },
  ]

  return (
    <section
      className="py-8 xs:py-12 sm:py-20 px-3 xs:px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, rgba(255,233,161,1) 0%, rgb(250,242,228) 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 xs:mb-12 sm:mb-16">
          <h2
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black mb-2 xs:mb-3 sm:mb-4"
            style={{
              color: "rgb(60, 40, 30)",
              textShadow: "3px 3px 0px rgba(255,128,0,0.3)",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-xs xs:text-sm sm:text-xl text-[rgb(60,40,30)]">
            Get answers to common questions about our services
          </p>
          <div className="w-20 xs:w-24 h-1 bg-[rgb(255,128,0)] mx-auto mt-2 xs:mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2 xs:space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl xs:rounded-2xl shadow-lg overflow-hidden border-4 border-transparent hover:border-[rgb(255,128,0)] transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-5 flex items-center justify-between text-left cursor-pointer hover:bg-[rgba(255,233,161,0.3)] transition-colors"
              >
                <span className="text-xs xs:text-base sm:text-lg font-black text-[rgb(60,40,30)] pr-2 xs:pr-4">
                  {faq.question}
                </span>
                <span className="text-xl xs:text-2xl font-bold text-[rgb(255,128,0)] flex-shrink-0">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-3 xs:px-4 sm:px-6 pb-3 xs:pb-4 sm:pb-5">
                  <div className="h-px bg-[rgb(255,128,0)] mb-3 xs:mb-4 opacity-30" />
                  <p className="text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 xs:mt-10 sm:mt-12 px-2">
          <p className="text-sm xs:text-base sm:text-lg text-[rgb(60,40,30)] mb-3 xs:mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-block cursor-pointer px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg xs:rounded-xl text-white font-bold text-xs xs:text-base sm:text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgb(255, 128, 0) 0%, rgb(255, 94, 135) 100%)",
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
