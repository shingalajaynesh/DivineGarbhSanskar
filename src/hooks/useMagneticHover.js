import { useState, useRef, useEffect } from 'react';

export const useMagneticHover = (strength = 0.2) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Only apply if mouse is close enough to center (within element boundary + padding)
      const maxDistance = Math.max(width, height) * 1.5;
      const actualDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (actualDistance < maxDistance) {
        setPosition({
          x: distanceX * strength,
          y: distanceY * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const node = ref.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [strength]);

  return { ref, position };
};
