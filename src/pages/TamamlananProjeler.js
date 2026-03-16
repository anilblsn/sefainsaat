import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import './TamamlananProjeler.css';

const PER_PAGE = 8;

const CONTENT = {
  tr: {
    bannerTitle: 'Tamamlanan Projeler',
    cardLabel: 'TAMAMLANAN PROJE',
    ariaZoom: ' – resmi büyüt',
    paginationLabel: 'Proje sayfaları',
    prevPage: 'Önceki sayfa',
    nextPage: 'Sonraki sayfa',
    page: 'Sayfa',
    lightboxLabel: 'Büyütülmüş resim',
    close: 'Kapat',
    prevImage: 'Önceki resim',
    nextImage: 'Sonraki resim',
  },
  en: {
    bannerTitle: 'Completed Projects',
    cardLabel: 'COMPLETED PROJECT',
    ariaZoom: ' – enlarge image',
    paginationLabel: 'Project pages',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    page: 'Page',
    lightboxLabel: 'Enlarged image',
    close: 'Close',
    prevImage: 'Previous image',
    nextImage: 'Next image',
  },
};

const imageContext = require.context(
  '../assets/tamamlananprojects',
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
    const images = files.map((f) => imageContext(f.path));
    return {
      id: folder,
      name,
      image: imageContext(imageKey),
      images,
    };
  });
}

const ZoomIcon = () => (
  <svg className="tamamlanan-projeler__zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

function TamamlananProjeler() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const t = CONTENT[lang];

  const projects = useMemo(() => getProjectsFromContext(), []);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightbox, setLightbox] = useState(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const lightboxRef = useRef(null);

  const lightboxImages = lightbox?.images ?? [];
  const lightboxTotal = lightboxImages.length;
  const canPrev = lightboxTotal > 1;
  const canNext = lightboxTotal > 1;

  const goToPrevImage = useCallback((e) => {
    e?.stopPropagation();
    if (!lightboxTotal) return;
    setLightboxImageIndex((i) => (i - 1 + lightboxTotal) % lightboxTotal);
  }, [lightboxTotal]);

  const goToNextImage = useCallback((e) => {
    e?.stopPropagation();
    if (!lightboxTotal) return;
    setLightboxImageIndex((i) => (i + 1) % lightboxTotal);
  }, [lightboxTotal]);

  const openLightbox = useCallback((proje) => {
    setLightbox(proje);
    const idx = proje.images?.indexOf(proje.image) ?? 0;
    setLightboxImageIndex(idx >= 0 ? idx : 0);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    lightboxRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') goToPrevImage();
      if (e.key === 'ArrowRight') goToNextImage();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, goToPrevImage, goToNextImage]);

  const totalPages = Math.ceil(projects.length / PER_PAGE) || 1;
  const start = (currentPage - 1) * PER_PAGE;
  const pageProjects = projects.slice(start, start + PER_PAGE);

  const goToPage = useCallback((page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
    document.querySelector('.tamamlanan-projeler')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [totalPages]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      <Navbar />
      <section className="tamamlanan-projeler-banner">
        <div className="tamamlanan-projeler-banner__overlay" />
        <h1 className="tamamlanan-projeler-banner__title">{t.bannerTitle}</h1>
      </section>
      <main className="tamamlanan-projeler">
        <div className="tamamlanan-projeler__grid">
          {pageProjects.map((proje) => (
            <article key={proje.id} className="tamamlanan-projeler__card">
              <div className="tamamlanan-projeler__card-header">
                <span className="tamamlanan-projeler__card-label">{t.cardLabel}</span>
                <h2 className="tamamlanan-projeler__card-title">{proje.name}</h2>
              </div>
              <button
                type="button"
                className="tamamlanan-projeler__card-image-wrap"
                onClick={() => openLightbox(proje)}
                aria-label={`${proje.name}${t.ariaZoom}`}
              >
                <img src={proje.image} alt={proje.name} className="tamamlanan-projeler__card-image" />
                <span className="tamamlanan-projeler__card-zoom">
                  <ZoomIcon />
                </span>
              </button>
            </article>
          ))}
        </div>
        {totalPages > 1 && (
          <nav className="tamamlanan-projeler__pagination" aria-label={t.paginationLabel}>
            <button
              type="button"
              className="tamamlanan-projeler__pagination-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label={t.prevPage}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                className={`tamamlanan-projeler__pagination-btn tamamlanan-projeler__pagination-btn--num ${currentPage === p ? 'tamamlanan-projeler__pagination-btn--active' : ''}`}
                onClick={() => goToPage(p)}
                aria-label={`${t.page} ${p}`}
                aria-current={currentPage === p ? 'page' : undefined}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              className="tamamlanan-projeler__pagination-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label={t.nextPage}
            >
              ›
            </button>
          </nav>
        )}
      </main>
      {lightbox && lightboxImages.length > 0 && (
        <div
          ref={lightboxRef}
          className="tamamlanan-projeler__lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t.lightboxLabel}
          tabIndex={-1}
        >
          <button
            type="button"
            className="tamamlanan-projeler__lightbox-close"
            onClick={closeLightbox}
            aria-label={t.close}
          >
            ×
          </button>
          <button
            type="button"
            className="tamamlanan-projeler__lightbox-arrow tamamlanan-projeler__lightbox-arrow--prev"
            onClick={goToPrevImage}
            disabled={!canPrev}
            aria-label={t.prevImage}
          >
            ‹
          </button>
          <button
            type="button"
            className="tamamlanan-projeler__lightbox-arrow tamamlanan-projeler__lightbox-arrow--next"
            onClick={goToNextImage}
            disabled={!canNext}
            aria-label={t.nextImage}
          >
            ›
          </button>
          <div className="tamamlanan-projeler__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImages[lightboxImageIndex]}
              alt={`${lightbox.name} – ${lightboxImageIndex + 1} / ${lightboxTotal}`}
              className="tamamlanan-projeler__lightbox-image"
            />
            <p className="tamamlanan-projeler__lightbox-title">
              {lightbox.name}
              {lightboxTotal > 1 && (
                <span className="tamamlanan-projeler__lightbox-counter">
                  {' '}{lightboxImageIndex + 1} / {lightboxTotal}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
      <Iletisim />
      <Footer />
    </>
  );
}

export default TamamlananProjeler;
