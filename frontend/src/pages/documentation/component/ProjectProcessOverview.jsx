import React, { useState, useEffect } from "react";
import doctorImage from '../../../assets/doctor-avatar.png';
import adminImage from '../../../assets/admin-avatar.jpg';

const ProjectProcessOverview = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 6; i++) {
        newParticles.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          scale: 1 + Math.random() * 0.5,
          animationDelay: Math.random() * 2,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
    const interval = setInterval(generateParticles, 3000);
    return () => clearInterval(interval);
  }, []);

  const processItems = [
    {
      title: "Users",
      points: [
        "Register and authenticate securely.",
        "Manage personal profiles and saved locations.",
        "Donate unused medicines, upload detailed info including expiry and batch.",
        "Request needed medicines with prescription verification.",
        "Track donation and request statuses in real time.",
        "Receive timely notifications on account and email for donations, and requests.",
      ],
      color: "orange",
    },
    {
      title: "Doctors",
      points: [
        "Register (with admin approval) and securely login.",
        "Manage professional profiles and credentials.",
        "Validate and review donated medicines for expiry and condition.",
        "Approve or reject donations ensuring safety and compliance.",
        "Verify prescriptions when required.",
        "Receive alerts for pending reviews to maintain flow.",
      ],
      color: "blue",
    },
    {
      title: "Administrators",
      points: [
        "Manage doctors and users, including account status and approvals of doctors.",
        "Oversee donation workflows and inventory at partner stores/NGOs/hospitals.",
        "Run and monitor detailed reports on medicine wastage, donation fulfillment, and impact metrics.",
        "Enable partnership management with NGOs and government bodies.",
        "Handle budget allocations and prioritize critical cases.",
        "Send system-wide announcements and notifications.",
      ],
      color: "purple",
    },
  ];

  const colorClasses = {
    orange: {
      borderHover: "hover:border-orange-400",
      shadowHover: "hover:shadow-[0_0_24px_3px_rgba(249,115,22,0.45)]",
      text: "text-orange-400 group-hover:text-orange-300",
      particleBg: "bg-orange-500/30",
      divider: "border-orange-400/30",
      cardGlow: "from-orange-500/60 via-orange-400/10 to-transparent",
    },
    blue: {
      borderHover: "hover:border-blue-400",
      shadowHover: "hover:shadow-[0_0_24px_3px_rgba(59,130,246,0.45)]",
      text: "text-blue-400 group-hover:text-blue-300",
      particleBg: "bg-blue-500/30",
      divider: "border-blue-400/30",
      cardGlow: "from-blue-500/60 via-blue-400/10 to-transparent",
    },
    purple: {
      borderHover: "hover:border-purple-400",
      shadowHover: "hover:shadow-[0_0_24px_3px_rgba(147,51,234,0.45)]",
      text: "text-purple-400 group-hover:text-purple-300",
      particleBg: "bg-purple-500/30",
      divider: "border-purple-400/30",
      cardGlow: "from-purple-500/60 via-purple-400/10 to-transparent",
    },
  };

  return (
    <section className="min-h-screen bg-white dark:bg-black p-6 md:p-8 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-primary-500 mb-10 text-center"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          Project Process Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {processItems.map(({ title, points, color }, idx) => {
            const c = colorClasses[color];
            return (
              <div
                key={idx}
                className={`
                  border border-transparent rounded-2xl bg-gradient-to-br from-black/80 to-black/60
                  group relative overflow-hidden p-6 md:p-8 transition-all duration-500 ease-in-out
                  ${c.borderHover} ${c.shadowHover}
                  hover:scale-[1.04] active:scale-100
                  flex flex-col items-center text-center
                `}
                style={{ borderWidth: "2px" }}
              >
                {/* Glowing animated color overlay */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                  style={{
                    background:
                      color === "orange"
                        ? doctorImage
                        : color === "blue"
                        ? "radial-gradient(circle at 60% 30%,rgba(59,130,246,0.11) 0%,transparent 65%)"
                        : "radial-gradient(circle at 60% 30%,rgba(147,51,234,0.11) 0%,transparent 65%)",
                    transition: "opacity 0.7s",
                  }}
                />
                {/* Gradient border highlight */}
                <span
                  className={`
                    pointer-events-none absolute inset-0 z-0 rounded-2xl scale-105 blur-xl opacity-30
                    group-hover:opacity-70 transition-all duration-500
                    bg-gradient-to-tr ${c.cardGlow}
                  `}
                  aria-hidden="true"
                  style={{ transition: "opacity 0.5s" }}
                />
                {/* Animated Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {particles.map((particle) => (
                    <div
                      key={`${color}-${particle.id}`}
                      className={`absolute h-2 w-2 rounded-full ${c.particleBg} animate-pulse`}
                      style={{
                        top: `${(particle.top + idx * 20) % 100}%`,
                        left: `${(particle.left + idx * 30) % 100}%`,
                        transform: `scale(${particle.scale})`,
                        animationDelay: `${particle.animationDelay + idx * 0.5}s`,
                        animation: `pulse 2s ease-in-out infinite ${
                          particle.animationDelay + idx * 0.5
                        }s, float 4s ease-in-out infinite ${
                          particle.animationDelay + idx * 0.5
                        }s`,
                      }}
                    />
                  ))}
                </div>
                {/* Content */}
                <div className="flex flex-col items-center relative z-10 w-full max-w-xs">
                  {/* Image */}
                  <div
                    className={`
                      rounded-lg overflow-hidden w-24 h-24 bg-gray-800 border border-gray-700 mb-4
                      ${c.borderHover} transition-colors duration-300
                    `}
                  >
                    <img
                      alt={title}
                      src={
                        color === "orange"
                          ? "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=300&h=300&fit=crop"
                          : color === "blue"
                          ? doctorImage
                          : adminImage
                      }
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Title */}
                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-4 ${c.text} transition-colors duration-300`}
                    style={{ fontFamily: "'Merriweather', serif" }}
                  >
                    {title}
                  </h3>
                  {/* Points */}
                  <ul className="list-disc pl-5 space-y-2 text-gray-200 font-poppins text-sm sm:text-base text-left">
                    {points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                <hr className={`my-6 border-t ${c.divider} opacity-70 w-full`} />
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default ProjectProcessOverview;
