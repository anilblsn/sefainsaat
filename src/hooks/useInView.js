import { useState, useEffect, useRef } from 'react';

/**
 * Returns [ref, isInView]. When the element enters the viewport (with threshold), isInView becomes true and stays true.
 */
export function useInView(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options;
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, isInView]);

  return [ref, isInView];
}
