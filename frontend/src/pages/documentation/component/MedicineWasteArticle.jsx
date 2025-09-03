import React, { useState, useEffect } from "react";
import Section from "./Section";

const MedicineWasteArticle = () => {
  const refs = Array(8).fill(0).map(() => React.createRef());
  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState(Array(8).fill(false));

  useEffect(() => {
    const handleScroll = () => {
      let currentIndex = 0;
      refs.forEach((ref, i) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3) {
            currentIndex = i;
          }
        }
      });
      setActiveIndex(currentIndex);

      setVisited(prev => {
        const updated = [...prev];
        updated[currentIndex] = true;
        return updated;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [refs]);

  return (
    <section
      id="hero-section"
      className="max-w-7xl mx-auto bg-gradient-to-r from-white to-white dark:from-black dark:to-black rounded-2xl p-10"
      style={{ fontFamily: "'Merriweather', serif" }}
    >
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-10 text-primary-500">
        Tackling the Medicine Wastage Problem
      </h1>

      <Section ref={refs[0]} id="starting" title="Problem" active={activeIndex === 0} visited={visited[0]}>
        Medicine wastage is a critical challenge affecting global health, resources, and the environment.
        HopeMeds is dedicated to turning unused medicines into vital help for people who need them most.
      </Section>

      <Section ref={refs[1]} id="scale-production" title="The Scale of Medicine Production" active={activeIndex === 1} visited={visited[1]}>
        Every year, the world produces more than <b>$1.6 trillion</b> worth of medicines. The United States alone accounts for nearly half of this value, with expanding markets
        in Europe, Asia-Pacific, and beyond. New drugs and therapies add thousands of new medicines to shelves each year, underpinning a vast, complex supply chain.
      </Section>

      <Section ref={refs[2]} id="medicine-wasted" title="How Much Medicine Gets Wasted?" active={activeIndex === 2} visited={visited[2]}>
        Despite these investments, <b>billions of dollars</b> worth of medicines go unused globally. In India alone, there are hundreds of tonnes of medical waste generated
        each day. Much of this wastage happens due to bulk purchasing, overstocking, expired medicines, and inefficient inventory management in pharmacies, clinics, and hospitals.
        Pharmaceutical waste management is now a fast-growing $40 billion industry worldwide as organizations race to handle the problem.
      </Section>

      <Section ref={refs[3]} id="medicine-need" title="Who Needs These Medicines?" active={activeIndex === 3} visited={visited[3]}>
        Today, millions of people worldwide still lack access to basic medicines. Many diseases remain untreated due to high costs or supply shortages. In low- and middle-income countries,
        a significant part of the population faces unmet medical needs because essential drugs are unavailable or unaffordable. While one part of the world discards surplus medicine, another suffers due to the lack.
      </Section>

      <Section ref={refs[4]} id="impact-lives" title="Impact on Lives: Lost Opportunities and Deaths" active={activeIndex === 4} visited={visited[4]}>
        Improper medicine distribution and waste directly impact lives. Every year, thousands die from preventable illnesses or complications where timely access to medicine could have saved them.
        In some regions, medicine misuse or lack of control also leads to drug-related deaths, but the broader public health crisis is about lack of access and avoidable suffering.
      </Section>

      <Section ref={refs[5]} id="hopemeds-changing" title="What HopeMeds Is Changing" active={activeIndex === 5} visited={visited[5]}>
        HopeMeds bridges the gap between unused medicine and critical need. By redistributing safe, unused or unexpired medicines, we reduce wastage and make healthcare accessible to more people.
        Our platform streamlines donations, matches donors and recipients, and empowers communities with real data on impact and savings.
      </Section>

      <Section ref={refs[6]} id="how-hopemeds-works" title="How HopeMeds Works" active={activeIndex === 6} visited={visited[6]}>
        <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-300">
          <li><b>Individuals</b>: Easily register and donate unused medicines, tracking expiry and impact in their community.</li>
          <li><b>Doctors</b>: Validate donations, ensure safety, and help match medicines to patient needs. Doctors monitor redistribution and provide feedback on outcomes.</li>
          <li><b>Admin Bodies</b>: Oversee bulk donations, organize pickup and delivery logistics, and monitor compliance. Admins ensure data integrity, policy adherence, and systemic impact measurement.</li>
        </ul>
        <div className="mt-4 text-gray-800 dark:text-gray-300 leading-relaxed">
          The platform uses automated expiry tracking, advanced inventory management, and real-time analytics to cut down wastage, optimize redistributions, and prove its social impact.
        </div>
      </Section>

      <Section ref={refs[7]} id="future-health" title="A Future with Less Waste and Greater Health" active={activeIndex === 7} visited={visited[7]}>
        With the HopeMeds solution, we aim to reduce medicine wastage by up to <b>70%</b>, transform surplus into life-saving treatments, and support government or NGO partners for policy changes.
        Every participant helps create a healthier, more sustainable future, turning excess into hope.
      </Section>
    </section>
  );
};

export default MedicineWasteArticle;
