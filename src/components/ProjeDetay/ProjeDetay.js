import React, { useState, useEffect } from 'react';
import './ProjeDetay.css';
import PdfThumbnail from './PdfThumbnail';

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

const toTitle = (s) =>
  s
    .toLocaleLowerCase('tr-TR')
    .split(' ')
    .map((w) => (w ? w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1) : w))
    .join(' ');

function ProjectTitle({ title }) {
  if (!title) return null;
  const parts = title.split(' ');
  const first = parts[0];
  const rest = parts.slice(1).join(' ');
  const isEvinpark = first.toLocaleUpperCase('tr-TR') === 'EVİNPARK';
  return (
    <h2 className="proje-detay__title">
      <span
        className={`proje-detay__title-line ${isEvinpark ? 'proje-detay__title-line--evinpark' : ''}`}
      >
        {isEvinpark ? first.toLocaleLowerCase('tr-TR') : toTitle(first)}
      </span>
      {rest && <span className="proje-detay__title-line">{toTitle(rest)}</span>}
    </h2>
  );
}

const ICON_PLAN = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="14" x2="21" y2="14" />
    <line x1="15" y1="19" x2="21" y2="19" />
  </svg>
);

const ICON_PDF_BADGE = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <text x="12" y="17" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor" stroke="none">PDF</text>
  </svg>
);

const ICON_OPEN_EXT = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function ProjeDetay({
  developer = 'Sefa İnşaat',
  title,
  details = [],
  description,
  websiteUrl,
  images = [],
  floorPlans = [],
  floorPlansLabel = 'Kat Planları',
  closeLabel = 'Kapat',
  prevLabel = 'Önceki',
  nextLabel = 'Sonraki',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);
  const [planPreviewIndex, setPlanPreviewIndex] = useState(-1);
  const safeImages = Array.isArray(images) && images.length ? images : [];
  const safePlans = Array.isArray(floorPlans) ? floorPlans : [];
  const currentPlan = planPreviewIndex >= 0 ? safePlans[planPreviewIndex] : null;

  const goPrev = () => setCurrentIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
  const goNext = () => setCurrentIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [safeImages.length]);

  useEffect(() => {
    if (!plansOpen && planPreviewIndex < 0) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (planPreviewIndex >= 0) setPlanPreviewIndex(-1);
        else setPlansOpen(false);
      }
      if (planPreviewIndex >= 0 && safePlans.length > 1) {
        if (e.key === 'ArrowLeft') {
          setPlanPreviewIndex((i) => (i - 1 + safePlans.length) % safePlans.length);
        }
        if (e.key === 'ArrowRight') {
          setPlanPreviewIndex((i) => (i + 1) % safePlans.length);
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [plansOpen, planPreviewIndex, safePlans.length]);

  const openPlanPreview = (plan) => {
    const idx = safePlans.indexOf(plan);
    if (idx >= 0) setPlanPreviewIndex(idx);
  };
  const closePlanPreview = () => setPlanPreviewIndex(-1);
  const goPrevPlan = (e) => {
    e?.stopPropagation();
    if (!safePlans.length) return;
    setPlanPreviewIndex((i) => (i - 1 + safePlans.length) % safePlans.length);
  };
  const goNextPlan = (e) => {
    e?.stopPropagation();
    if (!safePlans.length) return;
    setPlanPreviewIndex((i) => (i + 1) % safePlans.length);
  };

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
          <ProjectTitle title={title} />
          {details.length > 0 ? (
            <ul className="proje-detay__details">
              {details.map((item, i) => (
                <li key={i} className="proje-detay__detail">
                  <span className="proje-detay__detail-icon">{iconMap[item.icon] || ICON_BUILDING}</span>
                  <span><strong>{item.label}:</strong> {item.value}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="proje-detay__details-spacer" aria-hidden="true" />
          )}
          {description && <p className="proje-detay__desc">{description}</p>}
          <div className="proje-detay__actions">
            {safePlans.length > 0 && (
              <button
                type="button"
                className="proje-detay__btn proje-detay__btn--plans"
                onClick={() => setPlansOpen(true)}
              >
                {ICON_PLAN}
                {floorPlansLabel}
              </button>
            )}
            {websiteUrl && websiteUrl !== '#' && (
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="proje-detay__btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Websitesi
              </a>
            )}
          </div>
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

      {plansOpen && (
        <div
          className="proje-detay__plans-modal"
          onClick={() => setPlansOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={floorPlansLabel}
        >
          <div
            className="proje-detay__plans-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="proje-detay__plans-header">
              <h3 className="proje-detay__plans-title">
                {floorPlansLabel}
                {title && <span className="proje-detay__plans-subtitle"> – {title}</span>}
              </h3>
              <button
                type="button"
                className="proje-detay__plans-close"
                onClick={() => setPlansOpen(false)}
                aria-label={closeLabel}
              >
                ×
              </button>
            </header>
            <div className="proje-detay__plans-grid">
              {safePlans.map((plan, i) => (
                <button
                  type="button"
                  key={i}
                  className={`proje-detay__plan-card${plan.type === 'pdf' ? ' proje-detay__plan-card--pdf' : ''}`}
                  onClick={() => openPlanPreview(plan)}
                >
                  <div className={`proje-detay__plan-thumb${plan.type === 'pdf' ? ' proje-detay__plan-thumb--pdf' : ''}`}>
                    {plan.type === 'image' ? (
                      <img src={plan.src} alt={plan.unitLabel || plan.name} loading="lazy" />
                    ) : (
                      <>
                        <PdfThumbnail src={plan.src} alt={plan.unitLabel || plan.name} />
                        <span className="proje-detay__plan-badge" aria-hidden="true">{ICON_PDF_BADGE}</span>
                      </>
                    )}
                  </div>
                  <span className="proje-detay__plan-name">{plan.unitLabel || plan.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentPlan && (
        <div
          className="proje-detay__lightbox proje-detay__lightbox--plan"
          onClick={closePlanPreview}
          role="dialog"
          aria-modal="true"
          aria-label={floorPlansLabel}
        >
          <button
            type="button"
            className="proje-detay__lightbox-close"
            onClick={closePlanPreview}
            aria-label={closeLabel}
          >
            <span aria-hidden="true">×</span>
          </button>
          {safePlans.length > 1 && (
            <>
              <button
                type="button"
                className="proje-detay__lightbox-arrow proje-detay__lightbox-arrow--prev"
                onClick={goPrevPlan}
                aria-label={prevLabel}
              />
              <button
                type="button"
                className="proje-detay__lightbox-arrow proje-detay__lightbox-arrow--next"
                onClick={goNextPlan}
                aria-label={nextLabel}
              />
            </>
          )}
          <div
            className={`proje-detay__plan-viewer${currentPlan.type === 'pdf' ? ' proje-detay__plan-viewer--pdf' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {currentPlan.type === 'image' ? (
              <img
                src={currentPlan.src}
                alt={currentPlan.unitLabel || currentPlan.name}
                className="proje-detay__lightbox-img"
              />
            ) : (
              <iframe
                key={currentPlan.src}
                src={currentPlan.src}
                title={currentPlan.unitLabel || currentPlan.name}
                className="proje-detay__plan-pdf-frame"
              />
            )}
            <div className="proje-detay__plan-caption">
              <span className="proje-detay__plan-caption-name">
                {currentPlan.unitLabel || currentPlan.name}
              </span>
              {currentPlan.type === 'pdf' && (
                <a
                  href={currentPlan.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proje-detay__plan-caption-link"
                >
                  {ICON_OPEN_EXT}
                  Yeni sekmede aç
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjeDetay;
