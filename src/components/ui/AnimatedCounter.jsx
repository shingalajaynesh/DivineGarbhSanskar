import { useInView } from 'react-intersection-observer';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

const AnimatedCounter = ({ target, suffix = "", duration = 1500 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const count = useAnimatedCounter(target, duration, inView);

  return (
    <span ref={ref} className="font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;
