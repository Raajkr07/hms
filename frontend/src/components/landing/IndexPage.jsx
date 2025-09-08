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
import Testimonials from './testimonials/SaviourCard'
import { testimonialsData } from '../../data/TestimonialData';
import Button from './button/button';
import NewInvite from './invite/NewInvite';

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
      <main ref={mainRef} className="flex-1 pt-[75px] w-full overflow-auto">
        <div ref={heroSectionRef}>
          <HeroSection />
        </div>
        <StatsSection/>
        <ThreeChartCarousel /> 
        <Testimonials testimonials={testimonialsData} />
        <Button/>
        <NewsSection />
        <NewInvite />
        <Footer />
      </main>
      <ScrollModal opened={showModal} onClose={closeModal} />
      <FloatingChatbot />
    </div>
  );
};

export default IndexPage;