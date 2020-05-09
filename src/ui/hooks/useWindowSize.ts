import { useState, useEffect } from 'react';

const isClient = () => typeof window === 'object';

function getSize() {
  if (!isClient()) {
    return {
      innerHeight: undefined,
      innerWidth: undefined,
      outerHeight: undefined,
      outerWidth: undefined,
    };
  }

  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    if (!isClient()) return undefined;

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}
