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
import AnimatedImageGrid from '../../components/landing/images/AnimatedImageGrid'
import { images } from '../../data/Data';
import Testimonials from './testimonials/SaviourCard'
import { testimonialsData } from '../../data/Data';
import Button from './button/button';

const IndexPage = () => {
  const { showModal, closeModal } = UseScrollModal();
  const mainRef = useRef(null);
  const heroSectionRef = useRef(null);

  const scrollToHero = () => {
    heroSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dark:bg-black min-h-screen flex flex-col">

      <ScrollToTop scrollContainerRef={mainRef} />
      <LandingHeader onLogoClick={scrollToHero} />
      <main ref={mainRef} className="flex-1 pt-[75px] w-full p-6 overflow-auto">
        <div ref={heroSectionRef}>
          <HeroSection />
        </div>
        <StatsSection/>
        <ThreeChartCarousel /> 
        <Testimonials testimonials={testimonialsData} />
        <Button/>
        <NewsSection />
        <Footer />
      </main>
      <ScrollModal opened={showModal} onClose={closeModal} />
      <FloatingChatbot />
    </div>
  );
};

export default IndexPage;