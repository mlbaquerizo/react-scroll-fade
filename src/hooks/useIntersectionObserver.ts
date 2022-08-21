import { useEffect, useMemo, useState, RefObject } from 'react';

const useIntersectionObserver = (
  ref: RefObject<Element|null>,
  options?: IntersectionObserverInit
): boolean => {

  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  const observer = useMemo(() => {
    return new IntersectionObserver(([entry]) => {
      // console.log("ENTRY:::::", entry);
      return setIntersecting(entry.isIntersecting)
    }, options);
  }, [options]);

  // console.log("OBSERVER:::::", observer);

  useEffect(() => {
    if(ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    }
  }, [ref, observer]);

  return isIntersecting;
}

export default useIntersectionObserver;