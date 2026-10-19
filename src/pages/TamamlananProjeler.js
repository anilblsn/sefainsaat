import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Iletisim from '../components/Iletisim';
import Footer from '../components/Footer';
import {
  buildCompletedProjectOrder,
  COMPLETED_PROJECT_DISPLAY_NAMES,
} from '../data/completedProjectOrder';
import { pickContent, useLang } from '../utils/lang';
import { pickCoverFile } from '../utils/projectImages';
import './TamamlananProjeler.css';

const PER_PAGE = 9;
const AUTOPLAY_MS = 3500;

const CONTENT = {
  tr: {
    bannerTitle: 'Tamamlanan Projeler',
    ariaZoom: ' – resmi büyüt',
    paginationLabel: 'Proje sayfaları',
    prevPage: 'Önceki sayfa',
    nextPage: 'Sonraki sayfa',
    page: 'Sayfa',
    lightboxLabel: 'Proje galerisi',
    close: 'Kapat',
    prevImage: 'Önceki resim',
    nextImage: 'Sonraki resim',
    zoomIn: 'Büyüt',
    zoomOut: 'Küçült',
    fullscreen: 'Tam ekran',
    exitFullscreen: 'Tam ekrandan çık',
    autoplayStart: 'Otomatik kaydırma',
    autoplayStop: 'Otomatik kaydırmayı durdur',
    thumbsLabel: 'Galeri küçük resimleri',
  },
  en: {
    bannerTitle: 'Completed Projects',
    ariaZoom: ' – enlarge image',
    paginationLabel: 'Project pages',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    page: 'Page',
    lightboxLabel: 'Project gallery',
    close: 'Close',
    prevImage: 'Previous image',
    nextImage: 'Next image',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
    autoplayStart: 'Autoplay',
    autoplayStop: 'Stop autoplay',
    thumbsLabel: 'Gallery thumbnails',
  },
  ar: {
    bannerTitle: 'المشاريع المكتملة',
    ariaZoom: ' – تكبير الصورة',
    paginationLabel: 'صفحات المشاريع',
    prevPage: 'الصفحة السابقة',
    nextPage: 'الصفحة التالية',
    page: 'صفحة',
    lightboxLabel: 'معرض المشروع',
    close: 'إغلاق',
    prevImage: 'الصورة السابقة',
    nextImage: 'الصورة التالية',
    zoomIn: 'تكبير',
    zoomOut: 'تصغير',
    fullscreen: 'ملء الشاشة',
    exitFullscreen: 'إنهاء ملء الشاشة',
    autoplayStart: 'تشغيل تلقائي',
    autoplayStop: 'إيقاف التشغيل التلقائي',
    thumbsLabel: 'الصور المصغرة',
  },
};

const toTitle = (s) =>
  s
    .toLocaleLowerCase('tr-TR')
    .split(' ')
    .map((w) => (w ? w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1) : w))
    .join(' ');

function renderProjectCaption(name) {
  const parts = name.split(' ');
  const first = parts[0];
  const rest = parts.slice(1).join(' ');
  const isEvinpark = first.toLocaleUpperCase('tr-TR') === 'EVİNPARK';
  return (
    <>
      <span
        className={`tamamlanan-projeler__caption-line ${
          isEvinpark ? 'tamamlanan-projeler__caption-line--evinpark' : ''
        }`}
      >
        {isEvinpark ? first.toLocaleLowerCase('tr-TR') : toTitle(first)}
      </span>
      {rest && (
        <span
          className={`tamamlanan-projeler__caption-line ${
            isEvinpark ? 'tamamlanan-projeler__caption-line--project' : ''
          }`}
        >
          {isEvinpark ? rest.toLocaleLowerCase('tr-TR') : toTitle(rest)}
        </span>
      )}
    </>
  );
}

const imageContext = require.context(
  '../assets/tamamlananprojects',
  true,
  /\.(jpe?g|png)$/
);

function displayProjectName(folderName) {
  const raw = folderName.replace(/^\d+\s*-\s*/, '').trim();
  const key = raw.toLocaleUpperCase('tr-TR');
  return COMPLETED_PROJECT_DISPLAY_NAMES[raw]
    || COMPLETED_PROJECT_DISPLAY_NAMES[key]
    || raw;
}

function dedupeGalleryFiles(files) {
  const byBase = new Map();
  files.forEach((f) => {
    const fileName = (f.fullPath || '').split(/[/\\]/).pop() || '';
    const base = fileName.replace(/\.[^.]+$/, '');
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    const prev = byBase.get(base);
    if (!prev) {
      byBase.set(base, f);
      return;
    }
    const prevExt = ((prev.fullPath || '').split('.').pop() || '').toLowerCase();
    const preferJpg = /^jpe?g$/.test(ext) && !/^jpe?g$/.test(prevExt);
    if (preferJpg) byBase.set(base, f);
  });

  const list = Array.from(byBase.values());
  list.sort((a, b) => {
    const nameA = (a.fullPath || '').split(/[/\\]/).pop() || '';
    const nameB = (b.fullPath || '').split(/[/\\]/).pop() || '';
    const numA = nameA.match(/^(\d+)\./);
    const numB = nameB.match(/^(\d+)\./);
    if (numA && numB) return parseInt(numA[1], 10) - parseInt(numB[1], 10);
    if (numA) return -1;
    if (numB) return 1;
    return nameA.localeCompare(nameB, 'tr', { numeric: true });
  });
  return list;
}

function getProjectsFromContext() {
  const keys = imageContext.keys();
  const byFolder = {};
  keys.forEach((key) => {
    const path = key.slice(2);
    const folder = path.split('/')[0];
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push({ path: key, fullPath: path });
  });
  const folders = buildCompletedProjectOrder(Object.keys(byFolder));
  return folders.map((folder) => {
    const files = byFolder[folder];
    const name = displayProjectName(folder);
    const cover = pickCoverFile(files);
    const galleryFiles = dedupeGalleryFiles(files);
    const images = galleryFiles.map((f) => imageContext(f.path));
    const coverSrc = cover ? imageContext(cover.path) : images[0];
    const coverIndex = Math.max(0, images.indexOf(coverSrc));
    return {
      id: folder,
      name,
      image: coverSrc,
      images,
      coverIndex,
    };
  });
}

const ZoomIcon = () => (
  <svg className="tamamlanan-projeler__zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IconExpand = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const IconCompress = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const IconFullscreen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M16 3h3a2 2 0 0 1 2 2v3" />
    <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const IconPause = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" />
    <rect x="14" y="5" width="4" height="14" />
  </svg>
);

function TamamlananProjeler() {
  const lang = useLang();
  const t = pickContent(CONTENT, lang);
  const [searchParams, setSearchParams] = useSearchParams();

  const projects = useMemo(() => getProjectsFromContext(), []);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightbox, setLightbox] = useState(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lightboxRef = useRef(null);
  const stageRef = useRef(null);
  const thumbsRef = useRef(null);
  const openedFromQueryRef = useRef(false);

  const lightboxImages = lightbox?.images ?? [];
  const lightboxTotal = lightboxImages.length;
  const canNavigate = lightboxTotal > 1;

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
    setLightboxImageIndex(proje.coverIndex ?? 0);
    setZoomed(false);
    setAutoplay(false);
  }, []);

  const closeLightbox = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    setLightbox(null);
    setZoomed(false);
    setAutoplay(false);
    setIsFullscreen(false);
    if (searchParams.get('proje')) {
      const next = new URLSearchParams(searchParams);
      next.delete('proje');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (openedFromQueryRef.current || !projects.length) return;
    const raw = searchParams.get('proje');
    if (!raw) return;
    let id = raw;
    try {
      id = decodeURIComponent(raw);
    } catch {
      /* keep raw */
    }
    const idx = projects.findIndex((p) => p.id === id);
    if (idx < 0) return;
    openedFromQueryRef.current = true;
    setCurrentPage(Math.floor(idx / PER_PAGE) + 1);
    openLightbox(projects[idx]);
    requestAnimationFrame(() => {
      document
        .querySelector('.tamamlanan-projeler')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [projects, searchParams, openLightbox]);

  const toggleZoom = useCallback((e) => {
    e?.stopPropagation();
    setZoomed((v) => !v);
  }, []);

  const toggleAutoplay = useCallback((e) => {
    e?.stopPropagation();
    setAutoplay((v) => !v);
  }, []);

  const toggleFullscreen = useCallback(async (e) => {
    e?.stopPropagation();
    const el = stageRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!lightbox) return undefined;
    lightboxRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        } else {
          closeLightbox();
        }
      }
      if (e.key === 'ArrowLeft') goToPrevImage();
      if (e.key === 'ArrowRight') goToNextImage();
    };
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFs);
      document.body.style.overflow = '';
    };
  }, [lightbox, goToPrevImage, goToNextImage, closeLightbox]);

  useEffect(() => {
    if (!autoplay || !canNavigate || !lightbox) return undefined;
    const id = setInterval(() => {
      setLightboxImageIndex((i) => (i + 1) % lightboxTotal);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, canNavigate, lightbox, lightboxTotal]);

  useEffect(() => {
    const active = thumbsRef.current?.querySelector('.tamamlanan-projeler__lightbox-thumb--active');
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [lightboxImageIndex]);

  const totalPages = Math.ceil(projects.length / PER_PAGE) || 1;
  const start = (currentPage - 1) * PER_PAGE;
  const pageProjects = projects.slice(start, start + PER_PAGE);

  const goToPage = useCallback((page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
    document.querySelector('.tamamlanan-projeler')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [totalPages]);

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
              <button
                type="button"
                className="tamamlanan-projeler__card-image-wrap"
                onClick={() => openLightbox(proje)}
                aria-label={`${proje.name}${t.ariaZoom}`}
              >
                <img src={proje.image} alt={proje.name} className="tamamlanan-projeler__card-image" />
                <h2 className="tamamlanan-projeler__caption">
                  {renderProjectCaption(proje.name)}
                </h2>
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

          {canNavigate && (
            <>
              <button
                type="button"
                className="tamamlanan-projeler__lightbox-arrow tamamlanan-projeler__lightbox-arrow--prev"
                onClick={goToPrevImage}
                aria-label={t.prevImage}
              >
                ‹
              </button>
              <button
                type="button"
                className="tamamlanan-projeler__lightbox-arrow tamamlanan-projeler__lightbox-arrow--next"
                onClick={goToNextImage}
                aria-label={t.nextImage}
              >
                ›
              </button>
            </>
          )}

          <div className="tamamlanan-projeler__lightbox-shell" onClick={(e) => e.stopPropagation()}>
            <div
              ref={stageRef}
              className={`tamamlanan-projeler__lightbox-stage${zoomed ? ' tamamlanan-projeler__lightbox-stage--zoomed' : ''}${isFullscreen ? ' tamamlanan-projeler__lightbox-stage--fs' : ''}`}
            >
              <div className="tamamlanan-projeler__lightbox-toolbar">
                <button
                  type="button"
                  className="tamamlanan-projeler__lightbox-tool"
                  onClick={toggleZoom}
                  aria-label={zoomed ? t.zoomOut : t.zoomIn}
                  title={zoomed ? t.zoomOut : t.zoomIn}
                >
                  {zoomed ? <IconCompress /> : <IconExpand />}
                </button>
                <button
                  type="button"
                  className="tamamlanan-projeler__lightbox-tool"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
                  title={isFullscreen ? t.exitFullscreen : t.fullscreen}
                >
                  <IconFullscreen />
                </button>
                {canNavigate && (
                  <button
                    type="button"
                    className={`tamamlanan-projeler__lightbox-tool${autoplay ? ' tamamlanan-projeler__lightbox-tool--active' : ''}`}
                    onClick={toggleAutoplay}
                    aria-label={autoplay ? t.autoplayStop : t.autoplayStart}
                    title={autoplay ? t.autoplayStop : t.autoplayStart}
                  >
                    {autoplay ? <IconPause /> : <IconPlay />}
                  </button>
                )}
              </div>

              <div className="tamamlanan-projeler__lightbox-frame">
                <img
                  src={lightboxImages[lightboxImageIndex]}
                  alt={`${lightbox.name} – ${lightboxImageIndex + 1} / ${lightboxTotal}`}
                  className="tamamlanan-projeler__lightbox-image"
                />
              </div>
            </div>

            {canNavigate && (
              <div
                ref={thumbsRef}
                className="tamamlanan-projeler__lightbox-thumbs"
                role="list"
                aria-label={t.thumbsLabel}
              >
                {lightboxImages.map((src, i) => (
                  <button
                    key={`${lightbox.id}-thumb-${i}`}
                    type="button"
                    role="listitem"
                    className={`tamamlanan-projeler__lightbox-thumb${i === lightboxImageIndex ? ' tamamlanan-projeler__lightbox-thumb--active' : ''}`}
                    onClick={() => {
                      setLightboxImageIndex(i);
                      setAutoplay(false);
                    }}
                    aria-label={`${lightbox.name} ${i + 1}`}
                    aria-current={i === lightboxImageIndex ? 'true' : undefined}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}

            <div className="tamamlanan-projeler__lightbox-title">
              {renderProjectCaption(lightbox.name)}
              {lightboxTotal > 1 && (
                <span className="tamamlanan-projeler__lightbox-counter">
                  {lightboxImageIndex + 1} / {lightboxTotal}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      <Iletisim />
      <Footer />
    </>
  );
}

export default TamamlananProjeler;
