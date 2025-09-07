import React from "react";

const stories = [
  {
    emoji: "👵",
    name: "Sunita Devi, 65",
    quote:
      'Received diabetes medicines worth ₹8,000 monthly through HopeMeds. Now I can manage my condition without financial stress.',
  },
  {
    emoji: "👨‍⚕️",
    name: "Dr. Rajesh Kumar",
    quote:
      "As a validator, I've helped redistribute over 500 medicine packages. The platform ensures only quality medications reach patients.",
  },
  {
    emoji: "👨‍💼",
    name: "Amit Sharma, Donor",
    quote:
      "My ₹5,000 monthly donation supports 15 families. The transparency reports show exactly where my money goes.",
  },
];

export default function ImpactStories() {
  return (
    <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Real Impact Stories
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="
              group relative text-center
              dark:bg-[#0F172A] backdrop-blur-md
              border border-teal-200/20
              rounded-2xl p-6
              shadow-none
              transition-all duration-700 ease-in-out
              transform hover:scale-105
              hover:bg-gradient-to-br dark:hover:from-[#061f59] dark:hover:to-[#0b3087]
              hover:from-teal-200/50 hover:to-primary-300/100
              hover:border-[#020d26] hover:border-2
              hover:shadow-[0_0_20px_2px_rgba(13,148,136,0.2)_inset]
            "
          >
            <div className="text-4xl mb-4">{story.emoji}</div>
            <h4 className="font-semibold mb-2">{story.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{story.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}