import { useEffect, useState } from 'react';

export default () => {
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
  
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};