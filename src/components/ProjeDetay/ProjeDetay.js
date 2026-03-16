import React, { useState, useEffect } from 'react';
import './ProjeDetay.css';

const ICON_BUILDING = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01" /></svg>
);
const ICON_RULER = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3H3v18h18V3zM3 9h18M3 15h18M9 3v18M15 3v18" /></svg>
);
const ICON_CALENDAR = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const ICON_HOUSE = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

const ICON_ZOOM = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

function ProjeDetay({ developer = 'Sefa İnşaat', title, details = [], description, websiteUrl, images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const safeImages = Array.isArray(images) && images.length ? images : [];

  const goPrev = () => setCurrentIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
  const goNext = () => setCurrentIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [safeImages.length]);

  const iconMap = { building: ICON_BUILDING, ruler: ICON_RULER, calendar: ICON_CALENDAR, house: ICON_HOUSE };

  return (
    <section className="proje-detay">
      <div className="proje-detay__inner">
        <div className="proje-detay__gallery">
          <div className="proje-detay__main-wrap">
            {safeImages.length > 0 && (
              <>
                <div className="proje-detay__main-hover" aria-hidden="true" />
                <div
                  className="proje-detay__main-strip"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {safeImages.map((src, i) => (
                    <div key={i} className="proje-detay__main-slide">
                      <img className="proje-detay__main" src={src} alt={`${title} ${i + 1}`} />
                    </div>
                  ))}
                </div>
                {safeImages.length > 1 && (
                  <>
                    <button type="button" className="proje-detay__arrow proje-detay__arrow--prev" onClick={goPrev} aria-label="Önceki" />
                    <button type="button" className="proje-detay__arrow proje-detay__arrow--next" onClick={goNext} aria-label="Sonraki" />
                  </>
                )}
                <button
                  type="button"
                  className="proje-detay__zoom-btn"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Resmi büyüt"
                >
                  {ICON_ZOOM}
                </button>
              </>
            )}
          </div>
          {safeImages.length > 1 && (
            <div className="proje-detay__thumbs">
              {safeImages.map((src, i) => (
                <button
                  type="button"
                  key={i}
                  className={`proje-detay__thumb ${i === currentIndex ? 'proje-detay__thumb--active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                >
                  <img src={src} alt={`${title} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="proje-detay__content">
          {developer && <span className="proje-detay__developer">{developer}</span>}
          {title && <h2 className="proje-detay__title">{title}</h2>}
          {details.length > 0 && (
            <ul className="proje-detay__details">
              {details.map((item, i) => (
                <li key={i} className="proje-detay__detail">
                  <span className="proje-detay__detail-icon">{iconMap[item.icon] || ICON_BUILDING}</span>
                  <span><strong>{item.label}:</strong> {item.value}</span>
                </li>
              ))}
            </ul>
          )}
          {description && <p className="proje-detay__desc">{description}</p>}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="proje-detay__btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Websitesi
            </a>
          )}
        </div>
      </div>

      {lightboxOpen && safeImages[currentIndex] && (
        <div
          className="proje-detay__lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Büyütülmüş resim"
        >
          <button
            type="button"
            className="proje-detay__lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Kapat"
          >
            <span aria-hidden="true">×</span>
          </button>
          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                className="proje-detay__lightbox-arrow proje-detay__lightbox-arrow--prev"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Önceki resim"
              />
              <button
                type="button"
                className="proje-detay__lightbox-arrow proje-detay__lightbox-arrow--next"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Sonraki resim"
              />
            </>
          )}
          <img
            src={safeImages[currentIndex]}
            alt={`${title} ${currentIndex + 1}`}
            className="proje-detay__lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default ProjeDetay;
