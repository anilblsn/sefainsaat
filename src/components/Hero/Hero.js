import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Hero.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://87.248.157.140:3131';
const VIDEOS_URL = `${API_BASE}/api/v1/getIntroVideos`;

const imageContext = require.context(
  '../../assets/tamamlananprojects',
  true,
  /\.(jpe?g|png|JPE?G|PNG)$/
);

function getProjectsFromContext() {
  const keys = imageContext.keys();
  const byFolder = {};
  keys.forEach((key) => {
    const path = key.slice(2);
    const folder = path.split('/')[0];
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push({ path: key, fullPath: path });
  });

  const folders = Object.keys(byFolder).sort((a, b) => {
    const nA = parseInt(a.match(/^(\d+)/)?.[1] || '0', 10);
    const nB = parseInt(b.match(/^(\d+)/)?.[1] || '0', 10);
    return nA - nB;
  });

  return folders.map((folder) => {
    const files = byFolder[folder].sort((a, b) => a.fullPath.localeCompare(b.fullPath));
    const preferred = files.find((f) => /[/\\]0\.(jpg|jpeg|png)$/i.test(f.fullPath));
    const imageKey = preferred ? preferred.path : files[0].path;
    const name = folder.replace(/^\d+\s*-\s*/, '').trim();
    return {
      id: folder,
      number: parseInt(folder.match(/^(\d+)/)?.[1] || '0', 10),
      name,
      image: imageContext(imageKey),
    };
  });
}

const ARIA = { tr: { prev: 'Önceki', next: 'Sonraki' }, en: { prev: 'Previous', next: 'Next' } };

const SLIDE_DURATION_MS = 6000;

const ArrowIcon = ({ direction }) => (
  <svg
    className={`hero__slider-arrow hero__slider-arrow--${direction}`}
    viewBox="0 0 48 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === 'prev' ? (
      <>
        <line x1="46" y1="7" x2="2" y2="7" />
        <polyline points="9,2 2,7 9,12" />
      </>
    ) : (
      <>
        <line x1="2" y1="7" x2="46" y2="7" />
        <polyline points="39,2 46,7 39,12" />
      </>
    )}
  </svg>
);

function Hero() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const aria = ARIA[lang];

  const fallbackSlides = useMemo(() => {
    const all = getProjectsFromContext();
    const order = [1, 3, 14, 2, 7, 12];
    const byNumber = new Map();
    all.forEach((p) => {
      if (!byNumber.has(p.number)) byNumber.set(p.number, p);
    });
    return order
      .map((n) => byNumber.get(n))
      .filter(Boolean)
      .map((p) => ({
        image: p.image,
        title: p.number === 14 ? 'EVİNPARK ADATEPE' : p.name,
      }));
  }, []);

  const [remoteSlides, setRemoteSlides] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(VIDEOS_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled || !data?.success || !Array.isArray(data.data)) return;
        const items = data.data
          .map((v) => {
            const url = (v.url || '').replace(/^https?:\/\/[^/]+/, API_BASE);
            const rawName = v.name || '';
            const numberMatch = rawName.match(/^(\d+)/);
            const number = numberMatch ? parseInt(numberMatch[1], 10) : 0;
            const title = rawName.replace(/^\d+\s*-\s*/, '').trim();
            return { src: url, title, number };
          })
          .filter((x) => x.src && x.title)
          .sort((a, b) => a.number - b.number);
        if (!items.length) return;
        setRemoteSlides(items);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const slides = useMemo(
    () => (remoteSlides && remoteSlides.length ? remoteSlides : fallbackSlides),
    [remoteSlides, fallbackSlides]
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (currentSlide >= slides.length) setCurrentSlide(0);
  }, [slides.length, currentSlide]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === currentSlide) {
        try {
          v.currentTime = 0;
        } catch (e) {}
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        try {
          v.pause();
        } catch (e) {}
      }
    });
  }, [currentSlide, slides]);

  const goToSlide = (index) => {
    if (!slides.length) return;
    setCurrentSlide((index + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  const toTitle = (s) =>
    s
      .toLocaleLowerCase('tr-TR')
      .split(' ')
      .map((w) => (w ? w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1) : w))
      .join(' ');

  return (
    <section className="hero">
      <div
        className="hero__track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, i) => {
          const parts = (slide.title || '').split(' ');
          const first = parts[0] || '';
          const rest = parts.slice(1).join(' ');
          const isEvinpark = first.toLocaleUpperCase('tr-TR') === 'EVİNPARK';
          return (
            <div
              key={i}
              className={`hero__slide ${i === currentSlide ? 'hero__slide--active' : ''}`}
              style={slide.image ? { backgroundImage: `url(${slide.image})` } : undefined}
            >
              {slide.src && (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={slide.src}
                  className="hero__video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              )}
              <div className="hero__overlay" />
              <div className="hero__content">
                <h1 className="hero__title">
                  <span
                    className={`hero__title-line ${isEvinpark ? 'hero__title-line--evinpark' : ''}`}
                  >
                    {isEvinpark ? first.toLocaleLowerCase('tr-TR') : toTitle(first)}
                  </span>
                  {rest && <span className="hero__title-line">{toTitle(rest)}</span>}
                </h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hero__slider-nav">
        <button
          type="button"
          className="hero__slider-btn"
          aria-label={aria.prev}
          onClick={() => goToSlide(currentSlide - 1)}
        >
          <ArrowIcon direction="prev" />
        </button>
        <div className="hero__slider-progress" aria-hidden="true">
          <span
            key={currentSlide}
            className="hero__slider-progress-fill"
            style={{ animationDuration: `${SLIDE_DURATION_MS}ms` }}
          />
        </div>
        <button
          type="button"
          className="hero__slider-btn"
          aria-label={aria.next}
          onClick={() => goToSlide(currentSlide + 1)}
        >
          <ArrowIcon direction="next" />
        </button>
      </div>
    </section>
  );
}

export default Hero;
