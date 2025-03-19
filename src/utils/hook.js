import { useEffect, useState, useRef } from "react";

const useScrollFade = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref =  useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      }, 
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
        if (ref.current) observer.unobserve(ref.current);
    }
  }, []);

  return { ref, isVisible };
}

export default useScrollFade;