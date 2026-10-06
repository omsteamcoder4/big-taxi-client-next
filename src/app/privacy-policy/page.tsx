"use client"

import { useState, useEffect } from "react"
import { settingsAPI, type Settings } from "@/lib/settingsAPI"

export default function PrivacyPage() {
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
      <div className="min-h-screen pt-16 xs:pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(255,128,0)]" />
      </div>
    )
  }

  const formattedPhone = settings?.phone || "+91 6379828716"
  const formattedAddress = settings?.address || "No-44, Ezhil Nagar, Konerikuppam Main Road, Kudapakkam, Villiyanur, Puducherry - 605502"

  return (
    <div className="min-h-screen pt-16 xs:pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[rgb(255,140,0)] to-[rgb(255,165,0)] py-8 xs:py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white mb-3 xs:mb-4">Privacy Policy</h1>
          <p className="text-xs xs:text-sm sm:text-base md:text-xl text-white font-bold">
            Your privacy is important to us
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 xs:py-12 sm:py-16 md:py-20 bg-[rgba(255,233,161,1)]">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-4 xs:p-6 sm:p-10 rounded-2xl xs:rounded-3xl border-3 xs:border-4 border-[rgb(255,140,0)] shadow-2xl space-y-4 xs:space-y-6 sm:space-y-8">
            <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold leading-relaxed">
              At Big Taxi Tiruppur, we are committed to protecting your personal information and ensuring a safe,
              secure, and trustworthy experience. This Privacy Policy explains how we collect, use, and safeguard your
              data when you visit our website, contact us, or use our taxi services.
            </p>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-3 xs:space-y-4">
                <div>
                  <h3 className="text-base xs:text-lg font-bold text-[rgb(64,39,0)] mb-2">a. Personal Information</h3>
                  <ul className="list-disc pl-4 xs:pl-6 space-y-1 text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                    <li>Name</li>
                    <li>Mobile number</li>
                    <li>Email address</li>
                    <li>Pickup and drop location</li>
                    <li>Travel preferences</li>
                    <li>Payment details (only processed through secure channels)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base xs:text-lg font-bold text-[rgb(64,39,0)] mb-2">b. Usage Information</h3>
                  <ul className="list-disc pl-4 xs:pl-6 space-y-1 text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                    <li>Device details</li>
                    <li>Browser type</li>
                    <li>IP address</li>
                    <li>Pages visited on our website</li>
                    <li>Date and time of access</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base xs:text-lg font-bold text-[rgb(64,39,0)] mb-2">c. Location Information</h3>
                  <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                    For online booking or ride tracking, we may collect location data with your permission.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-4 xs:pl-6 space-y-1 xs:space-y-2 text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                <li>Process bookings and provide transportation services</li>
                <li>Communicate booking confirmations or updates</li>
                <li>Improve customer support and service quality</li>
                <li>Personalize user experience on our website</li>
                <li>Enhance safety, prevent fraud, or verify identity</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-bold mt-3 xs:mt-4">
                We never sell or misuse your personal data.
              </p>
            </div>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                3. Sharing of Information
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mb-2 xs:mb-3">
                We may share your information only in the following cases:
              </p>
              <ul className="list-disc pl-4 xs:pl-6 space-y-1 xs:space-y-2 text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                <li>With drivers assigned to complete your ride</li>
                <li>With service providers who assist in operations (SMS gateways, payment processors, etc.)</li>
                <li>With authorities, when required by law or for safety concerns</li>
                <li>
                  With partners, but only when necessary for service fulfillment and never for marketing without consent
                </li>
              </ul>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-bold mt-3 xs:mt-4">
                We do not sell, rent, or trade personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                4. Data Security
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mb-2 xs:mb-3">
                We implement industry-standard security measures to protect your information from:
              </p>
              <ul className="list-disc pl-4 xs:pl-6 space-y-1 xs:space-y-2 text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                <li>Unauthorized access</li>
                <li>Loss or misuse</li>
                <li>Alteration or disclosure</li>
              </ul>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mt-3 xs:mt-4">
                However, no online system can be guaranteed 100% secure. We take all reasonable precautions to safeguard
                your data.
              </p>
            </div>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mb-2 xs:mb-3">
                Our website may use cookies to:
              </p>
              <ul className="list-disc pl-4 xs:pl-6 space-y-1 xs:space-y-2 text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                <li>Improve user experience</li>
                <li>Analyze traffic</li>
                <li>Remember your preferences</li>
              </ul>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mt-3 xs:mt-4">
                You can control cookie preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                6. Third-Party Links
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                Our website may contain links to external sites. We are not responsible for the privacy practices or
                content of third-party websites. We recommend reviewing their privacy policies before sharing
                information.
              </p>
            </div>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                7. Data Retention
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mb-2 xs:mb-3">
                We retain your personal data only for as long as necessary to:
              </p>
              <ul className="list-disc pl-4 xs:pl-6 space-y-1 xs:space-y-2 text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                <li>Fulfill the purpose for which it was collected</li>
                <li>Meet legal or regulatory obligations</li>
                <li>Resolve disputes or enforce policies</li>
              </ul>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mt-3 xs:mt-4">
                Once no longer needed, data is securely deleted.
              </p>
            </div>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                8. Your Rights
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mb-2 xs:mb-3">
                As a user, you have the right to:
              </p>
              <ul className="list-disc pl-4 xs:pl-6 space-y-1 xs:space-y-2 text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                <li>Access the personal information we hold</li>
                <li>Request corrections of inaccurate data</li>
                <li>Request deletion (where applicable)</li>
                <li>Withdraw consent for certain uses</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mt-3 xs:mt-4">
                To exercise these rights, contact us using the information provided below.
              </p>
            </div>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                9. Updates to This Policy
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                We may update this Privacy Policy from time to time. Revised versions will be posted on our website with
                an updated effective date. Continued use of our services constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-[rgb(255,140,0)] mb-3 xs:mb-4">
                10. Contact Us
              </h2>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold mb-2 xs:mb-3">
                If you have questions, concerns, or requests regarding this Privacy Policy, you may contact us at:
              </p>
              <div className="bg-gradient-to-br from-[rgb(255,244,220)] to-[rgb(255,233,161)] p-4 xs:p-6 rounded-lg xs:rounded-2xl border-2 border-[rgb(255,140,0)]">
                <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-bold">Big Taxi Tiruppur</p>
                <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold">
                  📞 Phone: {formattedPhone}
                </p>
                <p className="text-xs xs:text-sm sm:text-base text-[rgb(64,39,0)] font-semibold leading-relaxed">
                  📍 Address: {formattedAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}