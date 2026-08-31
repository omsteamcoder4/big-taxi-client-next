import Image from "next/image"

export default function AboutSection() {
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
            About Big Taxi Tiruppur
          </h2>
          <div className="w-20 xs:w-24 h-1 bg-[rgb(255,128,0)] mx-auto rounded-full" />
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-6 xs:gap-8 sm:gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative h-48 xs:h-56 sm:h-96 rounded-2xl xs:rounded-3xl overflow-hidden shadow-2xl border-4 xs:border-8 border-white transform hover:scale-105 transition-all duration-300">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
                alt="Taxi Service"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 xs:-top-6 -right-4 xs:-right-6 w-16 xs:w-24 h-16 xs:h-24 rounded-full bg-[rgb(255,193,7)] opacity-60 blur-2xl" />
            <div className="absolute -bottom-4 xs:-bottom-6 -left-4 xs:-left-6 w-20 xs:w-32 h-20 xs:h-32 rounded-full bg-[rgb(255,94,135)] opacity-60 blur-2xl" />
          </div>

          {/* Text Side */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            <p className="text-xs xs:text-sm sm:text-lg text-[rgb(60,40,30)] leading-relaxed">
              Welcome to <strong className="text-[rgb(255,128,0)]">Big Taxi Tiruppur</strong>, your trusted partner
              for safe, reliable, and comfortable travel across Tamil Nadu and beyond. We were founded with a clear
              purpose — to make long-distance and city-to-city travel more convenient, transparent, and stress-free for
              everyone.
            </p>
            <p className="text-xs xs:text-sm sm:text-lg text-[rgb(60,40,30)] leading-relaxed">
              Whether it's a family trip, business travel, airport transfer, or an outstation journey, we are committed
              to delivering the best ride experience at the most affordable prices.
            </p>
            <p className="text-xs xs:text-sm sm:text-lg text-[rgb(60,40,30)] leading-relaxed">
              At Big Taxi Tiruppur, we believe that every journey should be smooth from start to finish. That's why we
              operate with a <strong>customer-first approach</strong>, prioritizing safety, punctuality, and comfort
              above all.
            </p>

            {/* CTA */}
            <a
              href="/about"
              className="inline-block cursor-pointer mt-3 xs:mt-4 sm:mt-6 px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-lg xs:rounded-xl text-white font-bold text-xs xs:text-base sm:text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgb(255, 128, 0) 0%, rgb(255, 94, 135) 100%)",
              }}
            >
              Learn More About Us
            </a>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 mt-8 xs:mt-12 sm:mt-16">
          {/* Mission Card */}
          <div className="bg-white p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl shadow-xl border-4 border-[rgb(255,128,0)] transform hover:scale-105 transition-all duration-300">
            <div className="w-12 xs:w-16 h-12 xs:h-16 bg-[rgb(255,193,7)] rounded-full flex items-center justify-center mb-3 xs:mb-4">
              <svg className="w-6 xs:w-8 h-6 xs:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg xs:text-xl sm:text-2xl font-black mb-2 xs:mb-3 sm:mb-4 text-[rgb(60,40,30)]">
              Our Mission
            </h3>
            <p className="text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)] leading-relaxed">
              To provide safe, reliable, and affordable travel experiences that customers can trust every time. We aim
              to simplify transportation by offering transparent pricing, comfortable rides, and exceptional service.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl shadow-xl border-4 border-[rgb(255,94,135)] transform hover:scale-105 transition-all duration-300">
            <div className="w-12 xs:w-16 h-12 xs:h-16 bg-[rgb(255,94,135)] rounded-full flex items-center justify-center mb-3 xs:mb-4">
              <svg className="w-6 xs:w-8 h-6 xs:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg xs:text-xl sm:text-2xl font-black mb-2 xs:mb-3 sm:mb-4 text-[rgb(60,40,30)]">
              Our Vision
            </h3>
            <p className="text-xs xs:text-sm sm:text-base text-[rgb(60,40,30)] leading-relaxed">
              To become the most trusted and customer-centric drop taxi service in South India, recognized for our
              dedication to safety, service quality, and innovation in the transportation ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}