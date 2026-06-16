import { useInView } from 'react-intersection-observer';

export const useScrollReveal = (options = {}) => {
  const { ref, inView } = useInView({
    threshold: options.threshold ?? 0.15,
    triggerOnce: options.triggerOnce ?? true,
    rootMargin: options.rootMargin ?? "-50px",
  });

  return { ref, inView };
};
