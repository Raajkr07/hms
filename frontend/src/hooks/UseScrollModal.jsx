import { useState, useEffect } from 'react';

const UseScrollModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let scrollStartTime = null;
    let scrollTimer = null;
    const SHOW_AFTER_SECONDS = 1;

    const handleScroll = () => {
      if (hasShown) return;

      // Start timer on first scroll
      if (!scrollStartTime) {
        scrollStartTime = Date.now();
      }

      // Clear existing timer
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }

      // Set timer to check after scroll stops
      scrollTimer = setTimeout(() => {
        const scrollDuration = (Date.now() - scrollStartTime) / 1000;

        if (scrollDuration >= SHOW_AFTER_SECONDS) {
          setShowModal(true);
          setHasShown(true);
        }

        // Reset timer for next scroll session
        scrollStartTime = null;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, [hasShown]);

  const closeModal = () => {
    setShowModal(false);
  };

  const resetModal = () => {
    setHasShown(false);
    setShowModal(false);
  };

  return { showModal, closeModal, resetModal };
};

export default UseScrollModal;