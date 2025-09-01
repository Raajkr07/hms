import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ scrollContainerRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, scrollContainerRef]);

  return null;
}
