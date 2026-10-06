"use client"

import { useState, useEffect } from "react"
import { settingsAPI, type Settings } from "@/lib/settingsAPI"

export default function TermsPage() {
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

  if (loading) {
    return (
      <div className="min-h-screen pt-16 md:pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(255,128,0)]" />
      </div>
    )
  }

  const phoneLink = settings?.phone?.replace(/\D/g, '') || "916379828716"
  const whatsappLink = settings?.whatsapp?.replace(/\D/g, '') || "916379828716"

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[rgb(255,140,0)] to-[rgb(255,165,0)] py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white mb-3 md:mb-4 leading-tight">
            Terms and Conditions
          </h1>
          <p className="text-base xs:text-lg sm:text-xl text-white font-bold max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 bg-[rgba(255,233,161,1)] px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 xs:p-8 sm:p-10 rounded-2xl xs:rounded-3xl border-3 xs:border-4 border-[rgb(255,140,0)] shadow-xl xs:shadow-2xl space-y-6 md:space-y-8">
            <p className="text-[rgb(64,39,0)] font-semibold leading-relaxed text-sm xs:text-base">
              Welcome to Big Taxi Tiruppur. By booking a ride, using our services, or accessing our website, you agree
              to the following Terms and Conditions. Please read them carefully.
            </p>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">1. Definitions</h2>
              <ul className="list-disc pl-5 xs:pl-6 space-y-2 text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                <li>"Company", "We", "Us", "Our" refers to Big Taxi Tiruppur.</li>
                <li>"Customer", "You" refers to any individual or organization using our services.</li>
                <li>
                  "Service" refers to taxi booking, transportation, and related offerings provided by the Company.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">2. Booking & Confirmation</h2>
              <ul className="list-disc pl-5 xs:pl-6 space-y-2 text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                <li>All bookings must be made through our website, phone, or official contact methods.</li>
                <li>A booking is considered confirmed only after we acknowledge it via call, message, or email.</li>
                <li>
                  The Company reserves the right to verify, accept, or cancel any booking based on availability or other
                  constraints.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">3. Pricing & Payments</h2>
              <ul className="list-disc pl-5 xs:pl-6 space-y-2 text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                <li>Fares are calculated based on vehicle type, distance, and additional charges where applicable.</li>
                <li>
                  One-way drop bookings are billed only for single-way travel; return charges do not apply unless
                  explicitly stated.
                </li>
                <li>
                  Toll charges, state permit fees, parking fees, and driver allowances (if any) are borne by the
                  customer.
                </li>
                <li>Payments can be made in cash, UPI, or other modes accepted by the Company.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">4. Waiting Time & Delays</h2>
              <ul className="list-disc pl-5 xs:pl-6 space-y-2 text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                <li>Free waiting time may be provided depending on the service type.</li>
                <li>Additional waiting time will be charged at the applicable rate.</li>
                <li>
                  Delays caused by traffic, weather, roadblocks, or unforeseen events are not the Company's
                  responsibility.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">5. Cancellation & Refund Policy</h2>
              <ul className="list-disc pl-5 xs:pl-6 space-y-2 text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                <li>
                  Cancellations made before driver dispatch may be free or charged minimally based on Company policy.
                </li>
                <li>
                  A cancellation fee applies if the driver has already been assigned, dispatched, or has reached the
                  pickup point.
                </li>
                <li>
                  Refunds (if applicable) will be processed according to our internal timelines and payment method used.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">6. Passenger Responsibilities</h2>
              <ul className="list-disc pl-5 xs:pl-6 space-y-2 text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                <li>Customers must provide accurate pickup and drop details.</li>
                <li>Wearing seat belts is mandatory for all passengers.</li>
                <li>Any damage caused to the vehicle due to passenger negligence will be charged to the customer.</li>
                <li>
                  Carrying illegal items, hazardous substances, or engaging in unlawful activities is strictly
                  prohibited.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">7. Driver & Vehicle Safety</h2>
              <ul className="list-disc pl-5 xs:pl-6 space-y-2 text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                <li>All drivers are verified and trained, and vehicles are regularly maintained.</li>
                <li>The customer must respect the driver and follow safety instructions during the trip.</li>
                <li>Drivers may refuse or stop a trip if they deem it unsafe or unlawful.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">8. Luggage Policy</h2>
              <ul className="list-disc pl-5 xs:pl-6 space-y-2 text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                <li>Customers are responsible for their personal belongings.</li>
                <li>The Company is not liable for loss or damage to luggage left behind in the vehicle.</li>
                <li>Excess luggage or oversized items may require vehicle upgrades or additional charges.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">9. Limitations of Liability</h2>
              <ul className="list-disc pl-5 xs:pl-6 space-y-2 text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                <li>
                  Big Taxi Tiruppur is not responsible for delays due to traffic, mechanical issues, weather, or
                  circumstances beyond our control.
                </li>
                <li>
                  We are not liable for indirect, incidental, or consequential damages arising from the use of our
                  service.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">10. Privacy Policy</h2>
              <p className="text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                Customer information is collected only for booking and service-related purposes. We do not share
                personal data with third parties except when required for service fulfillment or legal compliance.
              </p>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">11. Modification of Terms</h2>
              <p className="text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                The Company reserves the right to update or modify these Terms & Conditions at any time. Continued use
                of our services implies acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl xs:text-2xl font-black text-[rgb(255,140,0)] mb-3 md:mb-4">12. Governing Law</h2>
              <p className="text-[rgb(64,39,0)] font-semibold text-sm xs:text-base">
                These Terms & Conditions are governed by applicable laws in India. Any disputes shall be resolved under
                the jurisdiction of local courts where the Company operates.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-[rgb(255,244,220)] to-[rgb(255,233,200)] p-6 rounded-2xl border-2 border-[rgb(255,200,100)]">
              <h3 className="text-lg xs:text-xl font-black text-[rgb(255,140,0)] mb-3 text-center">
                Need Help?
              </h3>
              <p className="text-[rgb(64,39,0)] font-semibold text-sm xs:text-base text-center mb-4">
                Contact us for any questions about our terms and conditions
              </p>
              <div className="flex flex-col xs:flex-row gap-3 justify-center items-center">
                <a
                  href={`tel:${phoneLink}`}
                  className="px-4 xs:px-6 py-3 bg-[rgb(255,140,0)] text-white font-bold rounded-full text-sm xs:text-base hover:scale-105 transform transition-all duration-300 cursor-pointer text-center min-w-[140px]"
                >
                  📞 Call Us
                </a>
                <a
                  href={`https://wa.me/${whatsappLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 xs:px-6 py-3 bg-green-500 text-white font-bold rounded-full text-sm xs:text-base hover:scale-105 transform transition-all duration-300 cursor-pointer text-center min-w-[140px]"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}