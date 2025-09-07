import React from "react";

const UTILIZATION = [
  {
    percentage: "72%",
    color: "text-green-500",
    title: "Direct Medicine Distribution",
    desc: "Procurement, validation, and delivery to beneficiaries",
  },
  {
    percentage: "15%",
    color: "text-blue-500",
    title: "Technology & Infrastructure",
    desc: "Platform development, AI matching, and system maintenance",
  },
  {
    percentage: "8%",
    color: "text-purple-500",
    title: "Quality Assurance",
    desc: "Doctor validation, safety checks, and compliance",
  },
  {
    percentage: "5%",
    color: "text-orange-500",
    title: "Administrative Costs",
    desc: "Operations, legal, and regulatory compliance",
  },
];

export default function FundUtilization() {
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Where Your Money Goes
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Complete transparency in fund utilization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {UTILIZATION.map((item, idx) => (
          <div
            key={idx}
            className={`
              group relative text-center
              bg-white/5 dark:bg-slate-900/40 backdrop-blur-md
              border border-teal-200/20
              rounded-xl p-6
              shadow-none
              transition-all duration-700 ease-in-out
              transform hover:scale-105
              hover:bg-gradient-to-br dark:hover:from-[#061f59] dark:hover:to-[#0b3087]
              hover:from-teal-200/50 hover:to-primary-300/100
              hover:border-teal-400 hover:border-2
              hover:shadow-[0_0_20px_2px_rgba(13,148,136,0.16)_inset]
            `}
          >
            <div className={`text-3xl font-bold mb-2 ${item.color}`}>{item.percentage}</div>
            <div className="font-semibold mb-1">{item.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}
