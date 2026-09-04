import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import FloatingButtons from "@/components/layout/FloatingButtons"
import { AIAssistantProvider } from "@/components/AIAssistant/AIAssistantProvider"
import BigxiAssistant from "@/components/AIAssistant/BigxiAssistant"

const geist = Geist({ subsets: ["latin"] })

// Static metadata for build time
export const metadata: Metadata = {
  title: "Big Taxi Tiruppur - Reliable Taxi Services Across Tamil Nadu",
  description:
    "Big Taxi Tiruppur makes long-distance travel feel lighter. Safe, reliable, and affordable taxi services for outstation, airport, and local travel.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AIAssistantProvider>
          <Header />
          {children}
          <Footer />
          <FloatingButtons />
          <BigxiAssistant />
        </AIAssistantProvider>
      </body>
    </html>
  )
}