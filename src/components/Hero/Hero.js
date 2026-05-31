import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API_BASE, VIDEOS_URL, normalizeBackendUrl } from '../../config/api';
import './Hero.css';

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

  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (!API_BASE || !/^https?:\/\//i.test(API_BASE)) return undefined;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = API_BASE;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(VIDEOS_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled || !data?.success || !Array.isArray(data.data)) return;
        const items = data.data
          .map((v) => {
            const url = normalizeBackendUrl(v.url);
            const rawName = v.name || '';
            const numberMatch = rawName.match(/^(\d+)/);
            const number = numberMatch ? parseInt(numberMatch[1], 10) : 0;
            const title = rawName.replace(/^\d+\s*-\s*/, '').trim();
            return { src: url, title, number };
          })
          .filter((x) => x.src && x.title)
          .sort((a, b) => a.number - b.number);
        if (!items.length) return;
        setSlides(items);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (currentSlide >= slides.length) setCurrentSlide(0);
  }, [slides.length, currentSlide]);

  const slideDistance = (i, current, total) => {
    if (!total) return 0;
    const d = Math.abs(i - current);
    return Math.min(d, total - d);
  };

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      const dist = slideDistance(i, currentSlide, slides.length);
      if (dist === 0) {
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        try {
          v.pause();
        } catch (e) {}
      }
    });
  }, [currentSlide, slides]);

  const VIDEO_WINDOW = 1;

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

  if (!slides.length) {
    return <section className="hero hero--loading" aria-busy="true" />;
  }

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
          const dist = slideDistance(i, currentSlide, slides.length);
          const shouldRenderVideo = dist <= VIDEO_WINDOW;
          const preload = dist === 0 ? 'auto' : 'metadata';
          return (
            <div
              key={slide.src}
              className={`hero__slide ${i === currentSlide ? 'hero__slide--active' : ''}`}
            >
              {shouldRenderVideo ? (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={slide.src}
                  className="hero__video"
                  muted
                  loop
                  playsInline
                  preload={preload}
                  disablePictureInPicture
                />
              ) : (
                <div className="hero__video-placeholder" aria-hidden="true" />
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
