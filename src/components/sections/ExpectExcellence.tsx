import { UserCheck, ShieldCheck, Car } from "lucide-react";

export default function ExpectExcellenceSection() {
  const features = [
    {
      title: "Available worldwide",
      description: "Expert local chauffeurs in 500+ cities",
      icon: UserCheck,
    },
    {
      title: "High-end vehicles",
      description: "Only the best recent models",
      icon: Car,
    },
    {
      title: "Safe travels",
      description: "Trained professionals and reliable pickups",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="w-full bg-[#FAFAF5] text-slate-900 py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Title & Subtitle */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-slate-900 mb-4">
            Expect excellence.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-medium">
            Leave the car refreshed and ready for what's next.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#A7CBEF] rounded-2xl p-8 flex flex-col justify-between items-center text-center min-h-[320px] transition-transform hover:-translate-y-1 shadow-sm"
              >
                {/* Text Content */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Glassmorphic Icon Badge */}
                <div className="mt-8 relative w-20 h-20 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center shadow-inner">
                  <Icon className="w-10 h-10 text-[#1E40AF]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}