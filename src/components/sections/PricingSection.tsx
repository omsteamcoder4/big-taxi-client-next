export default function PricingSection() {
  const features = [
    {
      title: "Transparent Pricing",
      description: "No hidden charges, no surprises. What you see is what you pay.",
      icon: "💰",
    },
    {
      title: "One-Way = One-Way",
      description: "Pay only for your journey. No return charges for one-way trips.",
      icon: "➡️",
    },
    {
      title: "Competitive Rates",
      description: "Best prices in the market without compromising on quality.",
      icon: "💵",
    },
    {
      title: "GST Included",
      description: "All prices include GST. Complete transparency in billing.",
      icon: "📋",
    },
  ]

  return (
    <section className="py-8 xs:py-12 sm:py-20 px-3 xs:px-4 sm:px-6 lg:px-8 bg-[rgb(250,242,228)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 xs:mb-12 sm:mb-16">
          <h2
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black mb-2 xs:mb-3 sm:mb-4"
            style={{
              color: "rgb(60, 40, 30)",
              textShadow: "3px 3px 0px rgba(255,128,0,0.3)",
            }}
          >
            Transparent Pricing
          </h2>
          <p className="text-sm xs:text-base sm:text-xl text-[rgb(60,40,30)] max-w-3xl mx-auto px-2">
            Fair, honest, and transparent — the way pricing should be
          </p>
          <div className="w-20 xs:w-24 h-1 bg-[rgb(255,128,0)] mx-auto mt-2 xs:mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-8 xs:mb-10 sm:mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl shadow-lg border-4 border-[rgb(255,193,7)] text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl xs:text-5xl sm:text-6xl mb-2 xs:mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-sm xs:text-base sm:text-xl font-black mb-2 xs:mb-3 text-[rgb(60,40,30)]">
                {feature.title}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing Info Box */}
        <div className="bg-white p-5 xs:p-7 sm:p-10 rounded-2xl xs:rounded-3xl shadow-2xl border-4 border-[rgb(255,128,0)] max-w-4xl mx-auto mx-3">
          <h3 className="text-xl xs:text-2xl sm:text-3xl font-black mb-4 xs:mb-6 text-center text-[rgb(60,40,30)]">
            What's Included in Your Fare?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
            <div className="flex items-start gap-2 xs:gap-3">
              <span className="text-xl xs:text-2xl flex-shrink-0">✅</span>
              <div>
                <h4 className="font-bold text-[rgb(60,40,30)] mb-0.5 text-sm xs:text-base">Base Fare</h4>
                <p className="text-xs xs:text-sm text-[rgb(60,40,30)]">Distance-based calculation</p>
              </div>
            </div>
            <div className="flex items-start gap-2 xs:gap-3">
              <span className="text-xl xs:text-2xl flex-shrink-0">✅</span>
              <div>
                <h4 className="font-bold text-[rgb(60,40,30)] mb-0.5 text-sm xs:text-base">Driver Allowance</h4>
                <p className="text-xs xs:text-sm text-[rgb(60,40,30)]">For long-distance trips</p>
              </div>
            </div>
            <div className="flex items-start gap-2 xs:gap-3">
              <span className="text-xl xs:text-2xl flex-shrink-0">✅</span>
              <div>
                <h4 className="font-bold text-[rgb(60,40,30)] mb-0.5 text-sm xs:text-base">GST</h4>
                <p className="text-xs xs:text-sm text-[rgb(60,40,30)]">As per government regulations</p>
              </div>
            </div>
            <div className="flex items-start gap-2 xs:gap-3">
              <span className="text-xl xs:text-2xl flex-shrink-0">✅</span>
              <div>
                <h4 className="font-bold text-[rgb(60,40,30)] mb-0.5 text-sm xs:text-base">Night Charges</h4>
                <p className="text-xs xs:text-sm text-[rgb(60,40,30)]">For trips between 10 PM - 6 AM</p>
              </div>
            </div>
          </div>

          <div className="mt-6 xs:mt-8 p-3 xs:p-4 sm:p-6 bg-[rgba(255,233,161,0.5)] rounded-xl xs:rounded-2xl">
            <p className="text-center text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)] font-semibold">
              <strong>Note:</strong> Toll charges, parking fees, and state permit fees are additional and borne by the
              customer.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 xs:mt-10 sm:mt-12 px-2">
          <a
            href="/booking"
            className="inline-block cursor-pointer px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg xs:rounded-xl text-white font-bold text-xs xs:text-base sm:text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgb(255, 128, 0) 0%, rgb(255, 94, 135) 100%)",
            }}
          >
            Get Your Quote Now
          </a>
        </div>
      </div>
    </section>
  )
}
