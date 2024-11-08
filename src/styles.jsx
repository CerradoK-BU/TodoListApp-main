import { useEffect, useRef } from 'react';

const updateMousePosition = (ev, containerRef) => {
  if (!containerRef.current) return;
  const { clientX, clientY } = ev;
  containerRef.current.style.setProperty("--x", `${clientX}px`);
  containerRef.current.style.setProperty("--y", `${clientY}px`);
};

const useMouseTracking = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (ev) => updateMousePosition(ev, containerRef);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return containerRef;
};

export default useMouseTracking;