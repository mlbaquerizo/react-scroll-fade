import { useEffect, useState } from 'react';

export default () => {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  
  useEffect(() => {
    /* Loading a page with previous scroll position preserved sometimes
    *  improperly sets the initial scrollPosition to 0. Setting scroll
    *  position when component mounts should fix that.
    */
    setScrollPosition(window.scrollY);
    
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};