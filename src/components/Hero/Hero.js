import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Hero.css';

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

const CONTENT = {
  tr: {
    badge: '',
    ctaLabel: 'TÜMÜNÜ GÖR',
  },
  en: {
    badge: '',
    ctaLabel: 'VIEW ALL',
  },
};

const ARIA = { tr: { prev: 'Önceki', next: 'Sonraki' }, en: { prev: 'Previous', next: 'Next' } };

function Hero() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const c = CONTENT[lang];
  const aria = ARIA[lang];

  const slides = useMemo(() => {
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
        badge: c.badge,
        title: p.name,
        description: '',
        ctaLabel: c.ctaLabel,
      }));
  }, [c.badge, c.ctaLabel]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index) => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero">
      <div
        className="hero__track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero__slide ${i === currentSlide ? 'hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero__overlay" />
            {slide.badge ? <span className="hero__badge">{slide.badge}</span> : null}
            <div className="hero__content">
              <h1 className="hero__title">{slide.title}</h1>
              {slide.description ? <p className="hero__description">{slide.description}</p> : null}
              <a href={lang === 'en' ? '/tamamlanan-projeler?lang=en' : '/tamamlanan-projeler'} className="hero__cta">
                {slide.ctaLabel}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__slider-nav">
        <button
          type="button"
          className="hero__slider-btn"
          aria-label={aria.prev}
          onClick={() => goToSlide(currentSlide - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="hero__slider-btn"
          aria-label={aria.next}
          onClick={() => goToSlide(currentSlide + 1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default Hero;
