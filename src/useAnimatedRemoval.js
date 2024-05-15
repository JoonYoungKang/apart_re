import { useState, useEffect } from 'react';

export function useAnimatedRemoval(initialVisible = true) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setIsHidden(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const hide = () => setIsVisible(false);

  return { isVisible, isHidden, hide };
}
