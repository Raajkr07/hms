import React from "react";
import { motion } from "framer-motion";

const Section = React.forwardRef(({ id, title, children, active, visited }, ref) => {
  // If active or visited → full opacity, else dimmed
  const opacity = active || visited ? 1 : 0.3;

  return (
    <section ref={ref} id={id} className="mb-12 max-w-5xl mx-auto">
      <motion.h2
        className="text-2xl font-bold mb-2 transition-colors duration-400"
        style={{
          fontFamily: "'Merriweather', serif",
          opacity,
        }}
      >
        <span className="text-black dark:text-white">{title}</span>
      </motion.h2>

      <motion.div
        className="transition-colors duration-400 text-gray-800 dark:text-gray-200"
        style={{
          fontFamily: "'Merriweather', serif",
          opacity,
          lineHeight: "1.6",
          fontWeight: "500",
        }}
      >
        {children}
      </motion.div>
    </section>
  );
});

export default Section;
