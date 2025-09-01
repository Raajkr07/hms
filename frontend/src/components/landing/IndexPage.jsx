import React, { useRef, useState, Profiler } from 'react';
import LandingHeader from './LandingHeader';
import HeroSection from './HeroSection';
import Footer from '../footer/Footer';
import FloatingChatbot from '../FloatingChatbot';
import ScrollModal from '../ScrollModal';
import UseScrollModal from '../../hooks/UseScrollModal';
import ScrollToTop from '../common/ScrollTop';
import StatsSection from './status/StatsSection'
import ThreeChartCarousel from './charts/ThreeChartCarousel';
import NewsSection from './news/NwesSection';
import ImageQueue from '../../components/landing/images/ImageQueue'
import { images } from '../../data/Data';

const IndexPage = () => {
  const { showModal, closeModal } = UseScrollModal();
  const mainRef = useRef(null);
  const heroSectionRef = useRef(null);

  const scrollToHero = () => {
    heroSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dark:bg-[#000000] min-h-screen flex flex-col">

      <ScrollToTop scrollContainerRef={mainRef} />
      <LandingHeader onLogoClick={scrollToHero} />
      <main ref={mainRef} className="flex-1 pt-[75px] w-full p-6 overflow-auto">
        <div ref={heroSectionRef}>
          <HeroSection />
        </div>
        <StatsSection/>
        <ThreeChartCarousel />

        <ImageQueue images={images} height={160} speed={10} />

        <NewsSection />

        <Footer />
      </main>
      <ScrollModal opened={showModal} onClose={closeModal} />
      <FloatingChatbot />
    </div>
  );
};

export default IndexPage;