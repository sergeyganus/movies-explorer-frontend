import { useState, useEffect } from 'react';
import { screenMd, screenLg } from './constants';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (e) => {
      setWidth(e.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width < screenMd.width,
    isScreenMd: ((width >= screenMd.width) && (width < screenLg.width)),
    isScreenLg: width >= screenLg.width
  };
};