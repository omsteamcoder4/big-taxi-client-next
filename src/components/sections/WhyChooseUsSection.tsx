export default function WhyChooseUsSection() {
  const reasons = [
    {
      title: "Pay Only for Distance You Travel",
      description:
        "Our one-way fares are truly one-way — never charged for the driver's return trip. Fair, transparent pricing.",
      icon: "💸",
      color: "rgb(255, 193, 7)",
    },
    {
      title: "Professional Drivers",
      description:
        "Handpicked for safety, courtesy, and professionalism. Smooth driving and respectful communication guaranteed.",
      icon: "👨‍✈️",
      color: "rgb(255, 128, 0)",
    },
    {
      title: "Well-Maintained Vehicles",
      description:
        "Regular checks, deep cleaning, and professional maintenance. Clean, fresh, and safe rides every time.",
      icon: "🚗",
      color: "rgb(255, 94, 135)",
    },
    {
      title: "On-Time Pickups",
      description:
        "Your time matters. Accurate route planning and punctual drivers ensure you reach on time, every time.",
      icon: "⏰",
      color: "rgb(255, 159, 64)",
    },
    {
      title: "24/7 Availability",
      description:
        "Travel doesn't follow a schedule. Our service runs round-the-clock with support ready whenever you need.",
      icon: "🌙",
      color: "rgb(179, 98, 155)",
    },
    {
      title: "Zero Hidden Charges",
      description:
        "Transparent billing with clear pricing. No surprises, no extra fees. You know exactly what you're paying for.",
      icon: "📋",
      color: "rgb(255, 193, 7)",
    },
    {
      title: "Trusted by Thousands",
      description:
        "Our growth is driven by trust, referrals, and satisfaction. People choose us again because they feel valued.",
      icon: "⭐",
      color: "rgb(255, 128, 0)",
    },
    {
      title: "Personalized Service",
      description:
        "From flexible routes to special requests, we offer personal attention that big app-based services can't match.",
      icon: "🤝",
      color: "rgb(255, 94, 135)",
    },
    {
      title: "Safety First Always",
      description:
        "GPS-enabled vehicles, verified drivers, and monitored trips. Your safety is our absolute top priority.",
      icon: "🛡️",
      color: "rgb(255, 159, 64)",
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
            Why Choose Big Taxi?
          </h2>
          <p className="text-sm xs:text-base sm:text-xl text-[rgb(60,40,30)] max-w-3xl mx-auto px-2">
            9 reasons that make us the most trusted taxi service
          </p>
          <div className="w-20 xs:w-24 h-1 bg-[rgb(255,128,0)] mx-auto mt-2 xs:mt-3 sm:mt-4 rounded-full" />
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-3 xs:p-5 sm:p-8 rounded-2xl xs:rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-transparent hover:border-[rgb(255,128,0)]"
            >
              {/* Icon */}
              <div
                className="w-14 xs:w-16 sm:w-20 h-14 xs:h-16 sm:h-20 rounded-full flex items-center justify-center text-2xl xs:text-3xl sm:text-4xl mb-2 xs:mb-3 sm:mb-4 mx-auto"
                style={{ backgroundColor: `${reason.color}40` }}
              >
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm xs:text-base sm:text-xl font-black mb-2 xs:mb-3 text-[rgb(60,40,30)] text-center">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)] leading-relaxed text-center">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-8 xs:mt-12 sm:mt-16 text-center px-2">
          <div className="inline-block bg-white px-4 xs:px-8 sm:px-12 py-4 xs:py-5 sm:py-6 rounded-2xl xs:rounded-3xl shadow-xl border-4 border-[rgb(255,193,7)]">
            <p className="text-lg xs:text-2xl sm:text-3xl font-black text-[rgb(60,40,30)] mb-1 xs:mb-2">
              Trusted by 10,000+ Happy Customers
            </p>
            <p className="text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)]">
              Join thousands who travel safely with Big Taxi Tiruppur
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
