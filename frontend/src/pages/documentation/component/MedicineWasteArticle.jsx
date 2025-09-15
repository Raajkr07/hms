import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useSpring } from "framer-motion";

const sectionsData = [
  {
    id: "starting",
    title: "The Problem: Medicine Wastage – A Hidden Healthcare Crisis",
    content:
      "Every year, a huge amount of medicines go to waste all over the world. This is a big problem that affects not only health but also costs a lot of money and harms the environment. This wasted medicine could have been used to help many people who cannot afford or find the medicines they need. Healthcare spending is very high, and wasting medicine means losing valuable resources. In the United States alone, billions of dollars are spent on medicines, yet nearly one-third of healthcare spending is wasted due to reasons like expired medicines and wrong stock management. This is not just an economic problem but also a social and environmental one because unsafe disposal of medicine causes pollution and health hazards.",
  },
  {
    id: "scale-production",
    title: "The Scale of Medicine Production",
    content:
      "Every year, the world produces more than $1.6 trillion worth of medicines. The United States alone accounts for nearly half of this value, with expanding markets in Europe, Asia-Pacific, and beyond. New drugs and therapies add thousands of new medicines to shelves each year, underpinning a vast, complex supply chain.",
  },
  {
    id: "medicine-wasted",
    title: "How Much Medicine Gets Wasted?",
    content:
      "Despite these investments, billions of dollars worth of medicines go unused globally. In India alone, there are hundreds of tonnes of medical waste generated each day. Much of this wastage happens due to bulk purchasing, overstocking, expired medicines, and inefficient inventory management in pharmacies, clinics, and hospitals. Pharmaceutical waste management is now a fast-growing $40 billion industry worldwide as organizations race to handle the problem.",
  },
  {
    id: "medicine-need",
    title: "The People Who Need These Medicines",
    content:
      "Today, millions of people worldwide still lack access to basic medicines. Many diseases remain untreated due to high costs or supply shortages. In low- and middle-income countries, a significant part of the population faces unmet medical needs because essential drugs are unavailable or unaffordable. While one part of the world discards surplus medicine, another suffers due to the lack.",
  },
  {
    id: "impact-lives",
    title: "How Medicine Wastage Harms Lives and the Environment",
    content:
      "Improper medicine distribution and waste directly impact lives. Every year, thousands die from preventable illnesses or complications where timely access to medicine could have saved them. In some regions, medicine misuse or lack of control also leads to drug-related deaths, but the broader public health crisis is about lack of access and avoidable suffering. When medicines are wasted or thrown away improperly, it hurts people and the planet. Many people die every year because they cannot get the medicine that would save them. Also, leaving expired or unused medicines carelessly disposed can pollute water, soil, and air, causing long-term harm to ecosystems and human health.",
  },
  {
    id: "Introducing HopeMeds",
    title: "Introducing HopeMeds: Turning Medicine Waste into Hope",
    content: 
      "HopeMeds is a platform designed for try to fix these problem. HopeMeds makes it simple for individuals, doctors, and organizations to donate unused medicines instead of throwing them away. The platform ensures medicines are checked for safety, tracked for expiry dates, and distributed efficiently to people who lack access.",
  },
  {
    id: "hopemeds-changing",
    title: "What HopeMeds Is Changing",
    content:
      "HopeMeds bridges the gap between unused medicine and critical need. By redistributing safe, unused or unexpired medicines, we reduce wastage and make healthcare accessible to more people. Our platform streamlines donations, matches donors and recipients, and empowers communities with real data on impact and savings.",
  },
  {
    id: "how-hopemeds-works",
    title: "How HopeMeds Works",
    content: [
      "Individuals: Easily register and donate money and unused medicines, tracking expiry and impact in their community.",
      "Doctors: Validate medicine donations, ensure safety, and help match medicines to patient needs. Doctors monitor redistribution to needful people and provide feedback on outcomes.",
      "Admin Bodies: verify doctors, Oversee bulk donations, organize pickup and delivery logistics, and monitor compliance. Admins ensure data integrity, policy adherence, and systemic impact measurement.",
      "The platform uses automated expiry tracking, advanced inventory management, and real-time analytics to cut down wastage, optimize redistributions, and prove its social impact.",
      "Real-time data shows the impact of donations, helping everyone see how their contributions save lives and reduce waste.",
    ],
  },
  {
    id: "future-health",
    title: "The Vision: A Healthier Future with Less Waste",
    content:
      "HopeMeds aims to reduce medicine wastage by up to 70%, turning surplus medicines into life-saving treatments. The platform supports government and NGO partners to create better policies and practices for medicine management. Every donation and effort through HopeMeds creates a more sustainable and healthy world—where medicines do not go to waste but become hope for those in need.",
  },
];

const containerVariants = {
  active: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  visited: { opacity: 0.7, scale: 0.98, transition: { duration: 0.6 } },
  dimmed: { opacity: 0.35, scale: 0.95, transition: { duration: 0.6 } },
};

const titleVariants = {
  active: { x: 0, opacity: 1, color: "#94a3b8", transition: { duration: 0.5 } },
  visited: { x: 0, opacity: 0.8, color: "#94a3b8", transition: { duration: 0.5 } },
  dimmed: { x: -20, opacity: 0.5, color: "#94a3b8", transition: { duration: 0.5 } },
};

const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function highlightHopeMeds(text) {
  const parts = text.split(/(HopeMeds)/g);
  return parts.map((part, index) =>
    part === "HopeMeds" ? (
      <span key={index} className="text-primary-500 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function MedicineWasteArticle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState(() =>
    new Array(sectionsData.length).fill(false)
  );
  const [headingAnimComplete, setHeadingAnimComplete] = useState(false);

  const handleInViewChange = useCallback((inViewIndex) => {
    setActiveIndex(inViewIndex);
    setVisited((prev) => {
      if (prev[inViewIndex]) return prev;
      const updated = [...prev];
      updated[inViewIndex] = true;
      return updated;
    });
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.0001,
  });

  return (
    <main
      className="relative max-w-7xl mx-0 lg:mx-72 p-10 rounded-2xl bg-gradient-to-r from-white to-white dark:from-black dark:to-black font-serif"
      role="main"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 origin-left z-50"
        style={{ scaleX }}
      />

      <motion.h1
        className="text-3xl md:text-5xl font-extrabold text-center mb-16 text-primary-600 dark:text-primary-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setHeadingAnimComplete(true)}
      >
        Tackling the Medicine <span className="text-[#FACC15]">Wastage</span> Problem
      </motion.h1>

      {sectionsData.map((section, index) => {
        const { ref, inView } = useInView({
          threshold: 0,
          triggerOnce: false,
          rootMargin: "0px 0px -50% 0px",
        });

        useEffect(() => {
          if (inView) handleInViewChange(index);
        }, [inView, index, handleInViewChange]);

        let state = "dimmed";
        if (index === activeIndex) state = "active";
        else if (visited[index]) state = "visited";

        if (section.id === "how-hopemeds-works") {
          return (
            <motion.section
              key={section.id}
              ref={ref}
              variants={containerVariants}
              initial="dimmed"
              animate={headingAnimComplete ? state : "dimmed"}
              aria-labelledby={`${section.id}-title`}
              tabIndex={-1}
              className="mb-20"
            >
              <motion.h2
                id={`${section.id}-title`}
                variants={titleVariants}
                className="text-2xl font-bold mb-6"
              >
                {section.title}
              </motion.h2>
              <motion.ul
                className="list-disc list-inside dark:text-gray-300 space-y-2"
                variants={textContainer}
                initial="hidden"
                animate={headingAnimComplete && inView ? "visible" : "hidden"}
              >
                {section.content.slice(0, 3).map((item, idx) => (
                  <motion.li key={idx} variants={wordVariants}>
                    {highlightHopeMeds(item)}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.p
                className="mt-6 text-lg leading-relaxed dark:text-gray-300 whitespace-pre-line"
                variants={textContainer}
                initial="hidden"
                animate={headingAnimComplete && inView ? "visible" : "hidden"}
              >
                {highlightHopeMeds(section.content[3])}
              </motion.p>
            </motion.section>
          );
        }
        const words = section.content.split(" ");

        return (
          <motion.section
            key={section.id}
            ref={ref}
            variants={containerVariants}
            initial="dimmed"
            animate={headingAnimComplete ? state : "dimmed"}
            aria-labelledby={`${section.id}-title`}
            tabIndex={-1}
            className="mb-20"
          >
            <motion.h2
              id={`${section.id}-title`}
              variants={titleVariants}
              className="text-2xl font-bold mb-6"
            >
              {section.title}
            </motion.h2>

            <motion.p
              className="text-lg leading-relaxed dark:text-gray-300 whitespace-pre-line flex flex-wrap gap-1"
              variants={textContainer}
              initial="hidden"
              animate={headingAnimComplete && inView ? "visible" : "hidden"}
            >
              {words.map((word, i) => {
                if (word.includes("HopeMeds")) {
                  return (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      className="text-primary-500 font-extrabold"
                    >
                      {word}
                    </motion.span>
                  );
                }
                return (
                  <motion.span key={i} variants={wordVariants}>
                    {word}
                  </motion.span>
                );
              })}
            </motion.p>
          </motion.section>
        );
      })}
    </main>
  );
}
