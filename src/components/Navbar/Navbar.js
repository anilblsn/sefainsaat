import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import logoImg from '../../assets/logo/logo2.png';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'tr';
  const pathWithLang = (l) => `${location.pathname}${l === 'tr' ? '' : '?lang=en'}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo" aria-label="Sefa İnşaat Ana Sayfa">
        <img src={logoImg} alt="Sefa İnşaat" className="navbar__logo-img" />
      </Link>

      <div className="navbar__right">
        <ul className="navbar__links">
          <li>
            <Link
              to="/hakkimizda"
              className={`navbar__link ${location.pathname === '/hakkimizda' ? 'navbar__link--active' : ''}`}
            >
              HAKKIMIZDA
            </Link>
          </li>
          <li>
            <Link
              to="/satisi-devam-eden-projeler"
              className={`navbar__link ${location.pathname === '/satisi-devam-eden-projeler' ? 'navbar__link--active' : ''}`}
            >
              SATIŞI DEVAM EDEN PROJELER
            </Link>
          </li>
          <li>
            <Link
              to="/tamamlanan-projeler"
              className={`navbar__link ${location.pathname === '/tamamlanan-projeler' ? 'navbar__link--active' : ''}`}
            >
              TAMAMLANAN PROJELER
            </Link>
          </li>
          <li>
            <Link
              to="/planlanan-projeler"
              className={`navbar__link ${location.pathname === '/planlanan-projeler' ? 'navbar__link--active' : ''}`}
            >
              PLANLANAN PROJELER
            </Link>
          </li>
          <li>
            <Link
              to="/iletisim"
              className={`navbar__link ${location.pathname === '/iletisim' ? 'navbar__link--active' : ''}`}
            >
              İLETİŞİM
            </Link>
          </li>
        </ul>

        <div className="navbar__lang">
          <Link
            to={pathWithLang('tr')}
            className={`navbar__lang-link ${lang !== 'en' ? 'navbar__lang-link--active' : ''}`}
            aria-label="Türkçe"
          >
            <span className="navbar__lang-flag" role="img">🇹🇷</span>
            <span>TÜRKÇE</span>
          </Link>
          <span className="navbar__lang-sep">|</span>
          <Link
            to={pathWithLang('en')}
            className={`navbar__lang-link ${lang === 'en' ? 'navbar__lang-link--active' : ''}`}
            aria-label="English"
          >
            <span className="navbar__lang-flag" role="img">🇬🇧</span>
            <span>ENGLISH</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
