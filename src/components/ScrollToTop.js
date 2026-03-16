import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Rota değiştiğinde sayfayı en üste kaydırır (yeni sayfa her zaman yukarıdan başlar).
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
